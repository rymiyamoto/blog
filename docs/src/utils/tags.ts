import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getAllTags(dir = 'docs'): string[] {
  const tags = new Set<string>()

  function walk(folder: string) {
    const files = fs.readdirSync(folder)
    for (const file of files) {
      const fullPath = path.join(folder, file)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        walk(fullPath)
      } else if (file.endsWith('.md')) {
        const raw = fs.readFileSync(fullPath, 'utf-8')
        const { data } = matter(raw)
        if (Array.isArray(data.tags)) {
          data.tags.forEach(tag => tags.add(tag))
        }
      }
    }
  }

  walk(dir)
  return Array.from(tags)
}
