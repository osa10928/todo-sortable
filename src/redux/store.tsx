import {combineReducers, configureStore, PreloadedState} from "@reduxjs/toolkit";
import todoListReducer from '../features/TodoList/TodoListSlice';
export const rootReducer = combineReducers({
    todoList: todoListReducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState: preloadedState
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type Store = ReturnType<typeof setupStore>
export type AppDispatch = Store['dispatch'];
