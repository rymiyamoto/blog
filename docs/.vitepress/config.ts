import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ja',
  title: 'パンダムの徒然なる日記',
  titleTemplate: ':title - パンダムの徒然なる日記 Suffix',
  description: 'ワイことパンダムがエンジニアチックなこと書くし、ただ趣味やオタクなことを何でも雑に書くブログです。',
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
      { text: 'About', link: '/about' },
    ]
  },
})
