import TodoHeader from '@ui/components/todo/TodoHeader'
import React from 'react'

export default function todolist3() {
  const date = new Date()
  const today = date.toLocaleDateString('ko-kr', { year: 'numeric', month: 'long', day: 'numeric' })
  const dayName = date.toLocaleString('ko-kr', { weekday: 'long' })
  return (
    <div>
      <TodoHeader today={today} dayName={dayName} unDoneTask={0} />
    </div>
  )
}
