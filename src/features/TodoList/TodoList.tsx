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

interface TodoFlatListProperties {
    item: Todo,
    getIndex: () => number | undefined,
    drag: (() => void) | undefined,
    isActive: boolean
}

interface CheckBoxOnPress {
    event?: GestureResponderEvent
}

const TodoList = () => {
    const [text, setText] = useState('');
    const [data, setData] = useState<Todo[]>(TODOSPRESET)

    let listItemRef: BouncyCheckbox | null = null;

    const handleTextInput = (input: string) => {
        setText(input);
    };

    const handleAddTodo = () => {
        const todo = text.trim();
        if (!todo) return;

        const newTodo = {
            key: uuidv4(),
            todo: todo,
            isCompleted: false
        }

        setData(data.concat(newTodo));
        setText('');
    };

    const handleOnDragEnd = (params: {data: Todo[]}) => {
        setData(params.data)
    }

    const handleCheckTodo = ({checked, dataKey}: OnPushProps) => {
        const newData: Todo[] = data.map(item => {
            if (item.key === dataKey) item.isCompleted = checked;
            return item;
        })
        setData(newData);
    }

    const handleClearTodoItem = (item: Todo) => {
        const newData = data.filter(itemInList => !(itemInList === item));
        setData(newData);
    }

    const bouncyCheckbox = (index: number | string | undefined): ReactElement => {
        return (
            <MyBouncyCheckbox
                    disableText={true}
                    dataKey={index}
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
                value={text}
                outline={true}
                onChangeText={handleTextInput}
                onSubmitEditing={handleAddTodo}
                size={'2xl'}
                placeholder={"Add todos"}
                style={styles.input}
            />
            <DraggableFlatList
                data={data}
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
