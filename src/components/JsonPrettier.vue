<!-- Json prettier -->
<script setup>
import { computed, ref } from 'vue';

const input = ref('');
const output = ref('');
const indent = ref(4);

const numericIndent = computed(() => {
  // 將輸入值轉為數字，不然 stringify 會直接將數字補在前面而不是補空白
  return Number(indent.value);
})

function prettier() {
  output.value = JSON.stringify(JSON.parse(input.value), null, numericIndent.value);
}
</script>

<template>
  <div class="w-full h-screen">
    <h2 class="text-xl mb-2">將 Json 字串美化</h2>
    <!-- input -->
    <div class="h-1/3">
      <textarea class="py-1 px-2 text-black rounded-md w-full h-full resize" v-model="input" name="input" id="input"
        placeholder="輸入 Json 字串"></textarea>
    </div>
    <!-- button -->
    <div class=" w-full flex justify-center my-5">
      <input class="text-black px-1 rounded-sm mx-1 placeholder:text-gray-400" type="text" v-model="indent"
        placeholder="輸入空格數">
      <button @click="prettier" class="text-white bg-[#00bd7e] rounded-md px-2 py-1">prettier</button>
    </div>
    <!-- output -->
    <div class="h-1/3">
      <textarea class="py-1 px-2 text-black rounded-md w-full h-full resize" v-model="output" disabled name="output"
        id="output" placeholder="輸出結果"></textarea>
    </div>
  </div>
</template>
