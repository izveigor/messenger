import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import {Button} from "react-native-web";
import { EvilIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import Chat from './Chat'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native'
import backendUrl from './URL'

const Separator = () => (
    <View style={styles.separator} />
);

export default function Main(){
    const window = Dimensions.get("window");
    const [data, setData] = useState(null);
    const [first, setFirst] = useState(false);

    const GetGroup = async() => {
        const id = await AsyncStorage.getItem("@id");
        const token = await AsyncStorage.getItem("@token");
        return await fetch(backendUrl + '/user/show_groups/', {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            /*body: JSON.stringify({
                id: id
            })*/
        }).then(response => response.json())
            .then(function(json) {
                setData(json);
                setFirst(true);
            }
        ).catch((error) => console.log(error))
    };

    useFocusEffect(() => {
        if(!first)
         GetGroup();
    });

    if(window.width < 500) {
        return(
            <View style={styles.window}>
                <StatusBar backgroundColor='#0b009e' style="light" />
                <StructureGroup window={window} data={data}/>
                <Add />
            </View>
        );
    }
    else
        return(
            <View style={styles.window}>
                <StatusBar backgroundColor='#0b009e' style="light" />
                <View style={styles.mainDisplay}>
                    <StructureGroup window={window} data={data}/>
                    <Chat window={window}/>
                </View>
            </View>
        )
}

function StructureGroup(props){
    if(props.data)
    return(
        <ScrollView style={styles.structureGroupSmall}>
            {props.data.map(item =>
            <Group window={props.window} item={item}/>
                )}
            <End />
        </ScrollView>
    );
    else
        return(
            <View>
                <NoneUsers/>
            </View>
        )
}

const NoneUsers = () => (
    <View style={styles.noneUsersView}>
        <Text style={styles.noneUsersText}>You don't have a chat!</Text>
    </View>
);

function End(){
    return(
        <View style={styles.end}>
        </View>
    );
}

function Add(){
    const navigation = useNavigation();
    return(
        <View style={styles.add}>
            <TouchableOpacity style={styles.buttonAdd}
                              onPress={() => navigation.navigate('AddPerson')}>
                <Text style={styles.textButtonAdd}>
                    +
                </Text>
            </TouchableOpacity>
        </View>
    )
}

function Group(props){
    console.log(props.item);
    if(props.window.width >= 500) {
        return (
            <TouchableOpacity style={styles.group}
                              onPress={props.change}>
                <View style={styles.imageView}>
                    <Image source={{
                        uri: props.item.photo
                    }}
                           style={styles.image}/>
                </View>
                <View style={styles.groupMessages}>
                    <Text style={styles.name}>{props.item.first_name + props.item.last_name}</Text>
                    <Text style={styles.messageText}>Message</Text>
                    <Separator/>
                </View>
            </TouchableOpacity>
        );
    } else{
        const navigation = useNavigation();
        const item = props.item;
        return (
            <TouchableOpacity style={styles.group}
                              onPress={() => navigation.navigate('Chat', {group_id: item.id, name: item.first_name})}
                              key={item.id}>
                <View style={styles.imageView}>
                    <Image source={{
                        uri: item.photo
                    }}
                           style={styles.image}/>
                </View>
                <View style={styles.groupMessages}>
                    <Text style={styles.name}>{item.first_name + ' ' + item.last_name}</Text>
                    <Text style={styles.messageText}>{item.last_visit}</Text>
                    <Separator/>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    window: {
        minWidth: '100%',
        height: '100%',
        backgroundColor: '#eee',
    },
    end: {
        width: '100%',
        height: 75,
    },
    structureGroup: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        minHeight: "100%",
    },
    structureGroupSmall: {
        height: "100%",
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    group: {
        minWidth: '100%',
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    imageView: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0b009e',
        width: '100%',
        height: 75,
    },
    mainText: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
    },
    groupMessages: {
        height: 50,
        width: '100%',
    },
    separator: {
        width: '100%',
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 5,
    },
    messageText: {
        color: 'black',
        marginTop: 5,
        opacity: 0.7,
    },
    add: {
        position: 'absolute',
        zIndex: 999,
        width: 75,
        height: 75,
        bottom: 25,
        right: 25,
    },
    buttonAdd: {
        width: 75,
        height: 75,
        borderRadius: 100,
        backgroundColor: '#0b009e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButtonAdd: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    mainDisplay: {
        flex: 1,
        flexDirection: 'row',
        minWidth: '100%',
    },
    noneUsersView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noneUsersText: {
        color: 'black',
        opacity: 0.7,
        fontSize: 22,
    }
});
