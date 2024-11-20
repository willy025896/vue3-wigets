<script setup>
import { fileNumLimit } from "../constant.js";
import { ref } from 'vue';
import HintModal from "@/components/HintModal.vue";
import HintText from "@/components/HintText.vue";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue';

// 存儲圖片 URL 和圖片檔案
const imageUrl = ref([]);
const imageFile = ref([]);
const selQuality = ref(0.8);
const modalRef = ref(null);
const modalTitle = ref('提示');
const modalContent = ref('最多只能選擇' + fileNumLimit + '個檔案');
const qualities = ref([
  {
    name: '不壓縮',
    value: 1
  }, {
    name: '高',
    value: 0.8
  }, {
    name: '普通',
    value: 0.5
  }, {
    name: '差',
    value: 0.1
  }
]);

// 處理文件選擇
const handleFileChange = (event) => {
  const input = event.target;
  // 檢查檔案數量
  if (input.files.length > fileNumLimit) {
    input.value = '';
    modalRef.value?.openModal();
    return;
  }

  for (const file of event.target.files) {
    if (file) {
      imageFile.value.push(file);
      createImagePreview(file);
    }
  }
};

// 創建圖片預覽
const createImagePreview = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    imageUrl.value.push(e.target.result);
  };
  reader.readAsDataURL(file);
};

// 下載 JPG 文件
const downloadJpg = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // 處理陣列中的圖片
  imageUrl.value.forEach((url, index) => {
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      // 轉換為 JPG 格式，並設定壓縮品質
      const jpgDataUrl = canvas.toDataURL('image/jpeg', selQuality.value); // 設置壓縮品質為 0.8

      // 建立下載
      const a = document.createElement('a');
      a.href = jpgDataUrl;
      a.download = 'image' + (index + 1) + '.jpg'; // 設置下載文件名
      a.click();
    };

    img.src = url;
  });
};
</script>

<template>
  <div>
    <h2 class="text-xl mb-2">上傳並轉換圖片為 JPG</h2>
    <!-- Hint -->
    <HintText :text="'檔案數量限制：' + fileNumLimit" />
    <!-- 上傳圖片的 input -->
    <input class="block w-full text-sm text-slate-400 font-bold mb-2 cursor-pointer
		file:mr-4 file:py-2 file:px-4
		file:rounded-md file:border-0
		file:text-sm file:font-semibold
		file:cursor-pointer
		file:bg-[#00bd7e] file:text-white
		hover:file:bg-white hover:file:text-[#00bd7e]" type="file" accept="image/*" @change="handleFileChange" multiple />

    <!-- 顯示預覽圖片 -->
    <div v-if="imageUrl.length > 0">
      <h2 class="text-xl mb-2">預覽圖片<span
          class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">尚未壓縮</span>
      </h2>
      <img class="mb-2" v-for="url in imageUrl" :src="url" :key="url" alt="Image Preview" />
      <RadioGroup class="mb-2" v-model="selQuality">
        <RadioGroupLabel class="text-xl">選擇品質</RadioGroupLabel>
        <div class="flex justify-around mt-1">
          <RadioGroupOption as="template" v-for="quality in qualities" :key="quality.value" :value="quality.value"
            v-slot="{ active, checked }">
            <div :class="[
              active
                ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                : '',
              checked ? 'bg-sky-900/75 text-white ' : 'bg-white ',
            ]" class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none w-full mx-1">
              <div class="flex w-full items-center justify-between">
                <div class="flex items-center">
                  <div class="text-sm">
                    <RadioGroupLabel as="p" :class="checked ? 'text-white' : 'text-gray-900'" class="font-medium">
                      {{ quality.name }}
                    </RadioGroupLabel>
                  </div>
                </div>
                <div v-show="checked" class="shrink-0 text-white">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.2" />
                    <path d="M7 13l3 3 7-7" stroke="#fff" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
      <button @click="downloadJpg" class="text-white bg-[#00bd7e] rounded-md px-4 py-2">下載 JPG</button>
    </div>
  </div>

  <!-- Modal -->
  <HintModal ref="modalRef" :title="modalTitle" :content="modalContent" />
</template>
