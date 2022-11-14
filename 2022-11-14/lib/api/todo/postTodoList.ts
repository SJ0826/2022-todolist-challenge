import { client } from '../client'

export const postTodoList = async (params: { text: string }) => {
  try {
    const url = '/api/todo'
    await client.post(url, params)
  } catch (e) {
    throw e
  }
}
