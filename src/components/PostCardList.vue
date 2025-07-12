<template>
  <ul class="tag-post-cards">
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
