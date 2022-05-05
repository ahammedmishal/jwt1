import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../context/AxiosContext';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const {publicAxios} = useContext(AxiosContext);
  const [userInfo, setUserInfo] = useState({});

  const onLogin = async () => {
    try {
      const response = await publicAxios.post('/login', {
        email,
        password,
      });

      // const {accessToken, refreshToken} = response.data;
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;
      // let userInfo = response.data;
      // setUserInfo(userInfo);
      // console.log("Accces Token",accessToken);
      // console.log("Refresh Token",refreshToken);
      authContext.setAuthState({
        accessToken : accessToken,
        refreshToken : refreshToken,
        authenticated: true,
      });

      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken,
          refreshToken,
        }),
      );
    } catch (error) {
      Alert.alert('Login Failed', error.response.data.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Petdrifts</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="black"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
          value={email}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </View>
      <Button title="Login" style={styles.button} onPress={() => onLogin()} />
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText1}>Don't have an account?</Text>
        <Text style={styles.navButtonText2}>SIGN UP!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  logo: {
    fontSize: 60,
    color: 'black',
    margin: '20%',
  },
  form: {
    width: '80%',
    margin: '10%',
  },
  input: {
    fontSize: 20,
    color: 'black',
    paddingBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  button: {},
  createButton: {
    marginVertical: 20,
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  navButtonText1: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D2D2D',
    paddingRight:5,
  },
  navButtonText2: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FBA304',
  },
});

export default Login;
