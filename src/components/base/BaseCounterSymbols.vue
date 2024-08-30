<template>
  <small v-if="fieldComputed.length > 0" class="badge bg-info mt-2 ml-2 fs-6"
    >Characters:
    <span class="badge text-bg-secondary">
      <slot>{{ fieldComputed.length }}</slot>
    </span>
  </small>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps(['field']);

const fieldComputed = computed(() => {
  if (!props.field.value) return 0;
  return props.field.value;
});
</script>
