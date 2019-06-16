import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import * as firebase from 'firebase';


export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            gender: '',
            age: '',
            firstName: '',
            lastName: '',
            emailError: null,
            ageError:null,
            passwordError:null 
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
        else{
            emailError: null   
        }
    }
    checkPassword = () => {
        const { password } = this.state;
       // const  re = null;  // min 6 chars
        //const isValid = re.test(String(password));
        if(password.length<6) {
			this.setState({
				passwordError: 'Password minimum 6 digit'
			})
        }
        else{
            passwordError: null
        }
        
    }
    checkAge = () => {
        const {age} = this.state;
        const re = /^[0-9]*$/;
        const isValid = re.test(age);

        if(!isValid) {
			this.setState({
				ageError: 'Number only'
			})
        }
        else{
            ageError: null
        }
    }
    
    signUpUser = () => {
        const{email,password, firstName, lastName, age, gender} = this.state;

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user=> {
                console.log('user', user);

                const userID= user.user.uid;

                firebase
                .database().
                ref('users/' + userID)
                .set({
                    email,
                    firstName, 
                    lastName, 
                    age, 
                    gender
                });
            });
    };

    render() {
        return (
            <ScrollView style={{flex:1}}>
                <View style = {{margin: 25}}>
                    <Input 
                        handleInput={text => this.handleInput('email', text)} 
                        onBlur={this.checkEmail} 
                        placeholder='Email' 
                        error={this.state.emailError} />

                    <Input
                        secureTextEntry = {true}
                        onBlur={this.checkPassword} 
                        handleInput={text => this.handleInput('password', text)} 
                        placeholder='Password' 
                        error={this.state.passwordError}
                         />
                    <View style={{flexDirection:"row"}}>
                        <Input
                            containerStyle={{flex:1}} 
                            handleInput={text => this.handleInput('firstName', text)} 
                            placeholder='First Name' 
                            />
                        <Input 
                            containerStyle={{flex:1}} 
                            handleInput={text => this.handleInput('lastName', text)} 
                            placeholder='Last Name' 
                            />

                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Input 
                            containerStyle={{flex:1}} 
                            onBlur ={this.checkAge} 
                            handleInput={text => this.handleInput('age', text)} 
                            placeholder='Age' 
                            error = {this.state.ageError}
                            />
                        <Input 
                            containerStyle={{flex:1}} 
                            handleInput={text => this.handleInput('gender', text)} 
                            placeholder='Gender' 
                            />

                    </View>

                    <Button onButtonPress = {this.signUpUser} title="Sign Up"/>

                    


                </View>
            </ScrollView>
        )
    }
}
