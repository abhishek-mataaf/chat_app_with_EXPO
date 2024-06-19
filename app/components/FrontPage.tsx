import { faFaceLaughWink } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import UsersList from './UsersList';
import { useGlobalSearchParams } from 'expo-router';
const FrontPage = () => {
    const { currentUser1 }: any = useGlobalSearchParams();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Hey {JSON.parse(currentUser1).userName.split(' ')[0]}
                </Text>
                <FontAwesomeIcon icon={faFaceLaughWink} style={{ color: 'white' }} secondaryColor='red' />
            </View>
            <UsersList />
        </View>
    );
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
