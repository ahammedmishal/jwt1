import React, {useCallback, useContext, useEffect, useState} from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthContext } from '../context/AuthContext' 
import * as Keychain from 'react-native-keychain';
import Dashboard from '../screens/Dashboard'
import Login from '../screens/Login'
import Spinner from '../screens/Spinner';
import Signup from '../screens/Signup';


const Stack = createStackNavigator()

const Navigation = ()=>{

  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');

    
  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);

      authContext.setAuthState({
        access: jwt.access || null,
        refresh: jwt.refresh || null,
        authenticated: jwt.access !== null,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        access: null,
        refresh: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

    return(
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}}>
          {
            status == 'loading' ?
            <Stack.Screen
            name="Spinner"
            component={Spinner}
           />
           :
           (authContext?.authState?.authenticated === false) ? 
           <Stack.Screen
           name="Login"
           component={Login}
          />
         : 
         <Stack.Screen name="Dashboard" component={Dashboard} />
         }
            <>
              <Stack.Screen
                name="Signup"
                component={Signup}
              />
            </>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default Navigation
