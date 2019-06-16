import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import * as firebase from 'firebase';


export default class SignInScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: null
        }
    }

    handleInput = (key, value) => {
        this.setState({
            [key]: value,
        });
    } 

    checkEmail = () => {
		const { email } = this.state;
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const isValid = re.test(String(email).toLowerCase())

		if(!isValid) {
			this.setState({
				emailError: 'Invalid Email'
			})
		}
    }

    signInUser =() => {
        const {email, password} = this.state

        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(user=> {
            if(user)
            {
                this.props.navigation.navigate('Profile');
            }
        });
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent:'center', alignItems:'center' }}>
                    <Input
                         containerStyle = {{width:300}}
                        handleInput={text => this.handleInput('email', text)} 
                        onBlur={this.checkEmail} 
                        placeholder='Email' 
                        error={this.state.emailError} />

                    <Input
                         containerStyle = {{width:300}}
                        secureTextEntry = {true} 
                        handleInput={text => this.handleInput('password', text)} 
                        placeholder='Password' />

                <Button onButtonPress = {this.signInUser} title="Sign In"/>
                
            </View>
        )
    }
}
