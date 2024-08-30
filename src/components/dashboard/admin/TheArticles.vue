<template>
  <div v-if="loading" class="text-center m-3">
    <VProgressCircular indeterminate color="purple" />
  </div>

  <div v-else>
    <VTable theme="dark">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Owner</th>
          <th class="text-left">Rating</th>
          <th class="text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articleStore.adminArticles" :key="article.game">
          <td>{{ article.game }}</td>
          <td>{{ article.owner.firstName }} {{ article.owner.lastName }}</td>
          <td>{{ article.rating }}</td>
          <td>{{ article.timestamp.toDate().toDateString() }}</td>
          <td>
            <VBtn variant="outlined" color="red" size="small" @click="removeHandler(article.id)">Remove</VBtn>
          </td>
          <td>
            <VBtn variant="outlined" color="yellow" size="small" @click="moveToArticleEdit(article)">Edit</VBtn>
          </td>
        </tr>
      </tbody>
    </VTable>

    <div v-if="btnLoad" class="text-center m-3">
      <VProgressCircular indeterminate color="purple" />
    </div>
    <VBtn v-else-if="displayBtn" variant="outlined" class="mt-3" @click="loadMoreHandler">Get more articles</VBtn>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useArticleStore } from '@/stores/articles';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const articleStore = useArticleStore();
const router = useRouter();
const route = useRoute();

const loading = ref(false);
const btnLoad = ref(false);
const displayBtn = ref(true);
const $toast = useToast();

function moveToArticleEdit(article) {
  router.push({ name: 'articles-edit', params: { id: article.id } });
}

// REMOVE BY ID
function removeHandler(id) {
  loading.value = true;
  articleStore.removeGame(id).finally(() => {
    loading.value = false;
  });
}

// LOAD MORE ARTICLES
function loadMoreHandler() {
  btnLoad.value = true;
  articleStore.adminGetMoreArticles(3).finally(() => {
    btnLoad.value = false;
  });
}

// GET FIRST ARTICLES
// load once
if (!articleStore.adminArticles || route.query.reload) {
  loading.value = true;
  articleStore.adminGetArticles(3).finally(() => {
    loading.value = false;
  });
}

watch(
  () => articleStore.adminLastVisible,
  (newValue) => {
    if (!newValue) {
      displayBtn.value = false;
      $toast.info('No more articles!');
    }
  }
);
</script>
