<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import { ref, watchEffect } from 'vue';
import { navList, externalLinks } from './constant';

const title = ref('home');
const route = useRoute();

watchEffect(() => {
  setTitle();
});

function setTitle() {
  const nav = navList.find(nav => nav.url == route.path);
  if (nav.name == 'About') {
    title.value = '關於本專案';
  } else {
    title.value = nav.name;
  }
}
</script>

<template>
  <!-- 左側區塊 -->
  <header class="lg:border-r lg:border-[#5454547a]">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="Welcome!" />
      <nav>
        <template v-for="route in navList" :key="route.name">
          <RouterLink :to="route.url">{{ route.name }}</RouterLink>
        </template>
      </nav>
      <section class="text-center">
        <h3>其他外部連結</h3>
        <div class="link-group">
          <a v-for="link in externalLinks" :key="link.name" :href="link.url" target="_blank" rel="noopener">{{
            link.name }}
          </a>
        </div>
      </section>
    </div>
  </header>

  <!-- 右側區塊 -->
  <main class="text-center lg:text-left px-16">
    <div class="container">
      <h2 class="text-3xl text-white font-bold mb-2">{{ title }}</h2>
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

section {
  margin-top: 2rem;
}

.link-group {
  margin-top: 1rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
  }
}
</style>
