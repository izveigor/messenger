import AsyncStorage from "@react-native-async-storage/async-storage";
import AnimatedSubtraction from "react-native-web/dist/vendor/react-native/Animated/nodes/AnimatedSubtraction";
import { useState } from 'react'

const setToken = async(token, email, password) => {
    try {
        await AsyncStorage.setItem('@token', token);
        await AsyncStorage.setItem('@email', email);
        await AsyncStorage.setItem('@password', password);
    } catch(error) {
        console.log(error);
    }
};

const deleteToken = async() => {
    try {
        await AsyncStorage.removeItem('@token');
        await AsyncStorage.removeItem('@email');
        await AsyncStorage.removeItem('@password');
    } catch(error) {
        console.log(error)
    }
};

export {
    setToken,
    deleteToken
}
