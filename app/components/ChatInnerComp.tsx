import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, ImageBackground, View, TextInput, TouchableOpacity, FlatList, _ScrollView, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import userData from "../../UserData/users.json"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalSearchParams } from 'expo-router';
interface Message {
    messageId: string,
    text: string
    timestamp: string,
    senderId: string | string[] | undefined,
    reciverId: string
    status: string
    userType: string
}

const ChatInnerComp = ({ userDetail }: any) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [dep, setDep] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<any>([]);

    const { senderid } = useGlobalSearchParams();

    useEffect(() => {
        setCurrentUser(userDetail);
    }, [userDetail])

    useEffect(() => {
        console.log(messages);
        if (currentUser && currentUser.id) {
            dataRetrive()
        }
    }, [currentUser, dep]);

    const dataRetrive = async () => {
        try {
            let data = await AsyncStorage.getItem("userData");
            if (data) {
                let parseData = JSON.parse(data);
                let resp = parseData.find((item: { id: any; }) => { return currentUser.id == item.id });
                if (resp) {
                    setMessages(resp.messageArray);
                }
                else {
                    console.log(resp, "data not found");
                }
            }
            else {
                console.log("not found");

            }
        } catch (er) {
            console.log(er, " --er");

        }

    }

    const messageSendFunc = () => {
        if (input !== '') {
            let newMsgSender: Message = {
                messageId: Math.floor(1000 + Math.random() * 900000).toString(),
                text: input,
                timestamp: new Date().toLocaleString().slice(0, 20),
                senderId: senderid,
                reciverId: currentUser.id,
                status: "sent",
                userType: "1"
            }
            let newMsgReciver: Message = {
                messageId: Math.floor(1000 + Math.random() * 900000).toString(),
                text: input,
                timestamp: new Date().toLocaleString().slice(0, 20),
                senderId: senderid,
                reciverId: currentUser.id,
                status: "sent",
                userType: "0"
            }
            setMessaeInDrive(newMsgReciver, newMsgSender)
        }
        else {
            setInput("please type something")
        }
    }

    const setMessaeInDrive = async (senderMsg: Message, reciverMsg: Message) => {
        try {
            let strGetData = await AsyncStorage.getItem("userData")
            if (strGetData) {
                let getData = JSON.parse(strGetData);
                let user1 = getData.find((item: { id: string | string[] | undefined; }) => item.id === senderMsg.senderId)
                if (user1) {
                    user1.messageArray.push(senderMsg);
                }
                let user2 = getData.find((item: { id: string | string[] | undefined; }) => item.id === reciverMsg.reciverId)
                if (user2) {
                    user2.messageArray.push(reciverMsg);
                }
                let strSetData = JSON.stringify(getData)
                await AsyncStorage.setItem("userData", strSetData)
                // let check = await AsyncStorage.getItem("userData");
                // console.log(check , "inner");
                setInput('');
                setDep(!dep ? true : false);
                dataRetrive()
            }
            else {
                console.log("data not found in drive");
            }
        } catch (er) {
            console.log(er, " -err in setMsg");

        }
    }

    const renderItem = ({ item }: { item: Message }) => {
        return (
            <View style={[styles.messageContainer, item.userType === "1" ? styles.myMsg : styles.otherMsg]}>
                <Text style={styles.user}>{item.timestamp.slice(11, 17)}</Text>
                {/* <Text style={styles.user}>{item.messageId}</Text> */}
                <Text style={styles.message}>{item.text}</Text>
            </View>
        )
    }

    if (!currentUser && !messages) {
        return (
            <View style={styles.container}>
                <Text >Loading...</Text>
            </View>
        );
    }
    else {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={0}
            >
                <View style={styles.chatsBox}>
                    <FlatList
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.messageId}
                    />
                </View>
                <View style={styles.msgBox}>
                    <TextInput value={input} onChangeText={(inp) => setInput(inp)} placeholder='Type message' style={styles.chatInp} />
                    <TouchableOpacity onPress={() => messageSendFunc()}>
                        <FontAwesomeIcon icon={faPaperPlane} size={20} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    messageContainer: {
        margin: 10,
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '50%',
        borderWidth: 1,
        borderColor: 'grey',
        paddingLeft: 10,
        shadowColor: 'grey',
        shadowOpacity: 1.9,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 8,
        elevation: 2,
    },
    user: {
        fontWeight: 'light',
        color: 'grey',
        fontSize: 10,
    },
    message: {
        fontSize: 15,
    },
    myMsg: {
        backgroundColor: '#ffcccc',
        alignSelf: 'flex-end', borderTopRightRadius: 0
    },
    otherMsg: {
        backgroundColor: '#ccffcc',
        alignSelf: 'flex-start', borderTopLeftRadius: 0
    },
    container: {
        backgroundColor: '#FFFFF0',
        borderRadius: 20,
        height: '84%',
        flex: 0,
        justifyContent: 'space-between'
    },
    msgBox: {
        bottom: 80,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 20,
        marginHorizontal: 20,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        paddingRight: 20
    },
    chatInp: {
        borderRightWidth: 2,
        borderColor: 'grey',
        width: "85%",
        paddingVertical: 2,
        paddingLeft: 6,
        fontSize: 18
    },
    chatsBox: {
        marginTop: 10,
        marginBottom: 90
    }
})

export default ChatInnerComp;
