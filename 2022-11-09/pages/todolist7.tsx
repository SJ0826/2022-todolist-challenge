import TodoHeader from '@ui/components/todo/TodoHeader'
import getDateString from 'lib/utils/getDateString'

const TodoList7 = () => {
  const { dateString, dayName } = getDateString()

  return (
    <>
      <TodoHeader today={dateString} dayName={dayName} unDoneTask={0} />
    </>
  )
}

export default TodoList7
