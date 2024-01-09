import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import AuthNavigator from './routes/authNavigator';

const AppRoute = () => {
  const [netInfo, setNetInfo] = useState(false);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setNetInfo(state?.isConnected);
    });

    // * Unsubscribe
    return () => {
      unsubscribe();
    };
  }, [netInfo]);

  console.log('Internet', netInfo);

  return (
    <>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default AppRoute;
