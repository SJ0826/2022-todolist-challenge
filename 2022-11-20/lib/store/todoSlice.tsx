import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteTodoList } from 'lib/api/todo/deleteTodoList'
import { getTodoList } from 'lib/api/todo/getTodoList'
import { patchTodoList } from 'lib/api/todo/patchTodoList'
import { postTodoList } from 'lib/api/todo/postTodoList'
import { TodoItemType } from 'lib/interface/todo.interface'

const initialState: TodoItemType[] = []

// 비동기 처리를 위해 createAsyncThunk를 사용
export const getTodo = createAsyncThunk(
  'todo/getTodo', // 액션 타입
  async () => {
    // 프로미스를 반환하는 비동기 함수
    const response = await getTodoList()
    return response
  },
)

export const createTodo = createAsyncThunk('todo/createTodo', async (text: string) => {
  await postTodoList({ text })
  const response = await getTodoList()
  return response
})

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id: number) => {
  await deleteTodoList(id)
  const response = await getTodoList()
  return response
})

export const toggleDone = createAsyncThunk('todo/toggleDone', async ({ id, done }: { id: number; done: boolean }) => {
  await patchTodoList(id, { done })
  const response = await getTodoList()
  return response
})
// slice 생성
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // action의 타입에 따라 state인 TodoItemType을 변화시켜 새로운 TodoItemType을 return
    // payload: action의 타입에 따라 필요한 state값을 담고 있음.
    // createTodo: (state, action) => [...state, action.payload],
    // deleteTodo: (state, action) => state.filter((el) => el.id !== action.payload),
    // toggleDone: (state, action) => state.map((el) => (el.id === action.payload ? { ...el, done: !el.done } : el)),
  },
  // createAsyncThunk를 사용할때는 extraReducer 사용
  extraReducers: (builder) => {
    builder.addCase(getTodo.fulfilled, (state, action) => action.payload)
    builder.addCase(getTodo.rejected, () => [])
    builder.addCase(createTodo.fulfilled, (state, action) => action.payload)
    builder.addCase(deleteTodo.fulfilled, (state, action) => action.payload)
    builder.addCase(toggleDone.fulfilled, (state, action) => action.payload)
  },
})

export default todoSlice
