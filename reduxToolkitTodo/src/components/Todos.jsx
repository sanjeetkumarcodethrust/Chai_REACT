import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { removeTodo } from '../features/todo/Todoslice'

function Todos() {
   const todos= useSelector(state=>state.Todos)
  return (
    <div>
      
    </div>
  )
}

export default Todos
