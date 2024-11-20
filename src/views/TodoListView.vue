<!-- 代辦清單 -->
<script setup>
import { reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodos } from '../stores/todo';
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue';

const todosStore = useTodos();
const { filter, filteredTodos } = storeToRefs(todosStore);

const options = ['all', 'finished', 'unfinished'];
const emptyName = ref(false);
const newTodo = reactive({
  name: '',
  description: '',
  deadline: ''
});

function addTodo() {
  // 檢查代辦清單有沒有名稱，沒有的話不要新增
  checkName();
  if (emptyName.value) {
    return;
  }

  // 新增代辦
  todosStore.addTodo(newTodo);

  // 清空新增欄位
  for (const key in newTodo) {
    newTodo[key] = '';
  }
}

// 檢查有無代辦名稱
function checkName() {
  emptyName.value = newTodo.name == '' ? true : false;
}
</script>

<template>
  <!-- 篩選 -->
  <RadioGroup v-model="filter">
    <RadioGroupLabel class="sr-only">篩選器</RadioGroupLabel>
    <div class="md:flex justify-around">
      <RadioGroupOption as="template" v-for="option in options" :key="option" :value="option"
        v-slot="{ active, checked }">
        <div :class="[
          active ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300' : '',
          checked ? 'bg-sky-900/75 text-white ' : 'bg-white ',
        ]" class="w-full relative flex cursor-pointer rounded-lg px-5 py-4 mx-2 my-4 shadow-md focus:outline-none">
          <div class="flex w-full items-center justify-between">
            <div class="flex items-center">
              <div class="text-sm">
                <RadioGroupLabel as="p" :class="checked ? 'text-white' : 'text-gray-900'" class="font-medium">
                  {{ option }}
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

  <!-- 新增代辦 -->
  <section class="mb-2 grid">
    <label class="block text-xl font-medium text-white mb-2">New Todo:</label>
    <div class="mb-4 px-4">
      <!-- 名稱 -->
      <label class="block text-sm/6 font-medium text-white">
        Name <span v-if="emptyName" class="text-red-500 pl-2">please input name</span>
        <input v-model="newTodo.name" type="text" @input="checkName"
          class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          :class="{ 'border-red-500 border-2': emptyName }" placeholder="Input to-do name" />
      </label>
      <!-- 描述 -->
      <label class="block text-sm/6 font-medium text-white">
        Description
        <input v-model="newTodo.description" type="text"
          class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          placeholder="Input to-do description" />
      </label>
      <!-- 截止日期 -->
      <label class="block text-sm/6 font-medium text-white">
        Deadline
        <input v-model="newTodo.deadline" type="text"
          class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          placeholder="Input to-do deadline" />
      </label>
    </div>
    <button :disabled="!newTodo" type="button"
      class="justify-self-end inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      @click="addTodo">Add</button>
  </section>

  <!-- 代辦清單 -->
  <section class="py-2">
    <label class="text-xl text-white font-bold" for="todo">To Do:</label>
  </section>
  <div id="todo">
    <label :for="todo.id" v-for="todo in filteredTodos" :key="todo.id"
      class="bg-white w-full relative flex justify-between cursor-pointer rounded-lg px-8 py-4 mx-2 my-4 shadow-md focus:outline-none">
      <div>
        <p class="text-black font-medium text-lg">{{ todo.data.name }}</p>
        <p class="text-black/50">{{ todo.data.description }}</p>
        <p class="text-black/50">{{ todo.data.deadline }}</p>
      </div>
      <div class="inline-flex items-center relative">
        <input :id="todo.id" v-model="todo.isFinished" type="checkbox"
          class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-sky-900 checked:bg-sky-900 checked:before:bg-sky-900 hover:before:opacity-10" />
        <div
          class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
            stroke="currentColor" stroke-width="1">
            <path fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
    </label>
  </div>
</template>
