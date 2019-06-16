import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/AppNavigator';
import * as firebase from 'firebase';

export default class App extends React.Component {
  componentDidMount(){
    const firebaseConfig = {
      apiKey: "AIzaSyAzqdBoPKEb22kd143s0wY2lzPiKMsIGLA",
      authDomain: "customerregistration-af494.firebaseapp.com",
      databaseURL: "https://customerregistration-af494.firebaseio.com",
      projectId: "customerregistration-af494",
      storageBucket: "customerregistration-af494.appspot.com",
      messagingSenderId: "247098416167",
      appId: "1:247098416167:web:88d4f4413a929e63"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  
  
  
  render() {
    return <AppNavigator/> 
  }
}


