import { computed } from 'vue';

export const computedInvalidClass = computed(() => (errors) => {
  return { 'is-invalid': errors.length !== 0 };
});
