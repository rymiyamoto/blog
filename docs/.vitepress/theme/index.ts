import DefaultTheme from 'vitepress/theme'
import PostCardList from '../../../src/components/Post/PostCardList.vue'
import PostCard from '../../../src/components/Post/PostCard.vue'
import SNSLinks from '../../../src/components/About/SNSLinks.vue'
import Profile from '../../../src/components/About/Profile.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('PostCardList', PostCardList)
    app.component('PostCard', PostCard)
    app.component('SNSLinks', SNSLinks)
    app.component('Profile', Profile)
  }
}
