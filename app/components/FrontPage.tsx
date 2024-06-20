import { faFaceLaughWink } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import UsersList from './UsersList';
import { useGlobalSearchParams } from 'expo-router';
const FrontPage = () => {
    const [name, setname] = useState<string>()
    const [currentUser, setCurrentUser] = useState();
    const { currentUser1 }: any = useGlobalSearchParams();

    useEffect(() => {
        setCurrentUser(currentUser1)
        setname(JSON.parse(currentUser1).userName.split(' ')[0])
    }, [currentUser])

    if (!currentUser) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Loading...</Text>
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        Hey {name}
                    </Text>
                    <FontAwesomeIcon icon={faFaceLaughWink} style={{ color: 'white' }} secondaryColor='red' />
                </View>
                <UsersList currentUserObj={currentUser1} />
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
        flex: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    headerText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold'
    }
})

export default FrontPage;
