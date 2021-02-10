import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef, Context } from 'react';
import {Animated, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Dimensions, Alert} from 'react-native';
import {Touchable} from "react-native-web";
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { createStore, bindActionCreators } from 'redux'
import { createSlice } from '@reduxjs/toolkit'
import { Provider, ReactReduxContext, connect } from 'react-redux'
import { singInDataBase, registerDataBase } from './LocalDataBaseForRegister'
import { setToken, yourId, yourToken } from './Token'
import { navigate } from './RefNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ImgToBase64 from 'react-native-image-base64'
import backendUrl from "./URL";

const Separator = () => (
    <View style={styles.separator} />
);

let register = false;

registerDataBase.dispatch({
    type: "ADD_FIELD",
    value: "first_name",
    text: ""
});

registerDataBase.dispatch({
    type: "ADD_FIELD",
    value: "last_name",
    text: ""
});

registerDataBase.dispatch({
    type: "ADD_FIELD",
    value: "password",
    text: ""
});

singInDataBase.dispatch({
    type: "ADD_FIELD",
    value: "email",
    text: ""
});

singInDataBase.dispatch({
    type: "ADD_FIELD",
    value: "password",
    text: ""
});

function getText(dataBase, value){
    const state = dataBase.getState();
    let result = null;
    state.map(item => {
        if(item.value == value) {
            console.log(item.text);
            result = item.text;
        }
    });
    return result;
}

function Menu(){

    const [register, IsRegister] = useState(false);
    const changeRegister = () => (register) ? IsRegister(false) : IsRegister(true);

    /*useFocusEffect(() => {
        isTokenExist();
    });*/

    if(!register)
        return(
                <LogIn changeRegister={changeRegister} store={singInDataBase}/>
        );
    else
        return(
                <Register changeRegister={changeRegister} store={registerDataBase}/>
        );
}

const CheckEmail = async(changeEmailStatus, emailText) =>{
    return await fetch(backendUrl + '/user/check/', {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailText
        })
    }).then(response => response.json())
        .then((json) => (json.is_active) ? changeEmailStatus(true) : changeEmailStatus(false))
        .catch((error) => {
            console.log(error);
        });
};
//

const SignIn = () => {
    return fetch(backendUrl + '/user/sign_in/', {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: getText(singInDataBase, 'email'),
            password: getText(singInDataBase, 'password')
        })
    }).then(response => response.json())
        .then((json) => {
                if (json.token != null) {
                    console.log(json.id);
                    setToken(json.token, json.email, json.password);
                    navigate('Account');
                }
                else console.log('Error')
            })
        .catch((error) => {
            console.log(error);
        })
};

const registerAPI = () =>{
    return fetch(backendUrl + '/user/register/', {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            first_name: getText(registerDataBase, "first_name"),
            last_name: getText(registerDataBase, "last_name"),
            password: getText(registerDataBase, "password"),
            email: getText(registerDataBase, "email"),
            photo: getText(registerDataBase, "photo"),
        })
    }).then(response => response.json())
        .then((json) => {
            setToken(json.token, json.email, json.password)
        })
        .catch((error) => {
            console.log(error)
        })
};

function LogIn(props) {
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='white' style="dark"/>
            <IconLogo/>
            <Welcome text='Welcome'/>
            <Input placeholder='email' dictName='email' store={props.store}/>
            <Input placeholder='password' dictName='password' store={props.store}/>
            <ForgetPassword />
            <ScreenButton text='Sign in' apifunction={SignIn}/>
            <Or/>
            <ChangeButton text='Sign up' check={props.changeRegister}/>
        </View>
    );
}

function Register(props){
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='white' style="dark"/>
            <IconLogo/>
            <Welcome text='Register'/>
            <InputEmail/>
            <Input placeholder='password' dictName='password' store={props.store}/>
            <Input placeholder='first name' dictName='first_name' store={props.store}/>
            <Input placeholder='last name' dictName='last_name' store={props.store}/>
            <ChoosePhoto/>
            <ScreenButton text='Sign up' apifunction={registerAPI} />
            <Or/>
            <ChangeButton text='Sign in' check={props.changeRegister}/>
        </View>
    )
}

function ForgetPassword(){
    return(
        <TouchableOpacity onPress={() => navigate('ForgetPassword')}>
            <Text style={styles.forgetPassword} >Forgot password?</Text>
        </TouchableOpacity>
    )
}

const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
    });
    console.log(await ImgToBase64.getBase64String(result));
    registerDataBase.dispatch({
        type: 'CHANGE_FIELD',
        value: 'photo',
        text: 'photo',
    })
};

function ChoosePhoto(){
    return(
        <TouchableOpacity style={styles.pickImageView}
                          onPress={pickImage}>
            <Text style={styles.pickImageText}>Choose photo</Text>
        </TouchableOpacity>
    )
}

function IconLogo(){
    return(
        <View style={styles.icon}>
            <Image style={styles.image}
                   source={require('../assets/icon.png')} />
        </View>
    );
}

function Welcome(props) {
    return(
        <View>
            <Text style={styles.welcome}>
                {props.text}
            </Text>
        </View>
    );
}

