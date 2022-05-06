import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Navigation from './src/Navigators/Navigators';
import {AuthProvider} from './src/context/AuthContext';
import { AxiosProvider } from './src/context/AxiosContext';


const App = () => {
  return (
        <Navigation />
  );
};

export default App;
