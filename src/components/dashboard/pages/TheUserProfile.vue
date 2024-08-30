<template>
  <h2>User Profile</h2>

  <hr />

  <div v-if="loading" class="text-center position-absolute top-50 start-50 translate-middle">
    <VProgressCircular color="purple" indeterminate model-value="20" :size="50"></VProgressCircular>
  </div>

  <Form v-else @submit="onSubmit" :validation-schema="formSchema">
    <div class="form-item mb-4">
      <Field v-model="firstName" name="firstName" v-slot="{ field, errors }">
        <input
          v-bind="field"
          type="text"
          class="form-control"
          :class="computedInvalidClass(errors)"
          placeholder="Your firstname"
        />
        <ErrorMessage name="firstName" class="input_alert p-2" />
      </Field>
    </div>

    <div class="form-item mb-4">
      <Field v-model="lastName" name="lastName" v-slot="{ field, errors }">
        <input
          v-bind="field"
          type="text"
          class="form-control"
          :class="computedInvalidClass(errors)"
          placeholder="Your lastname"
        />
        <ErrorMessage name="lastName" class="input_alert p-2" />
      </Field>
    </div>

    <VBtn type="submit" variant="outlined" :disabled="loading" :loading="loading">Update profile</VBtn>
  </Form>
</template>

<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { computedInvalidClass } from '@/composables/form-stuff';

const { firstName, lastName, loading, formSchema, onSubmit } = useUpdateProfile();
</script>
