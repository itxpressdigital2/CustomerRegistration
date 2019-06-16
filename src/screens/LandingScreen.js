import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Button from '../components/common/Button';
import {Facebook} from 'expo';
import * as firebase from 'firebase';


export default class LandingScreen extends Component {
    
    static navigationOptions = {
        header: null,
    }
    
    async FacebookLogin() {
        console.log('function called');
        const {type, token} = await Facebook.logInWithReadPermissionsAsync('310607769873683', {
            permission: 'public_profile',
        });

        if (type == 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            const facebookProfile = await firebase.auth().signInWithCredential(credential);

            console.log ('facebookProfile', facebookProfile );

            const userID = facebookProfile.user.uid;

            firebase.database().ref('user/' + userID).set({
                name: facebookProfile.user.displayName,
                email: facebookProfile.user.email,
                //phone_number: facebookProfile.user.phoneNumber,
                photo: facebookProfile.user.photoURL
            })

            firebase.auth().onAuthStateChanged(user => {
                if(user != null) {
                    this.props.navigation.navigate('Profile')
                }
            });
        }
    }
    
    render() {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Button 
                onButtonPress = {() => this.FacebookLogin() }
                backgroundColor="blue" 
                title={"Login with Facebook"} 

            />
           
            <Button
                onButtonPress={() => this.props.navigation.navigate('SignIn')} 
                backgroundColor="black" title={"Login with Email"} />
            <Button 
                onButtonPress={() => this.props.navigation.navigate('SignUp')}
                backgroundColor="#f4511e" title={"Sign Up with Email"} />
                
            </View>
        )
    }
}
