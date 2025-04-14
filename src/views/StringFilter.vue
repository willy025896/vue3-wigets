<script setup>
import { ref } from 'vue';
import iconArrowDown from '@/components/icons/iconArrowDown.vue';
import iconCopy from '@/components/icons/iconCopy.vue';

const originString = ref('');
const removeChar = ref('.');
const result = ref('');
const isDisabled = ref(false);
const copyText = ref('複製結果');

// 移除字元
const remove = () => {
  let escapedChar = escapeRegExp(removeChar.value);
  let regex = new RegExp(escapedChar, 'g');
  result.value = originString.value.replace(regex, '');
};

// 跳脫特殊符號
const escapeRegExp = (char) => {
  return char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// 複製結果
const copyResult = () => {
  isDisabled.value = true;
  navigator.clipboard.writeText(result.value)
    .then(() => {
      copyText.value = '複製成功';
      recoverButton();
    })
    .catch(err => {
      console.log(err);
      copyText.value = '複製失敗';
      recoverButton();
    });
};

// 復原複製按鈕
const recoverButton = () => {
  setTimeout(() => {
    copyText.value = '複製結果';
    isDisabled.value = false;
  }, 3000);
};

</script>

<template>
  <div>
    <h2 class="text-xl mb-2">移除文字中特定字元(預設移除 ".")</h2>

    <label for="origin-string" class="block my-1">原文</label>
    <input v-model="originString" id="origin-string"
      class="block w-full text-sm text-slate-400 font-bold mb-2 p-2 rounded" type="input" />

    <label for="removed-char" class="block my-1">移除的字元</label>
    <input v-model="removeChar" id="removed-char" class="block w-full text-sm text-slate-400 font-bold mb-2 p-2 rounded"
      type="input" />

    <div class="flex justify-center my-2">
      <button type="button" class="flex text-white rounded bg-[#00bd7e] hover:bg-white hover:text-[#00bd7e] px-2 py-1"
        @click="remove">
        <iconArrowDown class="w-5" />產生結果
      </button>
    </div>

    <label for="result" class="block my-1">結果</label>
    <input v-model="result" id="result" class="block w-full text-sm text-slate-400 font-bold mb-2 p-2 rounded"
      type="text" disabled>

    <div v-show="result" class="flex justify-center my-2">
      <button type="button" class="flex text-white rounded bg-[#00bd7e] hover:bg-white hover:text-[#00bd7e] px-2 py-1"
        :disabled="isDisabled" @click="copyResult">
        <iconCopy class="w-5" />{{ copyText }}
      </button>
    </div>

  </div>
</template>
