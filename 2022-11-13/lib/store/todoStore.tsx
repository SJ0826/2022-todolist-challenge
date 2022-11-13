import { deleteTodoList } from 'lib/api/todo/deleteTodoList'
import { getTodoList } from 'lib/api/todo/getTodoList'
import { patchTodoList } from 'lib/api/todo/patchTodoList'
import { postTodoList } from 'lib/api/todo/postTodoList'
import { observable } from 'mobx'
import { TodoItemType } from 'pages/todolist11'

export interface Store {
  todo: TodoItemType[]
  getTodo: () => Promise<void>
  createTodo: (text: string) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
  toggleDone: (id: number, done: boolean) => Promise<void>
}

export const store: Store = {
  todo: [],
  async getTodo() {
    const response = await getTodoList()
    this.todo = response
  },
  async createTodo(text) {
    await postTodoList({ text })
    await this.getTodo()
  },
  async deleteTodo(id) {
    await deleteTodoList(id)
    await this.getTodo()
  },
  async toggleDone(id, done) {
    await patchTodoList(id, { done })
    await this.getTodo()
  },
}

export default observable.object(store)
