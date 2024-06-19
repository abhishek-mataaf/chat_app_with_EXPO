import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useGlobalSearchParams } from 'expo-router'
import usersJson from "../../UserData/users.json"
import ChatInnerComp from './ChatInnerComp';
const ChatScreen = () => {
    const { user }: any = useGlobalSearchParams();

    const [userData, setuserData] = useState<any>(null);

    useEffect(() => {
        if (user) {
            const data = JSON.parse(user);
            let checkUser = usersJson.find((item) => item.id === data.id);
            if (checkUser) {
                setuserData(checkUser);
            }
        }
        else {
            console.log("data Not Found");
        }
    }, [user])

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Loading...</Text>
            </View>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Image style={styles.img} source={{ uri: userData.userPicPath }}
                        />
                    </View>
                    <View style={styles.secondaryBox}>
                        <Text style={styles.headerText}>
                            {userData.userName}
                        </Text>
                        <Text style={styles.fadeText}>
                            {userData.status}
                        </Text>
                    </View>
                </View>
                <ChatInnerComp userDetail={userData} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        paddingTop: 20,
        backgroundColor: 'black',
        gap: 30
    },
    header: {
        borderBottomWidth: 1.5,
        borderColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10
    },
    headerText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold'
    },
    secondaryBox: {
        flex: 0,
        justifyContent: 'center',
    },
    img: {
        height: 60,
        width: 60,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 30
    },
    fadeText: {
        color: 'grey'
    }
})

export default ChatScreen;
