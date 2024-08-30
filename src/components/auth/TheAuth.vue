<template>
  <div class="container signin_container">
    <!-- loader -->
    <div v-if="store.loading" class="text-center">
      <VProgressCircular color="purple" indeterminate model-value="20" :size="50" />
    </div>

    <Form v-else @submit="onSubmit" :validation-schema="userSchema">
      <h2>{{ typeAuthentication(isSingIn) }}</h2>

      <div class="form-item">
        <label for="email">Your email</label>
        <Field name="email" :value="'andrezel02@gmail.com'" v-slot="{ field, errors }">
          <input
            v-bind="field"
            type="text"
            class="form-control"
            :class="computedInvalidClass(errors)"
            placeholder="Enter your email"
          />

          <ErrorMessage name="email" class="input_alert" />
        </Field>
      </div>

      <div class="form-item">
        <label for="password">Your password:</label>
        <Field name="password" :value="'28034q'" v-slot="{ field, errors }">
          <input
            v-bind="field"
            type="text"
            class="form-control"
            :class="computedInvalidClass(errors)"
            placeholder="Enter your password"
          />

          <ErrorMessage name="password" class="input_alert" />
        </Field>
      </div>

      <button type="submit" class="btn mb-3 btn-block">Submit</button>
      <hr />
      <div class="form_swap" @click="changeType">
        <span
          >Do you want <b>{{ typeAuthentication(!isSingIn) }}</b> ?</span
        >
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { userSchema } from '@/composables/schemas';
import errorCoders from '@/tools/firebase/fbcodes';
import { computedInvalidClass } from '@/composables/form-stuff';
// AUTH STORE
import { useUserStore } from '@/stores/user';
// Vue Toast Notification
import { useToast } from 'vue-toast-notification';

const store = useUserStore();
const $toast = useToast();
const isSingIn = ref(true); // true = sign in; false = sign up

const typeAuthentication = computed(() => (value) => {
  return value ? 'Sing-In' : 'Sign-Up';
});

function changeType() {
  isSingIn.value = !isSingIn.value;
}

function onSubmit(values) {
  // Sign in
  if (isSingIn.value) {
    store.signInUser(values);
  }

  // Sign up
  if (!isSingIn.value) {
    store.createUser(values);
  }
}

// subscribe to error
store.$onAction(({ name, after, onError }) => {
  if (name === 'signInUser' || name === 'createUser') {
    // Which means everything us good and the user is able to sign in properly
    after(() => {
      $toast.open({
        message: 'Success',
        type: 'success'
      });
    });

    onError((error) => {
      console.log(error);
      console.log(errorCoders(error.message));
      $toast.open({
        message: errorCoders(error.message),
        type: 'error'
      });
    });
  }
});
</script>
