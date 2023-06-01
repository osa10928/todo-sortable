import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {theme, ThemeProvider} from "react-native-design-system";
import {TodoList} from "./src/features/TodoList/TodoList";
import { Provider } from 'react-redux';
import {setupStore} from "./src/redux/store";

export default function App() {
    return (
        <GestureHandlerRootView style={styles.container}>
            <ThemeProvider theme={theme}>
                <Provider store={setupStore()}>
                    <View style={styles.container}>
                        <TodoList />
                    </View>
                </Provider>
            </ThemeProvider>
        </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
});
