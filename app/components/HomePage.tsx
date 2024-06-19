import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, Button, Pressable, TouchableOpacity } from 'react-native';
// "fa-solid fa-circle-check"
const HomePage = () => {
    const route = useRouter()
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/homePicon.png')}
                    style={styles.image}
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.text1}>Stay connected with your friends and family</Text>
                <View style={styles.box2}>
                    <FontAwesomeIcon
                        color='green'
                        icon={faCircleCheck}
                    />
                    <Text style={styles.text2}>Secure , private messaging</Text>
                </View>
                <TouchableOpacity style={styles.btnBox} onPress={() => route.push("components/FrontPage")}>
                    <Text style={{
                        fontSize: 15,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        Get Started
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text1: {
        color: 'white',
        marginBottom: 10,
        textAlign: 'left',
        fontSize: 45,
        fontWeight: 'bold',
        width: '100%',

    },
    text2: {
        color: 'white',
        marginBottom: 10,
        textAlign: 'left',
        width: '100%',
        fontWeight: '700',
        fontSize: 17,
    },
    box2: {
        flex: 0,
        flexDirection: 'row',
        gap: 10,
        paddingLeft: 13
    },
    btnBox: {
        backgroundColor: 'white',
        width: '60%',
        paddingVertical: 15,
        borderRadius: 20,
        marginVertical: 10
    }
});

export default HomePage;
