<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')

function convert() {
  output.value = display(JSON.parse(input.value))
}

function display(jsonObj, level = 0) {
  let outputValue = ''

  for (const key in jsonObj) {
    const indent = " ".repeat(level * 2)
    // 除了第一層以外都要先換行
    if (level >= 1 && outputValue == '') {
      outputValue += "\n"
    }

    // 判斷為物件就進行遞迴
    if (jsonObj[key] instanceof Object) {
      outputValue += indent + key + ': ' + display(jsonObj[key], level + 1)
    } else {
      outputValue += indent + key + ': ' + decideValueString(jsonObj[key]) + "\n"
    }
  }

  return outputValue
}

// 物件值為字串時加上 "" 強調
function decideValueString(value) {
  if (typeof value === "string") {
    value = '"' + value + '"'
  }
  return value
}
</script>

<template>
  <div class="w-full h-screen">
    <h2 class="text-xl">將 json 字串 JSON.parse() 並格式化</h2>
    <!-- input -->
    <div class="h-1/3">
      <textarea class="p-1 text-black rounded-md w-full h-full resize" v-model="input" name="input" id="input"
        placeholder="json string"></textarea>
    </div>
    <!-- button -->
    <div class=" w-full flex justify-center my-5" @click="convert"><button
        class="text-white bg-[#00bd7e] rounded-md px-2 py-1">convert</button>
    </div>
    <!-- output -->
    <div class="h-1/3">
      <textarea class="p-1 text-black rounded-md w-full h-full resize" v-model="output" disabled name="output"
        id="output" placeholder="輸出結果"></textarea>
    </div>
  </div>
</template>
