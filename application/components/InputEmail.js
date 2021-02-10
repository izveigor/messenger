import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function InputEmail(){
    const window = Dimensions.get("window");
    if(window.width < 500)
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor='#0b009e' style="light" />
                <Text style={styles.h}>Please, enter your email: </Text>
                <SentEmail />
            </View>
        );
    else
        return(
            <View style={styles.container}>
                <View style={styles.largeInputEmail}>
                    <Text style={styles.h}>Please, enter your email: </Text>
                    <SentEmail />
                </View>
            </View>
        );
}

function SentEmail(){
    return(
        <View style={styles.sentEmail}>
            <TextInput placeholder='Email: '
                       style={styles.input} />
            <ButtonSent />
        </View>
    )
}

function ButtonSent(){
    return(
        <TouchableOpacity style={styles.buttonSent}>
            <Text style={styles.textButtonSent}>Sent</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '100%',
        minHeight: '100%',
    },
    h: {
        fontSize: 26,
        color: 'black',
        marginVertical: 15,
    },
    input: {
        borderColor: "black",
        borderRadius: 0,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 5,
        minWidth: "70%",
        height: 35,
    },
    largeInputEmail: {
        maxWidth: "50%",
        maxHeight: "50%",
        backgroundColor: "white",
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d9dbdb',
        borderRadius: 5,
    },
    textButtonSent: {
        color: "white",
        fontSize: 18,
    },
    buttonSent: {
        minWidth: "30%",
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
    },
    sentEmail: {
        minWidth: "100%",
        flex: 1,
        flexDirection: "row",
        maxHeight: 35,
    }
});
