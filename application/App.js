import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './components/Menu'
import Main from './components/Main'
import Chat from './components/Chat'
import AddPerson from './components/AddPerson'
import Options from './components/Options'
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import {navigate, navigationRef} from './components/RefNavigation'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import InputEmail from './components/InputEmail'

const Stack = createStackNavigator();

export default function App() {
    /*const isTokenExist = async() => {
        const token = await AsyncStorage.getItem("@token");
        if(token != null)
            console.log("No");
        else
            console.log("Yes");
    };*/


    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Menu}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Account"
                    component={Main}
                    options={() => navigationOptions(null, 'Chat: ')}
                />
                <Stack.Screen
                    name="Chat"
                    component={Chat}
                    options={() => navigationOptions(1, 'Name: ')}
                />
                <Stack.Screen
                    name='Options'
                    component={Options}
                    options={() => navigationOptions(1, 'Options: ')}
                />
                <Stack.Screen
                    name="AddPerson"
                    component={AddPerson}
                    options={navigationOptions(1, 'Adding person: ')}
                />
                <Stack.Screen
                    name="ForgetPassword"
                    component={InputEmail}
                    options={navigationOptions(1, 'Forget password')}
                />
            </Stack.Navigator>
        </NavigationContainer>
  );
}

const navigationOptions = (headerLeft, title) =>({
    title: title,
    headerStyle: {
        backgroundColor: '#0b009e',
    },
    headerTitleStyle: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 20,
        marginLeft: 45,
    },
    headerTintColor: '#fff',
    headerLeft: (headerLeft == null) ? null : Back,
});

const LargeMain = () =>(
    <View style={{flex: 1, flexDirection: "row"}}>
        <AddingPerson />
        <HeaderOptions />
    </View>
);

function HeaderOptions() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={{
            borderWidth: 1, borderRadius: 100, borderColor: 'white',
            height: 35, width: 35, justifyContent: 'center', alignItems: 'center',
            marginRight: 10
        }}
                          onPress={() => {
                              navigation.navigate('Options')
                          }}>
            <Text style={{fontSize: 18, color: 'white'}}><Ionicons name="options-outline" size={24}
                                                                   color="white"/></Text>
        </TouchableOpacity>
    );
}

function AddingPerson(){
    const navigation = useNavigation();
    return(
        <TouchableOpacity style={{
            borderWidth: 1, borderRadius: 100, borderColor: 'white',
            height: 35, width: 35, justifyContent: 'center', alignItems: 'center',
            marginRight: 10
        }}
                          onPress={() => {
                              navigation.navigate('AddPerson')
                          }}>
            <Text style={{fontSize: 18, color: 'white'}}>+</Text>
        </TouchableOpacity>
    )
}

function Back(){
    const navigation = useNavigation();
    return(
        <TouchableOpacity style={{
            color: 'white', height: 20, width: 50, justifyContent: 'center', alignItems: 'center',
        }} onPress={() => navigation.goBack()}>
            <Text><AntDesign name="banckward" size={24} color="white" /></Text>
        </TouchableOpacity>
    )
}
