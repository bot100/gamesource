<template>
  <h2>Edit article</h2>
  <hr />

  <Form @submit="onSubmit" :validation-schema="articlesSchema" class="mb-5">
    <!-- 1-Name -->
    <div class="form-item mb-4">
      <Field v-model="article.game" name="game" v-slot="{ field, errors }">
        <input
          v-bind="field"
          type="text"
          class="form-control"
          :class="computedInvalidClass(errors)"
          placeholder="Name of the game"
        />
        <ErrorMessage name="game" class="input_alert p-2" />
      </Field>
    </div>

    <!-- 2-Title -->
    <div class="form-item mb-4">
      <Field v-model="article.title" name="title" v-slot="{ field, errors }">
        <input
          v-bind="field"
          type="text"
          class="form-control"
          :class="computedInvalidClass(errors)"
          placeholder="Title of the game"
        />
        <ErrorMessage name="title" class="input_alert p-2" />
      </Field>
    </div>

    <!-- 3-Excerpt -->
    <div class="form-item mb-4">
      <Field v-model="article.excerpt" name="excerpt" v-slot="{ field }">
        <textarea v-bind="field" rows="4" class="form-control" placeholder="Add an excerpt"></textarea>
        <ErrorMessage name="excerpt" class="input_alert p-2" />
        <BaseCounterSymbols :field="field" />
      </Field>
    </div>

    <!-- 4-WYSIWYG -->
    <div class="mb-4">
      <Wysiwyg @update="updateEditor" :content="article.editor" />
      <Field name="editor" v-model="veditor" v-slot="{ field, errors }">
        <input v-bind="field" type="hidden" id="veditor" :class="computedInvalidClass(errors)" />
        <ErrorMessage name="editor" class="input_alert p-2" />
        <BaseCounterSymbols :field="field">{{ field.value.length - 7 }}</BaseCounterSymbols>
      </Field>
    </div>

    <!-- 5-Raiting -->
    <div class="form-item mb-4">
      <Field v-model="article.rating" name="rating" value="Select rating of the game" v-slot="{ field, errors }">
        <select v-bind="field" class="form-select" :class="computedInvalidClass(errors)">
          <option value="Select rating of the game" disabled>Select rating of the game</option>
          <option v-for="item in rating" :value="item" :key="item">{{ item }}</option>
        </select>
        <ErrorMessage name="rating" class="input_alert p-2" />
      </Field>
    </div>

    <!-- 6-Image -->
    <div class="form-item mb-4">
      <Field
        v-model="article.image"
        name="image"
        value="https://pictogrammers.com/library/mdi/"
        v-slot="{ field, errors }"
      >
        <input
          v-bind="field"
          type="text"
          class="form-control"
          :class="computedInvalidClass(errors)"
          placeholder="Add the source of the image"
        />
        <ErrorMessage name="image" class="input_alert" />
      </Field>
    </div>

    <VBtn type="submit" variant="elevated" size="large" class="bg-purple" :disabled="loading" :loading="loading"
      >Edit article</VBtn
    >
  </Form>
</template>

<script setup>
import { ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { computedInvalidClass } from '@/composables/form-stuff';
import { articlesSchema } from '@/composables/schemas';
import Wysiwyg from '@/tools/wysiwyg.vue';
// ROUTE
import { useRoute } from 'vue-router';
// ARTICLE STORE
import { useArticleStore } from '@/stores/articles';
// TOASTS
import { useToast } from 'vue-toast-notification';

const $toast = useToast();
const route = useRoute();
const articleStore = useArticleStore();

const rating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const veditor = ref('');
const loading = ref(true);
const article = ref({});

function onSubmit(values) {
  loading.value = true;
  articleStore.updateArticle(route.params.id, values).finally(() => {
    loading.value = false;
  });
}

function updateEditor(value) {
  veditor.value = value;
}

// GET ARTICLE BY ID AND POPULATE
articleStore
  .getArticleByID(route.params.id)
  .then((response) => {
    article.value = { ...response };
    updateEditor(response.editor);
    loading.value = false;
  })
  .catch((error) => {
    $toast.error(error.message);
  });
</script>
