import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import {Provider} from 'react-redux';
import { ToastProvider } from 'react-native-toast-notifications'

import {store, persistor} from './redux/store'
import Routes from './screens'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <ToastProvider>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </ToastProvider>
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});