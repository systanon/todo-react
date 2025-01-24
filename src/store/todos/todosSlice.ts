import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { todos } from '../../../mockTodos';
type ID = number;

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  created: number;
  lastUpdated: number;
}

interface TodosState {
  todos: Todo[];
  index: Record<ID, Todo>;
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  index: {},
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (): Promise<Todo[]> => {
  //TODO: connect client
  return new Promise((resolve) => setTimeout(() => resolve(todos), 500));
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      state.index[action.payload.id] =  action.payload
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.index[action.payload]
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      delete state.index[action.payload];
      state.todos = state.todos.filter(({ id }) => id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const todo = state.index[action.payload.id];
      if (todo) {
        Object.assign(todo, action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
        action.payload.forEach((todo) => state.index[todo.id] = todo);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
      });
  },
});
export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;

export default todosSlice.reducer;
