import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.resolve(process.cwd(), 'docs/posts')
const tagsDir = path.resolve(process.cwd(), 'docs/tags')
const indexFile = path.resolve(process.cwd(), 'docs/index.md')
const dummyThumbnail = '/images/common/icon.jpeg'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0] // 'YYYY-MM-DD'
}

function stripMarkdown(text: string): string {
  return text
    .replace(/<!--[\s\S]*?-->/g, '')               // コメント
    .replace(/!\[.*?\]\(.*?\)/g, '')               // 画像
    .replace(/\[([^\]]+)\]\((.*?)\)/g, '$1')       // リンク
    .replace(/[*_`>#-]/g, '')                      // Markdown記号
    .replace(/<[^>]*>?/gm, '')                     // あらゆるHTMLタグ
    .replace(/\n+/g, ' ')                          // 改行
    .trim()
}

function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (char) =>
  ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]!)
  )
}

function getPosts() {
  const files = fs.readdirSync(postsDir)
  return files.map(file => {
    const fullPath = path.join(postsDir, file)
    const raw = fs.readFileSync(fullPath, 'utf-8')
    const { data, content } = matter(raw)

    const excerptRaw = content.split('\n').slice(0, 5).join(' ')
    const cleaned = stripMarkdown(excerptRaw)
    const excerpt = escapeHtml(cleaned.slice(0, 200))

    return {
      title: data.title || 'タイトルなし',
      date: formatDate(data.date || ''),
      tags: data.tags || [],
      thumbnail: data.thumbnail || dummyThumbnail,
      excerpt,
      path: `/posts/${file.replace(/\.md$/, '')}`
    }
  }).reverse()
}

function groupPostsByTag(posts: any[]) {
  const tags: Record<string, any[]> = {}
  posts.forEach(post => {
    post.tags.forEach((tag: string) => {
      if (!tags[tag]) tags[tag] = []
      tags[tag].push(post)
    })
  })
  return tags
}

function generateTagPages() {
  const posts = getPosts()
  const tags = groupPostsByTag(posts)

  Object.entries(tags).forEach(([tag, posts]) => {
    const tagFile = path.join(tagsDir, `${tag}.md`)
    const postsJson = JSON.stringify(posts, null, 2)
    const md = `---
title: "${tag} の記事一覧"
prev: false
next: false
---

# ${tag} の記事一覧

<PostCardList :posts='${postsJson.replace(/'/g, "&#39;")}' />
`
    fs.writeFileSync(tagFile, md)
  })
}

function generateLatestSection() {
  const latestPosts = getPosts().slice(0, 5)
  const postsJson = JSON.stringify(latestPosts, null, 2)
  const html = `---
prev: false
next: false
---

# ようこそ

エンジニアチックなことや、ただ趣味やオタクなことを何でも雑につぶやきます

## 最新記事

<PostCardList :posts='${postsJson.replace(/'/g, "&#39;")}' />
`
  fs.writeFileSync(indexFile, html)
}

generateLatestSection()
generateTagPages()
