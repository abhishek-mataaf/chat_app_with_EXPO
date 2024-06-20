import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useGlobalSearchParams } from 'expo-router'
import ChatInnerComp from './ChatInnerComp';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ChatScreen = () => {
    const { user, senderId }: any = useGlobalSearchParams();
    const [userData, setuserData] = useState<any>([]);
    const [currentUser, setcurrentUser] = useState<any>();

    useEffect(() => {
        dataRetrive()
    }, [currentUser])

    const dataRetrive = async () => {
        try {
            let data = await AsyncStorage.getItem("userData");
            setcurrentUser(user);
            if (data && user) {
                let getData = JSON.parse(data);
                let currentParseData = JSON.parse(currentUser);
                let checkUser = getData.find((item: { id: any; }) => item.id === currentParseData.id)
                if (checkUser) {
                    setuserData(checkUser)
                }
                else {
                    console.log("error at ChatScreen Comp");
                }
            }
            else {
                console.log("data not set");

            }
        } catch (er) {
            console.log(er, " -er");

        }
    }

    if (!userData && currentUser) {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Loading...</Text>
            </View>
        );
    }
    else {
        return (
            <ImageBackground source={require("../../assets/bgDark.jpg")} resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }}>
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
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        paddingTop: 20,
        // backgroundColor: 'black',
        gap: 30,
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
