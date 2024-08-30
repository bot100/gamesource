<template>
  <div class="container p_top">
    <div v-if="loading" class="text-center position-absolute top-50 start-50 translate-middle">
      <VProgressCircular color="purple" indeterminate model-value="20" :size="50"></VProgressCircular>
    </div>
    <div v-else class="article_page">
      <div class="game_tag">{{ article.game }}</div>
      <div class="article_featured" :style="{ backgroundImage: `url(${article.image})` }"></div>
      <div class="article_content">
        <div class="owner">
          Article written by <b>{{ article.owner.firstName }} {{ article.owner.lastName }}</b>
        </div>
        <hr />
        <h2>{{ article.title }}</h2>
        <div v-html="article.editor" class="editor"></div>
        <hr />
        <div class="article_rating">
          Our rating is: <b>{{ article.rating }}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useArticleStore } from '@/stores/articles';

const route = useRoute();
const articleStore = useArticleStore();

const loading = ref(true);
const article = ref('');

articleStore
  .getArticleByID(route.params.id)
  .then((response) => {
    article.value = response;
  })
  .finally(() => {
    loading.value = false;
  });
</script>
