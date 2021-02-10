import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function InputEmail(){
    return(
         <View style={styles.container}>
            <StatusBar backgroundColor='#0b009e' style="light" />
            <Information />
            <SendEmail />
         </View>
    );
}

function Information(){
    return(
        <View style={styles.borderText}>
            <Text style={styles.text}>
                If you forgot your password, please, input your email to change it!
            </Text>
        </View>
    )
}

function SendEmail(){
    return(
        <View>
            <View style={styles.viewSearch}>
                <TextInput placeholder='Email: '
                           style={styles.emailSearch}
                           onChangeText={(text) => setText(text)}
                />
                <TouchableOpacity style={styles.buttonSearch}
                                  onPress={() => FindPerson()}>
                    <Text style={styles.buttonSearchText}>Search</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        minWidth: '100%',
        minHeight: '100%',
    },
    buttonSearch: {
        backgroundColor: 'green',
        color: 'white',
        width: "30%",
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSearchText: {
        color: 'white',
        fontSize: 16,
    },
    emailSearch: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: 'black',
        fontSize: 18,
        minWidth: '70%',
        paddingLeft: 10,
    },
    viewSearch: {
        width: "100%",
        flex: 1,
        flexDirection: 'row',
        maxHeight: 40,
    },
    informationText: {
        fontSize: 18,
    },
    borderText: {
        borderWidth: 2,
        borderColor: '#d9dbdb',
        padding: 15,
        marginBottom: 25,
    },
    text: {
        fontSize: 18,
    },
});
