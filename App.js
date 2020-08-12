import React, {PureComponent} from 'react';
import { Provider} from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import store from './src/core/store';
import Main from './src/components/layout/main';
import Selected from './src/components/selected';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends PureComponent{
  render() {
    return (
      <Provider store={store}>
        <PaperProvider>
         <NavigationContainer>
            <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
              <Stack.Screen name="Main" component={Main}/>
              <Stack.Screen name="Selected" component={Selected}/>
            </Stack.Navigator>
          </NavigationContainer> 
        </PaperProvider>
      </Provider>
    )
  }
}