import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import SignUpComp from './SignUpComp';
import LoginComp from './LoginComp';


const Main = () => {
    const [showLogin, setShowLogin] = useState<boolean>(true);

    const switchToSignup = () => {
        setShowLogin(false);
    }
    const switchToLogin = (): any => {
        setShowLogin(true);
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{
                    marginTop: 60,
                    flex: 1,
                    flexDirection: 'row',
                    gap: 10,

                }}>
                    <Image source={require('../../assets/AppLogo.png')} />
                    <Text style={styles.textDetail}>MyTalks App</Text>
                </View>
                <View style={{
                    marginTop: 20
                }}>
                    {showLogin ?
                        <LoginComp switchToSignup={switchToSignup} /> : <SignUpComp switchToLogin={switchToLogin} />
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 30,
        backgroundColor: '#ffff99',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2
    },
    textDetail: {
        fontWeight: 'bold',
        fontSize: 30,
    }
})

export default Main;
