import DefaultTheme from 'vitepress/theme'
import './about.css'
import PostCardList from '../../../src/components/PostCardList.vue'
import PostCard from '../../../src/components/PostCard.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('PostCardList', PostCardList)
    app.component('PostCard', PostCard)
  }
}
