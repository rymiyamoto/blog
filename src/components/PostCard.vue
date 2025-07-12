<template>
  <li class="tag-post-card">
    <a :href="post.path" class="tag-post-link">
      <div class="tag-post-thumbnail-wrapper">
        <img :src="post.thumbnail" :alt="`${post.title} サムネイル`" class="tag-post-thumbnail" />
      </div>
      <div class="tag-post-content">
        <h3 class="tag-post-title">{{ post.title }}</h3>
        <time v-if="post.date" class="tag-post-date">{{ post.date }}</time>
        <p class="tag-post-excerpt">{{ post.excerpt }}</p>
      </div>
    </a>
  </li>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>
