<template>
  <div class="container">
    <TheCarousel />
    <TheHomeCards class="mt-4" />
  </div>
</template>

<script setup>
import TheCarousel from '@/tools/TheCarousel.vue';
import TheHomeCards from './TheHomeCards.vue';
import { useArticleStore } from '@/stores/articles';
const articleStore = useArticleStore();

// only once initialize pinia state homeArticles
if (!articleStore.homeArticles) {
  articleStore.getArticles(7);
}
</script>
