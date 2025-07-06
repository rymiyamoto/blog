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
  })
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

    const cardsHtml = posts.map(post => {
      const timeTag = post.date
        ? `<time class="tag-post-date">${post.date}</time>`
        : ''

      return `  <li class="tag-post-card">
    <a href="${post.path}" class="tag-post-link">
      <div class="tag-post-thumbnail-wrapper">
        <img src="${post.thumbnail}" alt="${post.title} サムネイル" class="tag-post-thumbnail" />
      </div>
      <div class="tag-post-content">
        <h3 class="tag-post-title">${post.title}</h3>
        ${timeTag}
        <p class="tag-post-excerpt">${post.excerpt}</p>
      </div>
    </a>
  </li>`
    }).join('\n')

    const md = `---
title: "${tag} の記事一覧"
---

# ${tag} の記事一覧

<ul class="tag-post-cards">
${cardsHtml}
</ul>
`

    fs.writeFileSync(tagFile, md)
  })
}

function generateLatestSection() {
  const latestPosts = getPosts().slice(0, 5)

  const cardsHtml = latestPosts.map(post => `  <li class="tag-post-card">
    <a href="${post.path}" class="tag-post-link">
    <div class="tag-post-thumbnail-wrapper">
        <img src="${post.thumbnail}" alt="${post.title} サムネイル" class="tag-post-thumbnail" />
      </div>
      <div class="tag-post-content">
        <h3 class="tag-post-title">${post.title}</h3>
        <time class="tag-post-date">${post.date}</time>
        <p class="tag-post-excerpt">${post.excerpt}</p>
      </div>
    </a>
  </li>`).join('\n')

  const html = `
# ようこそ

エンジニアチックなことや、ただ趣味やオタクなことを何でも雑につぶやきます

## 最新記事

<ul class="tag-post-cards">
${cardsHtml}
</ul>
  `

  fs.writeFileSync(indexFile, html)
}

generateLatestSection()
generateTagPages()
