import { createSlice,nanoid} from "@reduxjs/toolkit";


export const initialState={
    todos:[{id:1,text:"hello world"}]
}
export const todoState=createSlice({
    name:'todo',
    initialState,
    reducer:{
        addTodo:(state,action)=>{
            const todo={
                id:nanoid(),
                text:action.payload
            }
            state.todos.push(todo)
        },
        removeTodo:(state,action)=>{
                state.todos=state.todos.filter((todo)=>todo.id!==action.payload)
        }
    }
})

export const {addTodo,removeTodo}=createSlice.actions

export default todoSlice.reducer