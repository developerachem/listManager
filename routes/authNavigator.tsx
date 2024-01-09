import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screen/Home/Home';
import UnSyncList from '../screen/UnSyncList/UnSyncList';

const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="list" component={UnSyncList} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
