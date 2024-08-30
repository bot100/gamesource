<template>
  <div v-if="articleStore.getSomeSlides">
    <Carousel :items-to-show="1" :wrap-around="true" class="p_top">
      <Slide v-for="slide in articleStore.getSomeSlides" :key="slide.id">
        <div class="slider_bck" :style="{ background: `url(${slide.image})` }">
          <div class="slide_content">
            <div class="item">
              <div>{{ slide.title }}</div>
              <div>{{ slide.excerpt }}</div>
            </div>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </div>

  <div v-else class="text-center position-absolute top-50 start-50 translate-middle">
    <VProgressCircular color="purple" indeterminate model-value="20" :size="50"></VProgressCircular>
  </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import { useArticleStore } from '@/stores/articles';
const articleStore = useArticleStore();
</script>
