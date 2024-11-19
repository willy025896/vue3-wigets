<script setup>
import { ref } from 'vue';
// 存儲圖片 URL 和圖片檔案
const imageUrl = ref(null);
const imageFile = ref(null);

// 處理文件選擇
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    createImagePreview(file);
  }
};

// 創建圖片預覽
const createImagePreview = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    imageUrl.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

// 下載 JPG 文件
const downloadJpg = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  img.onload = () => {
    // 設置 canvas 寬高為圖片的尺寸
    canvas.width = img.width;
    canvas.height = img.height;

    // 將圖片繪製到 canvas 上
    ctx.drawImage(img, 0, 0);

    // 轉換為 JPG 格式
    const jpgDataUrl = canvas.toDataURL('image/jpeg', 0.8); // 設置壓縮品質為 0.8

    // 創建下載鏈接
    const a = document.createElement('a');
    a.href = jpgDataUrl;
    a.download = 'image.jpg'; // 設置下載文件名
    a.click();
  };

  // 設置圖片源
  img.src = imageUrl.value;
};
</script>
<template>
  <div>
    <h2 class="text-xl mb-2">上傳並轉換圖片為 JPG</h2>
    <!-- 上傳圖片的 input -->
    <input class="block w-full text-sm text-slate-400 font-bold mb-2 cursor-pointer
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:cursor-pointer
      file:bg-[#00bd7e] file:text-white
      hover:file:bg-white hover:file:text-[#00bd7e]" type="file" accept="image/*" @change="handleFileChange" />

    <!-- 顯示預覽圖片 -->
    <div v-if="imageUrl">
      <h2 class="text-xl mb-2">預覽圖片</h2>
      <img class="mb-2" :src="imageUrl" alt="Image Preview" />
      <button @click="downloadJpg" class="text-white bg-[#00bd7e] rounded-md px-4 py-2">下載 JPG</button>
    </div>
  </div>
</template>
