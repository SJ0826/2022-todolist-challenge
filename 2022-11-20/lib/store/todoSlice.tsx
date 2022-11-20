import { createSlice } from '@reduxjs/toolkit'
import { TodoItemType } from 'lib/interface/todo.interface'

const initialState: TodoItemType[] = []
// slice 생성
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // action의 타입에 따라 state인 TodoItemType을 변화시켜 새로운 TodoItemType을 return
    // payload: action의 타입에 따라 필요한 state값을 담고 있음.
    createTodo: (state, action) => [...state, action.payload],
    deleteTodo: (state, action) => state.filter((el) => el.id !== action.payload),
    toggleDone: (state, action) => state.map((el) => (el.id === action.payload ? { ...el, done: !el.done } : el)),
  },
})

export default todoSlice
// action creator 함수 export
export const { createTodo, deleteTodo, toggleDone } = todoSlice.actions
