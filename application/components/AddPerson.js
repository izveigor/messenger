import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity, Dimensions} from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function AddPerson(){
    const window = Dimensions.get("window");
     return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#0b009e' style="light" />
            <Information/>
            <IdSearch />
        </View>
        );
}

function Information(){
    return(
        <View style={styles.borderText}>
            <Text style={styles.text}>
                If you want to find a person and start to chat with him, you should input his id in a field and press a button "search".
            </Text>
        </View>
    )
}

function IdSearch(){
    const [text, setText] = useState('');
    const [item, setItem] = useState(null);
    const FindPerson = async() => {
        return await fetch(backendUrl + '/user/find_user/', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: text
            })
        }).then(
            response => response.json()
        ).then(function(response){
                setItem([response]);
            }
        )

    };
    useEffect(() => {
        console.log(item);
    });

    return(
        <View>
            <View style={styles.viewSearch}>
                <TextInput placeholder='Id: '
                           style={styles.idSearch}
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

function FindPersonView(props){
    if(!props.item)
        return <View />;
    else {
        const item = props.item[0];
        const AddPersonAPI = async() => {
            const token = await AsyncStorage.getItem('@token');
            const id = await AsyncStorage.getItem('@id');
            if(item.id == id)
                return null;
            return await fetch(backendUrl + '/user/create_group/', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    first_id: id,
                    second_id: item.id
                })
            })
        };
        return (
            <View style={styles.findPersonView}>
                <View style={styles.imageView}>
                    <Image
            style={styles.iconUser}
            source={{
            uri:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
            }}
        />
                </View>
                <View style={styles.firstLastName}>
                    <Text style={styles.name} >{item.first_name}</Text>
                    <Text style={styles.name} >{item.last_name}</Text>
                </View>
                <View style={styles.buttons} >
                    <TouchableOpacity>
                        <MaterialIcons name="cancel" size={40} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonMarginLeft}
                                      onPress={() => AddPersonAPI()}>
                        <Ionicons name="md-checkmark-circle" size={40} color="green" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        height: '100%',
        minWidth: '100%',
        alignItems: 'center',
    },
    viewSearch: {
        minWidth: "100%",
        flex: 1,
        flexDirection: 'row',
        maxHeight: 40,
    },
    text: {
        fontSize: 18,
    },
    idSearch: {
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
    borderText: {
        borderWidth: 2,
        borderColor: '#d9dbdb',
        padding: 15,
        marginBottom: 25,
    },
    head: {
        minWidth: '100%',
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHead: {
        fontSize: 28,
    },
    largeAdd: {
        maxWidth: "65%",
        maxHeight: "65%",
        backgroundColor: "white",
        padding: 25,
        borderRadius: 5,
        borderColor: "#d9dbdb",
        borderWidth: 1,
    },
    findPersonView: {
        minHeight: 50,
        padding: 5,
        borderWidth: 2,
        borderColor: '#d9dbdb',
        minWidth: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
    },
    centerView: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    imageView: {
        height: 50,
        width: 50,
    },
    iconUser: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    firstLastName: {
        marginLeft: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    maxSize: {
        width: '100%',
        height: '100%'
    },
    buttons: {
        flexDirection: 'row',
        marginLeft: 'auto'
    },
    buttonMarginLeft: {
        marginLeft: 5
    }
});
