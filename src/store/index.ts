import { configureStore } from "@reduxjs/toolkit";
import todosReduser from './todos/todosSlice'



export const store = configureStore({
  reducer : {
    todos: todosReduser
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch