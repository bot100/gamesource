import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
// Toasts
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
// FIREBASE
import { AUTH } from './tools/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
// Vuetify
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// Masonry
import { VueMasonryPlugin } from 'vue-masonry';

import BaseCounterSymbols from '@/components/base/BaseCounterSymbols.vue';

const vuetify = createVuetify({
  components,
  directives
});

// Pinia
const pinia = createPinia();

let app;

onAuthStateChanged(AUTH, () => {
  if (!app) {
    app = createApp(App);

    app.component('BaseCounterSymbols', BaseCounterSymbols);

    app.use(pinia);
    app.use(router);
    app.use(ToastPlugin);
    app.use(vuetify);
    app.use(VueMasonryPlugin);

    app.mount('#app');
  }
});
