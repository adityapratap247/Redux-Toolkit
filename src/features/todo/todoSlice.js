import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  todos: [
    { id: '1', task: 'Learn Redux Toolkit', isDone: true },
    { id: '2', task: 'Build a modern Todo application', isDone: false },
    { id: '3', task: 'Master state management', isDone: false },
  ],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const taskText = typeof action.payload === 'string' ? action.payload : action.payload?.task || '';
      if (!taskText.trim()) return;
      const newTodo = {
        id: nanoid(),
        task: taskText.trim(),
        isDone: false,
      };
      state.todos.push(newTodo);
    },
    deleteTodo: (state, action) => {
      const id = typeof action.payload === 'object' && action.payload?.id ? action.payload.id : action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    markAsDone: (state, action) => {
      const id = typeof action.payload === 'object' && action.payload?.id ? action.payload.id : action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        if (typeof action.payload === 'object' && 'isDone' in action.payload) {
          todo.isDone = Boolean(action.payload.isDone);
        } else {
          todo.isDone = !todo.isDone;
        }
      }
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.isDone);
    },
  },
});

export const { addTodo, deleteTodo, markAsDone, clearCompleted } = todoSlice.actions;
export default todoSlice.reducer;
