import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import React, { ChangeEvent, FormEvent, useState } from 'react'

export default function todolist2() {
  const today = new Date()
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const dayName = today.toLocaleDateString('ko-KR', {
    weekday: 'long',
  })

  const [isOpenCreate, setIsOpenCreate] = useState(false)
  const [createInput, setCreateInput] = useState('')

  const onToggleCreate = () => {
    setIsOpenCreate((prev) => !prev)
  }

  const onChangeCreateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCreateInput(value)
  }

  const onSubmitCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsOpenCreate(false)
    setCreateInput('')
  }
  return (
    <div>
      <TodoHeader dateString={dateString} dayName={dayName} unDoneTaskLength={0} />
      <TodoCreate
        isOpen={isOpenCreate}
        onToggle={onToggleCreate}
        onChange={onChangeCreateInput}
        onSubmit={onSubmitCreate}
        value={createInput}
      />
    </div>
  )
}
