import { faCheck, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DummyUsers from '../../UserData/users.json'
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, FlatList, ListRenderItem, TouchableOpacity, ScrollView } from 'react-native';

interface User {
    id: string;
    userName: string;
    userPicPath: string;
    msgTime: string;
    lastMessage: string;
}

const UsersList = () => {
    const [userData, setuserData] = useState<User[]>([]);
    useEffect(() => {
        setuserData(DummyUsers);
    }, [])
    const renderItems: ListRenderItem<User> = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { alert(item.userName) }}>
                <View style={styles.item}>
                    <View style={styles.profileBox}>
                        <Image style={styles.img} source={{ uri: item.userPicPath }}
                        />
                    </View>
                    <View style={styles.detailBox}>
                        <View style={styles.innerBox}>
                            <Text style={styles.nameText}>{item.userName}</Text>
                            <Text style={styles.fadeText}>{item.msgTime}</Text>
                        </View>
                        <View style={styles.innerBox}>
                            <Text style={styles.fadeText}>{
                                item.lastMessage.length < 20 ? item.lastMessage : `${item.lastMessage.slice(0, 20)}...`
                            }</Text>
                            <FontAwesomeIcon icon={faCheckDouble} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <FlatList
                data={userData}
                renderItem={renderItems}
                keyExtractor={item => item.id.toString()}
            >
            </FlatList>
        </ScrollView>
    );
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
