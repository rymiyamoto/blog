import type { Plugin } from 'vite'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const CACHE_FILE = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../ogp-cache.json'
)

type OgpData = { title: string; description: string; image: string }
type OgpCache = Record<string, OgpData>

function loadCache(): OgpCache {
  try {
    if (fs.existsSync(CACHE_FILE)) return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'))
  } catch {}
  return {}
}

function saveCache(cache: OgpCache): void {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2) + '\n')
}

async function fetchOgp(url: string): Promise<OgpData | null> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; OGP-fetcher/1.0)' },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return null
    const html = await res.text()

    const getMeta = (prop: string) => {
      const a = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']*?)["']`, 'i'))
      const b = html.match(new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]+(?:property|name)=["']${prop}["']`, 'i'))
      return (a ?? b)?.[1]?.trim() ?? ''
    }

    return {
      title: getMeta('og:title') || html.match(/<title[^>]*>([^<]+)/i)?.[1]?.trim() || '',
      description: getMeta('og:description') || getMeta('description'),
      image: getMeta('og:image'),
    }
  } catch {
    return null
  }
}

function escapeAttr(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Split markdown into processable / skip (code blocks) segments
function splitSegments(md: string): { text: string; skip: boolean }[] {
  const result: { text: string; skip: boolean }[] = []
  const re = /^(`{3,}|~{3,})[^\n]*\n[\s\S]*?\1\s*$/gm
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(md)) !== null) {
    if (m.index > last) result.push({ text: md.slice(last, m.index), skip: false })
    result.push({ text: m[0], skip: true })
    last = re.lastIndex
  }
  if (last < md.length) result.push({ text: md.slice(last), skip: false })
  return result
}

export function ogpEmbedPlugin(): Plugin {
  const cache = loadCache()

  return {
    name: 'vitepress-ogp-embed',
    enforce: 'pre',

    async transform(code, id) {
      if (!id.endsWith('.md')) return null

      const segments = splitSegments(code)
      let cacheUpdated = false
      let changed = false

      const processed = await Promise.all(
        segments.map(async (seg) => {
          if (seg.isCode ?? seg.skip) return seg.text

          const matches = [...seg.text.matchAll(/^(https?:\/\/[^\s<>"'[\]()]+)\s*$/gm)]
          if (matches.length === 0) return seg.text

          let result = seg.text
          for (const m of matches) {
            const url = m[1]
            if (!cache[url]) {
              const ogp = await fetchOgp(url)
              if (ogp) { cache[url] = ogp; cacheUpdated = true }
            }
            const ogp = cache[url]
            if (!ogp) continue

            const tag = `<LinkCard url="${escapeAttr(url)}" title="${escapeAttr(ogp.title)}" description="${escapeAttr(ogp.description)}" image="${escapeAttr(ogp.image)}" />`
            result = result.replace(m[0], () => tag + '\n')
            changed = true
          }
          return result
        })
      )

      if (cacheUpdated) saveCache(cache)
      if (!changed) return null

      return processed.join('')
    },
  }
}
