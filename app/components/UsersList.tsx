import DummyUsers from '../../UserData/users.json'
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, FlatList, ListRenderItem, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface User {
    id: string;
    userName: string;
    userPhone: string;
    userPass: string;
    userEmail: string;
    userPicPath: string;
    messageArray: any,
}

const UsersList = ({ currentUserObj }: any) => {
    const [senderId, setSenderId] = useState<string | undefined>('')
    const route = useRouter()
    const [userData, setuserData] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User[] | any>([])

    useEffect(() => {
        dataRetrive();
    }, [DummyUsers, currentUserObj])

    const dataRetrive = async () => {
        let data = await AsyncStorage.getItem("userData");
        if (data) {
            setCurrentUser(JSON.parse(currentUserObj))
            setuserData(JSON.parse(data))
        }
    }

    const renderItems: ListRenderItem<User> = ({ item }) => {
        let senderIDcheck = item.id === currentUser.id ? item.id : undefined;
        if (senderIDcheck) {
            setSenderId(senderIDcheck);
        }

        if (item.id !== currentUser.id) {
            return (
                <TouchableOpacity onPress={() => {
                    route.push("components/ChatScreen")
                    route.setParams({ user: JSON.stringify(item), senderid: senderId })
                }}>
                    <View style={styles.item}>
                        <View style={styles.profileBox}>
                            <Image style={styles.img} source={{ uri: item.userPicPath }}
                            />
                        </View>
                        <View style={styles.detailBox}>
                            <View style={styles.innerBox}>
                                <Text style={styles.nameText}>{item.userName}</Text>
                                <Text style={styles.fadeText}>{
                                    item.messageArray.length == 0 ? "" : item.messageArray[item.messageArray.length - 1].timestamp.slice(11, 17)
                                }</Text>
                            </View>
                            <View style={styles.innerBox}>
                                <Text style={styles.fadeText}>{
                                    item.messageArray.length == 0 ? "No messages yet..." :
                                        item.messageArray[item.messageArray.length - 1].text.length < 20 ? item.messageArray[item.messageArray.length - 1].text : `${item.messageArray[item.messageArray.length - 1].text.slice(0, 20)}...`
                                }</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity >
            )
        } else {
            // route.setParams({senderid: currentUser.id })
            return null
        }
    }

    if (!userData && !currentUser) {
        return (
            <View style={styles.container}>
                <Text style={styles.nameText}>Loading...</Text>
            </View>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <FlatList
                    data={userData}
                    renderItem={renderItems}
                    keyExtractor={item => item.id.toString()}
                >
                </FlatList>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f1',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 2
    },
    item: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 7,
        paddingVertical: 10,
        marginHorizontal: 5,
        marginTop: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    profileBox: {

    },
    img: {
        height: 60,
        width: 60,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 30
    },
    detailBox: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        gap: 5
    },
    innerBox: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '87%'
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 15
    },
    fadeText: {
        color: 'grey'
    }
});

export default UsersList;
