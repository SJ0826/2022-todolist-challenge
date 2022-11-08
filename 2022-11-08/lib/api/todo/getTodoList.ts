import { TodoItemType } from 'pages/todolist6'
import { client } from '../client'

export const getTodoList = async (): Promise<TodoItemType[]> => {
  try {
    const url = '/api/todo'
    const { data } = await client.get(url)
    return data.data
  } catch (e) {
    throw e
  }
}
