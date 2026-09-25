 import { createSlice, nanoid } from '@reduxjs/toolkit'

  const initialState = {
        todos: [{id: "abc", task:"demo-task", isDone: false}],
    };

    export const todoSlice = createSlice({
        name: "todo",
        initialState,
        reducers: { //state, action
            addTodo: (state, action) => { // state variable ki baathorhi hai  or action mtl jo event occur hora hai
                const newTodo = {
                    id: nanoid(),
                    task: action.payload, // is se humare pas task aajayega
                    isDone: false,
                }   
                state.todos.push(newTodo); // direct mutation // state.todos mtlb state ke andr todos ko access kiya or new todo ko push kardiya
            },
            deleteTodo:(state,action) =>{
                state.todos = state.todos.filter((todo)=> todo.id !== action.payload)
            },
            markAsDone: (state, action)=>{
                state.todos = state.todos.map((todo)=>{
                    if(todo.id === action.payload){
                        todo.isDone = true;
                    }
                })
            }
        }
    })
