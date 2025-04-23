<script setup>
import { ref } from 'vue';
import iconArrowDown from '@/components/icons/iconArrowDown.vue';
import iconCopy from '@/components/icons/iconCopy.vue';

const originString = ref('');
const seperator = ref('');
const result = ref('');
const isDisabled = ref(false);
const copyText = ref('複製結果');

// 分隔並斷行
const seperate = () => {
  let stringList = originString.value.split(seperator.value);
  let context = '';
  for (let index = 0; index < stringList.length; index++) {
    if (index == stringList.length - 1) {
      context += stringList[index] + '\n';
    } else {
      context += stringList[index] + '\n' + seperator.value;
    }

  }
  result.value = context;
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
    <h2 class="text-xl mb-2">文字斷行器(預設會斷行在字符前)</h2>

    <label for="origin-string" class="block my-1">原文</label>
    <input v-model="originString" id="origin-string"
      class="block w-full text-sm text-slate-400 font-bold mb-2 p-2 rounded" type="input" />

    <label for="seperator" class="block my-1">分隔並斷行的字符</label>
    <input v-model="seperator" id="seperator" class="block w-full text-sm text-slate-400 font-bold mb-2 p-2 rounded"
      type="input" placeholder="請輸入判斷要斷行的字" />

    <div class="flex justify-center my-2">
      <button type="button" class="flex text-white rounded bg-[#00bd7e] hover:bg-white hover:text-[#00bd7e] px-2 py-1"
        @click="seperate">
        <iconArrowDown class="w-5" />產生結果
      </button>
    </div>

    <label for="result" class="block my-1">結果</label>
    <textarea v-model="result" id="result" class="block w-full text-sm h-80 text-slate-400 font-bold mb-2 p-2 rounded"
      type="text" disabled></textarea>

    <div v-show="result" class="flex justify-center my-2">
      <button type="button" class="flex text-white rounded bg-[#00bd7e] hover:bg-white hover:text-[#00bd7e] px-2 py-1"
        :disabled="isDisabled" @click="copyResult">
        <iconCopy class="w-5" />{{ copyText }}
      </button>
    </div>

  </div>
</template>
