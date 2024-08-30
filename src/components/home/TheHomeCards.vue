<template>
  <VRow v-masonry transition-duration="0.3s">
    <VCol v-masonry-tile v-for="article in articleStore.getHomeArticles" :key="article.id" sm="4">
      <VCard>
        <VImg height="200" :src="article.image" cover class="text-white" />
        <VCardItem>
          <VCardTitle>{{ article.title }}</VCardTitle>
          <VCardSubtitle>{{ article.game }}</VCardSubtitle>
        </VCardItem>
        <VCardText>{{ article.excerpt }}</VCardText>
        <VCardActions>
          <RouterLink :to="{ name: 'article', params: { id: article.id } }">
            <VBtn>Read article</VBtn>
          </RouterLink>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import { useArticleStore } from '@/stores/articles';
const articleStore = useArticleStore();
</script>