function SetValuesRedux(value, text){
    return{
        value: value,
        text: text
    }
}

function Input(props){
    const [focus, isFocused] = useState(false);

    return(
        <View>
            <TextInput placeholder={props.placeholder}
                       style={(focus) ? styles.inputFocus : styles.input}
                       onFocus={() => isFocused(true)}
                       onEndEditing={() => {isFocused(false)}}
                       onChangeText={(text) => props.store.dispatch({
                           type: 'CHANGE_FIELD',
                           value: props.dictName,
                           text: text
                       })}
                       maxLength={30}
            />
        </View>
    )
}

function InputEmail(props){
    const [focus, isFocused] = useState(false);
    const [emailStatus, isEmailStatus] = useState(false);
    const [email, setText] = useState('');
    const [emailSpelling, setEmailSpelling] = useState(false);

    const checkEmailSpelling = (email) =>{
        let dot = false, dog = false;
        for(let i = 0; i < email.length; i++) {
            if (email[i] == '@')
                dog = true;
            if (email[i] == '.' && dog)
                dot = true;
        }
        if(dog && dot)
            return true;
    };

    useEffect(() => {
        registerDataBase.dispatch({
            type: 'CHANGE_FIELD',
            value: 'email',
            text: email
        });
        if(emailStatus && emailSpelling)
            register = true;
        else
            register = false;
    });

    const changeEmailStatus = (boolean) => (boolean) ? isEmailStatus(false) : isEmailStatus(true);

    return(
        <View>
            <TextInput placeholder='email'
                       style={(focus) ? styles.inputFocus : styles.input}
                       onFocus={() => isFocused(true)}
                       onEndEditing={() => {isFocused(false);
                       CheckEmail(changeEmailStatus, email);
                       setEmailSpelling(checkEmailSpelling(email));
                       }}
                       onChangeText={(input) => setText(input)}
                       maxLength={30}
                        />
            {email ?
            <View style={styles.loading}>
                {(emailStatus && emailSpelling)
                ?   <Ionicons name="md-checkmark-circle" size={32} color="green" />
                :   <AntDesign name="closecircle" size={24} color="red" />
                }
            </View> : null
            }
        </View>
    );
}

function ScreenButton(props){
    const navigation = useNavigation();
    return(
        <View>
            {(props.text == 'Sign up')
            ? (register) ? <TouchableOpacity style={styles.screenButton}
                              onPress={props.apifunction.bind(this)}>
                <Text style={styles.textScreenButton}>{props.text}</Text>
            </TouchableOpacity> : <View style={styles.screenButton}
                                                    onPress={props.apifunction.bind(this)}>
                    <Text style={styles.textScreenButton}>{props.text}</Text>
                </View>
                : <TouchableOpacity style={styles.screenButton}
                                    onPress={props.apifunction.bind(this)}>
                    <Text style={styles.textScreenButton}>{props.text}</Text>
                </TouchableOpacity>}
        </View>
    );
}

function ChangeButton(props){
    return(
        <View>
            <TouchableOpacity style={styles.changeButton}
                              onPress={props.check.bind(this)}>
                <Text style={styles.textChangeButton}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    );
}

function Or(){
    return(
        <View style={styles.or}>
            <Separator />
            <Text style={styles.orText}>Or</Text>
            <Separator />
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundGrey: {
        backgroundColor: '#f0f2f5',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '100%',
        minHeight: '100%',
    },
    input: {
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
        minWidth: '80%',
        fontSize: 18,
        padding: 5,
        margin: 10,
    },
    welcome: {
        fontSize: 28,
        marginTop: 10,
    },
    screenButton: {
        margin: 20,
        width: 165,
        height: 35,
        borderColor: 'green',
        padding: 0,
        borderWidth: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textScreenButton: {
        color: 'white',
        fontSize: 16,
    },
    changeButton: {
        margin: 25,
        width: 140,
        height: 35,
        borderColor: 'blue',
        padding: 0,
        borderWidth: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textChangeButton: {
        color: 'white',
        fontSize: 16,
    },
    separator: {
        width: '35%',
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    or: {
        maxHeight: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '80%',
    },
    orText: {
        fontSize: 16,
        marginHorizontal: 15,
        color: 'black',
    },
    inputFocus: {
        minWidth: '80%',
        fontSize: 18,
        padding: 5,
        margin: 10,
        borderBottomColor: 'blue',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    image: {
        width: 75,
        height: 75,
    },
    icon: {
        marginBottom: 15,
        width: 75,
        height: 75,
    },
    containerWithBorder: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '75%',
        maxWidth: '55%',
        padding: 35,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9,
    },
    loading: {
        position: "absolute",
        zIndex: 999,
        left: "75%",
        top: '20%',
        maxWidth: 35,
        maxHeight: 35,
    },
    pickImageView: {
        width: 135,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        marginVertical: 10,
        borderWidth: 1,
        borderStyle: "dotted",
        borderRadius: 5,
    },
    pickImageText: {
        color: "black",
        opacity: 0.7,
    },
    centerView: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    textChangePassword: {
        color: 'blue',
        fontSize: 18,
    },
    forgetPassword: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue'
    }
});

export default Menu;
