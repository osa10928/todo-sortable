import {View, StyleSheet, Text} from "react-native"
import {Input, Header} from "react-native-design-system";
import { Button, ListItem } from "@react-native-material/core";
import {MouseEventHandler, ReactElement, useState} from "react";
import {Todo} from "../../models/Todo.model";
import DraggableFlatList, {ScaleDecorator} from "react-native-draggable-flatlist";
import "react-native-get-random-values";
import {v4 as uuidv4} from "uuid";
import {TODOSPRESET} from "../../configs/todos.config";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MyBouncyCheckbox, {OnPushProps} from "../MyBouncyCheckbox/MyBouncyCheckbox";
import {GestureResponderEvent} from "react-native/Libraries/Types/CoreEventTypes";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {addToTodoList, setInputText, setTodoList, TodoListState} from "./TodoListSlice";
import {useSelector} from "react-redux";
import {CombinedState} from "@reduxjs/toolkit";

interface TodoFlatListProperties {
    item: Todo,
    getIndex: () => number | undefined,
    drag: (() => void) | undefined,
    isActive: boolean
}

const TodoList = () => {
    const dispatch = useAppDispatch();
    const inputText = useAppSelector(state => state.todoList.inputValue);
    const todoList = useAppSelector(state => state.todoList.todoList);

    const handleTextInput = (input: string) => {
        dispatch(setInputText(input));
    };

    const handleAddTodo = () => {
        const todo = inputText.trim();
        if (!todo) return;

        const newTodo = {
            key: uuidv4(),
            todo: todo,
            isCompleted: false
        }

        dispatch(addToTodoList(newTodo));
    };

    const handleOnDragEnd = (params: {data: Todo[]}) => {
        dispatch(setTodoList(params.data));
    }

    const handleCheckTodo = ({checked, dataKey}: OnPushProps) => {
        const newTodo = dataKey as Todo;
        newTodo.isCompleted = checked;
        dispatch(setTodoList(todoList));
    }

    const handleClearTodoItem = (item: Todo) => {
        const newTodo = todoList.filter(itemInList => !(itemInList === item));
        dispatch(setTodoList(newTodo));
    }

    const bouncyCheckbox = (index?: number | string): ReactElement => {
        const todoItem = todoList.find(todo => todo.key === index);
        return (
            <MyBouncyCheckbox
                    disableText={true}
                    dataKey={todoItem}
                    onPress={handleCheckTodo}
            />
        )
    }

    const renderItem = ({item, drag, isActive}: TodoFlatListProperties) => {
        return (
            <ScaleDecorator>
                <ListItem
                    title={item.todo}
                    onLongPress={drag}
                    disabled={isActive}
                    id={`list-item-${item.key}`}
                    trailing={
                            <Button
                                title="Clear"
                                color="pink"
                                tintColor="white"
                                uppercase={false}
                                compact={true}
                                onPress={() => {handleClearTodoItem(item)}}
                            />
                    }
                    leading={bouncyCheckbox(item.key)}
                />
            </ScaleDecorator>
        )
    }

    return (
        <View style={[styles.container]}>
            <Header>Sortable Todo</Header>
            <Input
                value={inputText}
                outline={true}
                onChangeText={handleTextInput}
                onSubmitEditing={handleAddTodo}
                size={'2xl'}
                placeholder={"Add todos"}
                style={styles.input}
            />
            <DraggableFlatList
                data={todoList}
                extraData={todoList}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                onDragEnd={handleOnDragEnd}
                style={styles.flatList}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginVertical: 10,
        marginHorizontal: 15
    },
    flatList: {
        paddingHorizontal: 5,
        marginHorizontal: 15,
        paddingRight: 10
    }
});

export { TodoList }
