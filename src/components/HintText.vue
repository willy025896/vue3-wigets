<!-- 提示文字 -->
<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  }
});
</script>

<template>
  <div class="flex bg-blue-200 rounded-md px-3 py-4 mb-2">
    <div class="shrink-0">
      <svg class="text-[#60a5fa] w-5 h-5 block align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
        fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd"
          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
          clip-rule="evenodd"></path>
      </svg>
    </div>
    <div class="ml-2">
      <p class="text-blue-600 text-sm">{{ text }}</p>
    </div>
  </div>
</template>
