import { createSlice, PayloadAction  } from "@reduxjs/toolkit";


interface Todo {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  created: number;
  lastUpdated: number;
}

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: []
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload)
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(({id}) => id === action.payload)
      if(todo) {
        todo.completed = !todo.completed
      }
    }, 
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(({id}) => id !== action.payload)
    }
  }
})
 export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions

 export default todosSlice.reducer