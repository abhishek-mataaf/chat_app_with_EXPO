import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, ImageBackground, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import userData from "../../UserData/users.json"

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
    const [messages, setMessages] = useState<Message[] | undefined>([]);
    useEffect(() => {
        let resp = userData.find((item) => userDetail.id == item.id);
        if (resp) {
            setMessages(resp.messageArray);
        }

    }, [userData]);

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
            {/* <View style={styles.chatsBox}> */}
                <ScrollView style={styles.chatsBox}>
                    <FlatList
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.messageId}
                    />
                </ScrollView>
            {/* </View> */}
            <View style={styles.msgBox}>
                <TextInput placeholder='Type message' style={styles.chatInp} />
                <TouchableOpacity >
                    <FontAwesomeIcon style={{}} icon={faPaperPlane} size={20} />
                </TouchableOpacity>
            </View>
        </View>

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
        paddingLeft:10
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
        alignSelf: 'flex-end', borderTopRightRadius: 0
    },
    otherMsg: {
        alignSelf: 'flex-start', borderTopLeftRadius: 0
    },
    container: {
        backgroundColor: '#FFFBC4',
        borderRadius: 20,
        height: '84%',
        flex: 0,
        justifyContent: 'space-between'
    },
    msgBox: {
        bottom: 10,
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

    }
})

export default ChatInnerComp;
