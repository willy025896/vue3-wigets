<script setup>
import { ref } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import Converter from '../components/JsonConverter.vue';
import Prettier from '../components/JsonPrettier.vue';

const categories = ref(["Json Converter", "Json Prettier"])
</script>

<template>
  <div class="w-full max-w-md px-2 sm:px-0">
    <TabGroup>
      <!-- tabs -->
      <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Tab v-for="category in categories" as="template" :key="category" v-slot="{ selected }">
          <button :class="[
            'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            selected
              ? 'bg-white text-blue-700 shadow'
              : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
          ]">
            {{ category }}
          </button>
        </Tab>
      </TabList>
      <!-- contents -->
      <TabPanels class="mt-2">
        <!-- Converter -->
        <TabPanel :class="[
          'rounded-xl p-3',
          'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
        ]">
          <Converter></Converter>
        </TabPanel>
        <!-- Prettier -->
        <TabPanel :class="[
          'rounded-xl p-3',
          'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
        ]">
          <Prettier></Prettier>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
