import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from '../components/common/Button';
import * as firebase from 'firebase';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Profile Screen </Text>
        <Button
          title="Logout from panel"
          onButtonPress={() => firebase.auth().signOut()}
        />
      </View>
    );
  }
}
