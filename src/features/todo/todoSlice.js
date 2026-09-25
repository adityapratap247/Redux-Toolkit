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
                state.todos.push(newTodo); // state.todos mtlb state ke andr todos ko access kiya
            }
        }
    })
