<template>
  <TheHeader />

  <div v-if="userStore.loading" class="text-center position-absolute top-50 start-50 translate-middle">
    <VProgressCircular color="purple" indeterminate model-value="20" :size="50"></VProgressCircular>
  </div>

  <main v-else>
    <RouterView />
  </main>
</template>

<script setup>
import TheHeader from '@/components/header/TheHeader.vue';
import { tryLoadAppWithUser } from '@/composables/auth';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

tryLoadAppWithUser();
</script>
