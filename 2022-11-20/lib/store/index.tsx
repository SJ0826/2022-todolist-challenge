import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './todoSlice'

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
})

// RootState, AppDispatch 의 타입을 설정
// 타입에러를 막기 위해서 스토어 설정 파일에서 타입을 직접내보내서 사용하는 편이 안전하다.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
