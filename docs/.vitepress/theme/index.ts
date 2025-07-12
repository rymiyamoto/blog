import DefaultTheme from 'vitepress/theme'
import PostCardList from '@/components/Post/PostCardList.vue'
import PostCard from '@/components/Post/PostCard.vue'
import SNSLinks from '@/components/About/SNSLinks.vue'
import Profile from '@/components/About/Profile.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('PostCardList', PostCardList)
    app.component('PostCard', PostCard)
    app.component('SNSLinks', SNSLinks)
    app.component('Profile', Profile)
  }
}
