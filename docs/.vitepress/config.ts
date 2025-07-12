import { defineConfig } from 'vitepress'
import { getAllTags } from '../src/utils/tags'

const tagItems = getAllTags().map(tag => ({
  text: tag,
  link: `/tags/${tag}`
}))

export default defineConfig({
  lang: 'ja',
  title: 'パンダムの徒然なる日記',
  titleTemplate: ':title - パンダムの徒然なる日記 Suffix',
  description: 'エンジニアチックなことや、ただ趣味やオタクなことを何でも雑に書くブログです',
  head: [
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
    ],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet' }
    ],
    [
      'link',
      { rel: 'icon', href: '/images/common/favicon.ico' }
    ],
  ],
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      {
        text: 'About',
        link: '/about',
        target: '_self',
      },
    ],
    sidebar: [
      {
        text: 'エンジニアチックなことや、ただ趣味やオタクなことを何でも雑に書くブログです'
      },
      {
        text: 'タグ',
        items: tagItems
      },
      {
        text: 'Copyright © 2025 パンダム/rymiyamoto'
      },
    ],
    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/rymiyamoto129' },
      { icon: 'github', link: 'https://github.com/rymiyamoto' },
    ],
    search: {
      provider: 'local'
    },
  },
  lastUpdated: true,
  cleanUrls: true,
})
