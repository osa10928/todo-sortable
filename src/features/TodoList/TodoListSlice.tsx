import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Todo} from "../../models/Todo.model";
import {TODOSPRESET} from "../../configs/todos.config";

export interface TodoListState {
    todoList: Todo[],
    inputValue: string
}

const initialState: TodoListState = {
    todoList: TODOSPRESET,
    inputValue: ''
}
export const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        setInputText: (state, action: PayloadAction<string>) => {
            state.inputValue = action.payload
        },
        addToTodoList: (state, action: PayloadAction<Todo>) => {
            state.todoList.push(action.payload);
            state.inputValue = '';
        },
        setTodoList: (state, action: PayloadAction<Todo[]>) => {
            state.todoList = action.payload;
        }
    }
})

export const {setInputText, addToTodoList, setTodoList} = todoListSlice.actions;
export default todoListSlice.reducer
