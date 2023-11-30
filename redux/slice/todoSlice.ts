import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {TodoType} from '../../types/todoType';
import {todoActions} from '../../actions/todoActions';

interface InitialProps {
  todos: Array<TodoType>;
  todo: TodoType | null;
}

const initialState: InitialProps = {
  todos: [],
  todo: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    clearTodosList: state => {
      state.todos = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(todoActions.get.fulfilled, (state, action) => {
        state.todo = action.payload;
      })
      .addCase(todoActions.getAll.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(todoActions.create.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addMatcher(
        isAnyOf(todoActions.update.pending, todoActions.update.rejected),
        (state, action) => {
          const currentTodo = state.todos.find(
            todo => todo._id === action.meta.arg.todo._id,
          );
          const indexTodo = state.todos.findIndex(
            todo => todo._id === action.meta.arg.todo._id,
          );
          if (!currentTodo) return;
          state.todos[indexTodo] =
            action.type === todoActions.update.pending.type
              ? action.meta.arg.todo
              : currentTodo;
        },
      )
      .addMatcher(
        isAnyOf(todoActions.delete.pending, todoActions.delete.rejected),
        (state, action) => {
          const currentTodoId = action.meta.arg;
          if (action.type === todoActions.delete.pending.type) {
            state.todos = state.todos.filter(
              todo => todo._id !== currentTodoId,
            );
          }
        },
      );
  },
});

export const {clearTodosList} = todoSlice.actions;
export default todoSlice.reducer;
