<script setup>
import { ref } from 'vue';

const displayValue = ref('0');
const buttons = [
  'C', '/', '*', '-', '7', '8', '9', '+', '4', '5', '6', '=', '1', '2', '3', '.', '0'
];

const handleClick = (button) => {
  switch (button) {
    case 'C':
      displayValue.value = '0';
      break;
    case '=':
      try {
        checkCalcString();
        displayValue.value = eval(displayValue.value).toString();
      } catch (error) {
        displayValue.value = error;
      }
      break;
    default:
      if (displayValue.value === '0' && button !== '.') {
        displayValue.value = button;
      } else {
        displayValue.value += button;
      }
      break;
  }
};

// 檢查是否有非設定好的按鍵文字
function checkCalcString() {
  for (const char of displayValue.value) {
    if (buttons.indexOf(char) === -1) {
      throw new Error("Invalid char");
    }
  }
}
</script>

<template>
  <div class="w-56 mx-auto my-5 bg-slate-600 pt-5 pb-1 px-5 rounded-xl">
    <div class="text-black bg-white h-10 pr-5 text-right text-3xl rounded-md">{{ displayValue }}</div>
    <div class="grid grid-cols-4 gap-1 my-3">
      <button class="block text-2xl p-3 cursor-pointer border border-slate-600 hover:rounded-md hover:border-slate-400"
        v-for="button in buttons" :key="button" @click="handleClick(button)">
        {{ button }}
      </button>
    </div>
  </div>
</template>
