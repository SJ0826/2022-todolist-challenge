import { TodoItemType } from 'pages/todolist13'
import { client } from '../client'

export const getTodoList = async (): Promise<TodoItemType[]> => {
  try {
    const url = '/api/v2/todo'
    const userToken = localStorage.getItem('token')
    console.log(`Bearer ${userToken}`, userToken)
    const headers = {
      authorization: `Bearer ${userToken}`,
    }
    const { data } = await client.get(url, { headers })
    return data.data
  } catch (e) {
    throw e
  }
}
