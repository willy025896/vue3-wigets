import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const redirect = sessionStorage.redirect;
console.log(redirect);
if (redirect) {
  sessionStorage.removeItem('redirect');
  router.replace(redirect);
  console.log(redirect);
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
