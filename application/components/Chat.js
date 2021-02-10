import {Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect, createRef } from "react";
import {EvilIcons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createMessageDataBase from './MessageLocalDatabase'
import { useFocusEffect } from '@react-navigation/native';
import backendUrl from "./URL";

const messageBase = createMessageDataBase;

export default function Chat({ route }, props){
    const window = Dimensions.get("window");
    const chatStyle = (window.width < 500) ? styles.styleChat : styles.styleChatSmall;
    const [result, setResult] = useState(null);
    const [oneUse, setOneUse] = useState(false);
    let items = '';
    const data = route.params;
    const getMessage = async() =>{
        const id = await AsyncStorage.getItem("@id");
        const token = await AsyncStorage.getItem("@token");
        return await fetch('http://17b7bf040efc.ngrok.io/messages/get_messages/', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({
                id: id,
                to_id: 1
            })
        }).then(
            response => response.json()
        ).then(
            function(response){
                setResult(response);
                setOneUse(true);
            }).catch((error) => {
                console.log(error);
        })
    };
    console.log(data.group_id);
    let chatSocket = new WebSocket(
        'ws://' + '5f64c5352dfa.ngrok.io' +
        '/ws/chat/chat/', data.group_id.toString(10)); //,  data.group_id.toString(10));

    chatSocket.onmessage = function(e){
        let data = JSON.parse(e.data);
        const text = data['text'];
        messageBase.dispatch({
            'type': 'ADD_MESSAGE',
            'text': text
        });
        console.log(data['text']);
    };

    useEffect(() => {
        if(!oneUse)
        getMessage();
        items = messageBase.getState();
    });

    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };

    return(
        <View style={chatStyle}>
            <MessageField result={result} items={items}/>
            <Items chatSocket={chatSocket}/>
        </View>
    )
}

const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    })
};

function Items(props){
    const [message, setMessage] = useState('');
    return(
        <View style={styles.itemsField}>
            <TextInput placeholder='Text: '
                       style={styles.inputText}
                       onChangeText={(text) => setMessage(text)}/>
            <ButtonSent chatSocket={props.chatSocket}
                        message={message}/>
        </View>
    )
}

function ButtonSent(props){
    return(
        <TouchableOpacity style={styles.buttonSentView}
                          onPress={() => props.chatSocket.send(
                              JSON.stringify({
                                  'text': props.message
                              })
                          )}>
            <Text style={styles.buttonSentText}>Submit</Text>
        </TouchableOpacity>
    )
}
function YourMessage(){
    return(
        <View style={styles.messageYourBodyView}>
            <View style={styles.messageYourBody}>
                <Text style={styles.textMessageYourBody}>Hello, world!</Text>
            </View>
        </View>
    );
}

function ForeignMessage(props){
    return(
        <View style={styles.messageForeignBodyView} key={props.item.id}>
            <View style={styles.messageForeignBody}>
                <Text style={styles.textMessageForeignBody}>{props.item.text}</Text>
            </View>
        </View>
    );
}

function MessageField(props){
    return(
        <ScrollView style={styles.messageField}>
            {props.result ?
                props.result.map(item => (
                    <ForeignMessage item={item}/>))
                : <View />
            }
            {props.items ?
                console.log('\n')
                /*props.items.map(item => (
                    console.log('\n')
                    // <ForeignMessage item={item}/>
                )) */: <View />
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    styleChat: {
        width: '100%',
        height: "100%",
    },
    styleChatSmall: {
        width: '70%',
        minHeight: "100%",
    },
    inputText: {
        minWidth: '70%',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        borderRightWidth: 0,
        fontSize: 18,
        padding: 5,
        height: 35,
        backgroundColor: "white",
    },
    messageField: {
        width: "100%",
        minHeight: "87.5%",
        flex: 1,
        flexDirection: 'column',
    },
    itemsField: {
        width: '100%',
        height: 35,
        padding: 10,
        flex: 1,
        flexDirection: "row",
    },
    buttonSentView: {
        backgroundColor: 'green',
        borderWidth: 0,
        width: "20%",
        height: 35,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonSentText: {
        color: "white",
    },
    buttonResourcesView: {
        backgroundColor: "white",
        borderWidth: 0,
        justifyContent: "center",
        alignItems: "center",
        width: 35,
        height: 35,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'black',
        borderTopColor: 'black',
    },
    messageYourBodyView: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        marginVertical: 5,
        marginRight: 15,
    },
    messageYourBody: {
        padding: 7,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "green",
        maxWidth: "70%",
        borderRadius: 15,
    },
    textMessageYourBody: {
        color: "white",
        fontSize: 16,
    },
    messageForeignBodyView: {
        marginVertical: 5,
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        marginLeft: 15,
    },
    messageForeignBody: {
        padding: 7,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "white",
        maxWidth: "70%",
        borderRadius: 15,
    },
    textMessageForeignBody: {
        color: "black",
        fontSize: 16,
    },
});

