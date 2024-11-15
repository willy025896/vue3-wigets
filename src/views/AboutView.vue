<script setup>
import { mainPackage } from "../constant.js";
import DocumentationIcon from '../components/icons/IconDocumentation.vue'
import EcosystemIcon from '../components/icons/IconEcosystem.vue'
</script>
<template>
  <section class="flex flex-col mt-2 mb-4">
    <h3 class="text-2xl mb-2 flex flex-row">
      <EcosystemIcon class="flex m-1.5" />起因
    </h3>
    <div class="indent-8"> 我開始接觸 vue 的時候寫的是 vue2，隔了一兩年之後 vue3 發布了。
      但是因為當時的公司沒有升級的打算，加上本身其實對前端技術沒有想精進的念頭，所以也一直
      沒有深入去研究要怎麼寫。直到我跟我朋友都在尋找新工作機會的時候，發現有用 vue 的公司
      似乎大部分都是使用 vue3 或是兩種都有用了，就想說我也差不多該來更新一下我的能力值了。
      因此，這個專案就這樣子誕生了。
    </div>
  </section>
  <section>
    <h3 class="text-2xl mb-2 flex flex-row">
      <DocumentationIcon class="flex m-1.5" />專案基本資訊
    </h3>
    <table class="border-collapse border border-green-700 w-full">
      <thead class="bg-green-700">
        <tr>
          <th class="border border-green-800 p-2 text-white">套件名稱</th>
          <th class="border border-green-800 p-2 text-white">版本</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in mainPackage" :key="row.name">
          <td class="border border-green-900 p-2">{{ row.name }}</td>
          <td class="border border-green-900 p-2">{{ row.version }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
