import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, ImageBackground, View, TextInput, TouchableOpacity, FlatList, _ScrollView, Animated } from 'react-native';
import userData from "../../UserData/users.json"
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Message {
    messageId: string,
    text: string
    timestamp: string
    senderId: string
    reciverId: string
    status: string
    userType: string
}

const ChatInnerComp = ({ userDetail }: any) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [resp, setResp] = useState<any>();
    const [dep, setDep] = useState<boolean>(false);
    useEffect(() => {
        let resp = userData.find((item) => userDetail.id == item.id);
        if (resp) {
            setMessages(resp.messageArray);
            setResp(resp.messageArray);
        }

    }, [dep]);

    const messageSendFunc = () => {
        if (input !== '') {
            let newMsg: Message = {
                messageId: Math.random().toString(),
                text: input,
                timestamp: new Date().toISOString().slice(0, 19),
                senderId: "1002",
                reciverId: "1010",
                status: "sent",
                userType: "1"
            }
            setMessages(() => resp.push(newMsg))
            setInput('');
            setDep(!dep ? true : false);
        }
        else {
            setInput("please type something")
        }
    }

    const renderItem = ({ item }: { item: Message }) => {
        return (
            <View style={[styles.messageContainer, item.userType === "1" ? styles.myMsg : styles.otherMsg]}>
                <Text style={styles.user}>{item.timestamp.slice(11, 16)}</Text>
                {/* <Text style={styles.user}>{item.messageId}</Text> */}
                <Text style={styles.message}>{item.text}</Text>
            </View>
        )
    }
    return (

        <View style={styles.container}>
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
        </View >

    );
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
