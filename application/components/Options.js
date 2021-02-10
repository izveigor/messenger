import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {Animated, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Dimensions} from 'react-native';
import {Touchable} from "react-native-web";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigate } from './RefNavigation'
import { deleteToken } from "./Token";
import backendUrl from './URL'

export default function Options(){
    const window = Dimensions.get("window");
    if(window.width < 500)
        return(
            <View>
                <StatusBar backgroundColor='#0b009e' style="light" />
                <OptionsHeader />
                <HowUse />
                <LogOut />
                <ButtonDelete />
                <Copyright />
            </View>
        );
    else
        return(
            <View style={styles.container}>
                <View style={styles.largeOptions}>
                    <StatusBar backgroundColor='#0b009e' style="light" />
                    <OptionsHeader />
                    <HowUse />
                    <LogOut />
                    <ButtonDelete />
                    <Copyright />
                </View>
            </View>
        )
}

function ButtonDelete(){
    const deleteUser = async() => {
        return await fetch(backendUrl + '/user/delete/', {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }).then(function() {
            deleteToken();
            navigate('Home');
        })
    };
    return(
        <TouchableOpacity style={[styles.buttonOptionRed, {borderTopWidth: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0}]}
                          onPress={() => deleteUser()}>
            <Text style={styles.textOption}>Delete Account</Text>
        </TouchableOpacity>
    )
}

function HowUse() {
    return(
        <View style={styles.howUse}>
            <View style={styles.centerView}><Text style={styles.headerHowUse}>How use:</Text></View>
            <Text style={styles.textHowUse}>qwer ewqr ewqr weqr asgfd gas dfsad fsadf sda fasdf sadf</Text>
        </View>
    )
}

function Copyright(){
    return(
        <View style={styles.centerView}>
            <View style={styles.copyright}>
                <Text style={styles.copyrightText}>Copyright © 2021 Igor Izvekov</Text>
                <Text style={styles.copyrightText}>under GNU GPL v3 license.</Text>
            </View>
        </View>
    )
}

function OptionsHeader(){
    return(
        <View style={styles.centerView}>
            <Text style={styles.optionsHeader}>Options:</Text>
        </View>
    )
}

function LogOut(){
    const LogOutPost = async() => {
        const token = await AsyncStorage.getItem('@token');
        const id = await AsyncStorage.getItem('@id');
        return await fetch(backendUrl + '/user/log_out/', {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                id: 'id'
            })
        }).then(function() {
            deleteToken();
            navigate('Home');
        })
    };

    return(
        <TouchableOpacity style={[styles.buttonOptionRed, {borderBottomWidth: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, }]}
                          onPress={() => LogOutPost()}>
            <Text style={styles.textOption}>Log out</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    largeOptions: {
        maxWidth: "65%",
        maxHeight: "65%",
        backgroundColor: "white",
        padding: 25,
        borderRadius: 5,
        borderColor: "#d9dbdb",
        borderWidth: 1,
    },
    buttonOptionRed: {
        minWidth: '100%',
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d9dbdb',
        borderRadius: 5,
    },
    textOption: {
        color: 'red',
        fontSize: 18,
    },
    copyright: {
        backgroundColor: "white",
        maxWidth: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderColor: "black",
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        marginTop: 50,
    },
    copyrightText: {
        fontSize: 14,
        color: 'black',
        opacity: 0.85,
    },
    centerView: {
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100%",
    },
    howUse: {
        borderWidth: 1,
        borderColor: "#d9dbdb",
        backgroundColor: "white",
        marginVertical: 15,
        padding: 5,
    },
    textHowUse: {
        fontSize: 16,
        color: "black",
    },
    headerHowUse: {
        color: "black",
        fontSize: 22,
    },
    optionsHeader: {
        fontSize: 28,
        color: "black",
    },
});
