<template>
  <a :href="url" target="_blank" rel="noopener noreferrer" class="link-card">
    <div class="link-card-body">
      <div class="link-card-text">
        <div class="link-card-title">{{ title || url }}</div>
        <div v-if="description" class="link-card-description">{{ description }}</div>
        <div class="link-card-host">{{ hostname }}</div>
      </div>
      <div v-if="image" class="link-card-thumbnail">
        <img :src="image" :alt="title" loading="lazy" />
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  url: string
  title?: string
  description?: string
  image?: string
}>()

const hostname = computed(() => {
  try { return new URL(props.url).hostname } catch { return props.url }
})
</script>

<style scoped>
.link-card {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  overflow: hidden;
  margin: 1.2rem 0;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.link-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.link-card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
}

.link-card-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.link-card-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.link-card-description {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.link-card-host {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.link-card-thumbnail {
  flex-shrink: 0;
  width: 120px;
  height: 80px;
}

.link-card-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}
</style>
