import { defineStore } from 'pinia';

export const useTodos = defineStore('todos', {
  state: () => ({
    /** @type {{ data: object, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all',
    // type will be automatically inferred to number
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      return state.todos.filter((todo) => todo.isFinished);
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished);
    },
    /**
     * @returns {{ data: object, id: number, isFinished: boolean }[]}
     */
    filteredTodos() {
      if (this.filter === 'finished') {
        return this.finishedTodos;
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos;
      }
      return this.todos;
    },
  },
  actions: {
    addTodo(data) {
      // 複製資料
      let newData = JSON.parse(JSON.stringify(data));
      // 新增代辦清單
      this.todos.push({ data: newData, id: this.nextId++, isFinished: false });
    },
  },
});
