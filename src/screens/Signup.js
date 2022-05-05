import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../context/AxiosContext';

const Signup = ({navigation}) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [country, setCountry] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const authContext = useContext(AuthContext);
  const {publicAxios} = useContext(AxiosContext);

  function onClearCredentials() {
      setEmail(null),
      setPassword(null),
      setCountry(null),
      setName(null),
      setIsLoading(false)
  }

  const onRegister = async () => {
    setIsLoading(true);
    try {
        const response = await publicAxios.post('/register', {
        name,
        email,
        password,
        country,
        });
  
        const {accessToken, refreshToken} = response.data;
        let userInfo = response.data;
        setUserInfo(userInfo);
        console.log(userInfo);
        authContext.setAuthState({
          accessToken,
          refreshToken,
          authenticated: true,
        });
        onClearCredentials()
      } catch (error) {
        Alert.alert('Registraion Failed', error.response.data.message);
        setIsLoading(false);
      }
    };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Enter name"
          onChangeText={text => setName(text)}
        />

        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          value={country}
          placeholder="Enter country"
          onChangeText={text => setCountry(text)}
        />

        <Button
          title="Register"
          onPress={() => onRegister()}
        />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Already have an accout? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});

export default Signup;
