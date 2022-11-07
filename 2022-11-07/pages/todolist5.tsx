import TodoCreate from '@ui/todo/TodoCreate'
import TodoHeader from '@ui/todo/TodoHeader'
import { ChangeEvent, FormEvent, useState } from 'react'

const todolist4 = () => {
  const date = new Date()
  const today = date.toLocaleDateString('ko-kr', { year: 'numeric', month: 'long', day: 'numeric' })
  const dayName = date.toLocaleDateString('ko-kr', { weekday: 'long' })

  const [isOpen, setIsOpen] = useState(true)
  const [createInput, setCreateInput] = useState('')

  const onCreateToggle = () => {
    setIsOpen(!isOpen)
  }

  const onChangeCreate = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCreateInput(value)
  }

  const onSubmitCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault
  }
  return (
    <>
      <TodoHeader today={today} dayName={dayName} unDoneTask={0} />
      <TodoCreate
        isOpen={isOpen}
        onToggle={onCreateToggle}
        onChange={onChangeCreate}
        onSubmit={onSubmitCreate}
        value={createInput}
      />
    </>
  )
}

export default todolist4
