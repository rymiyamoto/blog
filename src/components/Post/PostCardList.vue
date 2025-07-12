<template>
  <ul class="post-cards">
    <PostCard v-for="post in posts" :key="post.path" :post="post" />
  </ul>
</template>

<script setup>
import PostCard from './PostCard.vue'
defineProps({
  posts: {
    type: Array,
    required: true
  }
})
</script>
<style scoped>
.post-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0;
  list-style: none;
  margin-top: 1.5rem;
  padding: 0 !important;
}
</style>
