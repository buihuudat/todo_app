import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './routes';
import LoginScreen from './screen/LoginScreen';
import BottomTab from './components/BottomTab';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import RegisterScreen from './screen/RegisterScreen';
import SplashScreen from './screen/SplashScreen';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <RootStack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <RootStack.Screen name="Splash" component={SplashScreen} />
              <RootStack.Screen name="Home" component={BottomTab} />
              <RootStack.Screen name="Login" component={LoginScreen} />
              <RootStack.Screen name="Register" component={RegisterScreen} />
            </RootStack.Navigator>
          </ApplicationProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
