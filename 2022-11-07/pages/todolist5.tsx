import TodoHeader from '@ui/todo/TodoHeader'

const todolist4 = () => {
  const date = new Date()
  const today = date.toLocaleDateString('ko-kr', { year: 'numeric', month: 'long', day: 'numeric' })
  const dayName = date.toLocaleDateString('ko-kr', { weekday: 'long' })
  return (
    <>
      <TodoHeader today={today} dayName={dayName} unDoneTask={0} />
    </>
  )
}

export default todolist4
