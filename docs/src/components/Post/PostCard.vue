<template>
  <li class="post-card">
    <a :href="post.path" class="post-card-link">
      <div class="post-card-thumbnail-wrapper">
        <img :src="post.thumbnail" :alt="`${post.title} サムネイル`" class="post-card-thumbnail" />
      </div>
      <div class="post-card-content">
        <h3 class="post-card-title">{{ post.title }}</h3>
        <time v-if="post.date" class="post-card-date">{{ post.date }}</time>
        <p class="post-card-excerpt">{{ post.excerpt }}</p>
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
<style scoped>
.post-card {
  display: flex;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-size: 0.9rem;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

@media screen and (max-width: 768px) {
  .post-card {
    flex-direction: column;
  }
}

.post-card-link {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  text-decoration: none;
  color: inherit;
  width: 100%;
  text-decoration: none !important;
}

@media screen and (max-width: 768px) {
  .post-card-link {
    flex-direction: column;
  }
}

.post-card-thumbnail-wrapper {
  width: 172px;
  height: 172px;
  overflow: hidden;
  border-radius: 8px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 768px) {
  .post-card-thumbnail-wrapper {
    width: 100%;
    height: 200px;
    flex-shrink: 0;
  }
}

.post-card-thumbnail {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}

.post-card-content {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  flex: 1;
}

.post-card-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 !important;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
  -webkit-line-clamp: 2;
}

.post-card-date {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.post-card-excerpt {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
  margin: 0 !important;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
  -webkit-line-clamp: 2;
}
</style>
