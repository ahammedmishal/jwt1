import axios from 'axios';
import React, {useContext, useState,useEffect} from 'react';
import {Button,Text, StyleSheet, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';
import Spinner from './Spinner';
import * as Keychain from 'react-native-keychain';

const Dashboard = () => {

  const [status, setStatus] = useState('idle');

  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);

  const {publicAxios} = useContext(AxiosContext);
  const {authAxios} = useContext(AxiosContext);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    
    const getUsers = async () => {
      try {
        const response = await axiosContext.authAxios.get('/get_user_profile')
        let userInfo = response.data
        console.log(response.data);
        setUserInfo(userInfo)
        console.log(userInfo);
      } catch (error) {
        setStatus('error');
        console.log(error)
      }
    }

    getUsers();

  //   const api = 'http://45.63.18.150:9090/accounts/get_user_profile'; 
  //   const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUyNjAyMDQ0LCJpYXQiOjE2NTE3MzgwNDQsImp0aSI6ImE0ZThmNWRiNjViZTRjOWI4OGI2MGIwMDQ1ZTRkMjkzIiwidXNlcl9pZCI6MTZ9.WE3KNk8m7oYg7uD-VSTsD8zIDulGdvNr2Q9edt9w0ps'

    axiosContext.authAxios.get('/get_user_profile')
    .then(res => {
      console.log(res.data);
      }).catch((error) => {
        console.log(error)
      });

      const checkUserStatus = async () => {
        try {
          const credentials = await Keychain.getGenericPassword();
          if (credentials) {
           console.log('Credentials loaded')
           console.log('Credentials:',credentials)
           console.log('Credentials:',credentials.password)
          } else {
            console.log('No credentials stored');
          }
        } catch (error) {
          console.log('Keychain couldn\'t be accessed!', error);
          setLoading(false);
        }
      }

      checkUserStatus();

  },[])

  return (
    <View style={styles.container}>
     
        <Text>user:{userInfo.name}</Text>
        <Text>name:</Text>
        <Text>country:</Text>
        <Text>province:</Text>

      <View style={styles.buttonGroup}>
      {/* <Button title="Get user" onPress={onGetUserProfile} /> */}
        <Button title="Logout" onPress={() => authContext.logout()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonGroup: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
  },
});
export default Dashboard;
