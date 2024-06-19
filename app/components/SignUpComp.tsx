import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native"

export default function SignUpComp({ switchToLogin }: any) {
    const [userNameInp, setUserNameInp] = useState<string>('')
    const [userEmailInp, setUserEmailInp] = useState<string>('')
    const [userPhoneInp, setUserPhoneInp] = useState<string>('')
    const [userPassInp, setUserPassInp] = useState<string>('')
    const [userData, setUserData] = useState<{
        userName: string,
        userEmail: string,
        userPhone: string,
        userPass: string
    }>()
    const [error, setError] = useState<{ pass: string, name: string, phone: string, email: string }>({ pass: '', name: '', phone: '', email: '' });
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        setUserData({
            userName: userNameInp.toLowerCase(),
            userEmail: userEmailInp.toLowerCase(),
            userPhone: userPhoneInp,
            userPass: userPassInp
        });
        validateForm();
    }, [userNameInp, userEmailInp, userPhoneInp, userPassInp])

    const validateForm = () => {
        let error: { pass: string, name: string, phone: string, email: string } = { pass: '', name: '', phone: '', email: '' }
        if (!userPassInp) {
            error.pass = ('* Password is required.');
        } else if (userPassInp.length < 6) {
            error.pass = '* Password must be at least 6 characters.';
        }
        if (!userPhoneInp) {
            error.phone = '* Phone Number is required.';
        }
        else if (userPhoneInp.length !== 10) {
            error.phone = '* Phone Number is not valid';
        }
        if (!userEmailInp) {
            error.email = "* Email is required";
        }
        else if (!/\S+@\S+\.\S+/.test(userEmailInp)) {
            error.email = '* Email is Invalid'
        }
        if (!userNameInp) {
            error.name = "* name is required";
        }
        setError(error);
        setIsValid(Object.values(error).every(e => e == ''));
    }

    const signUpFunc = async () => {
        try {
            // let result: any = await AsyncStorage.setItem('userData', "[{'name':'abhi'}]")
            // console.log(result);

            if (isValid) {
                let data = await AsyncStorage.getItem('userData');
                if (data) {
                    let checkUser = JSON.parse(data);
                    let res = checkUser.find((element: { userEmail: string | undefined; }) => {
                        return element.userEmail == userData?.userEmail
                    });
                    if (res) {
                        alert("user Already exits");
                    }
                    else {
                        let newUserAdd: string = JSON.stringify([userData, ...JSON.parse(data)]);
                        let result: any = await AsyncStorage.setItem('userData', newUserAdd)
                        alert("User succesfully inserted.")
                        switchToLogin();
                    }
                }
                else {
                    let result: any = await AsyncStorage.setItem('userData', JSON.stringify([userData]));
                    alert("User succesfully inserted.")
                    switchToLogin();
                }

            }
            else {
                alert("form submit failed");
            }
        }
        catch (er) {
            console.log(er, "error apperaed");
        }

    }
    return (
        <>
            <ScrollView>
                <View style={{
                    // borderColor: 'black',
                    // borderWidth: 2,
                    backgroundColor: 'yellow',
                    shadowColor: 'grey',
                    shadowOpacity: 0.2,
                    shadowOffset: { width: -2, height: -4 },
                    // elevation: 5,
                    shadowRadius: 2,
                    height: 550,
                    width: 300,
                    borderRadius: 10

                }}>
                    <View style={{
                        borderColor: 'black',
                        borderBottomWidth: 2,
                        paddingVertical: 5,
                        alignItems: 'center',
                        // backgroundColor: 'black',
                        borderTopLeftRadius: 7,
                        borderTopRightRadius: 7,
                        // borderBottomEndRadius:2
                    }}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: '700',
                            // color: 'yellow'
                        }}>Sign Up</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        gap: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View>
                            <TextInput onChangeText={(newText) => setUserNameInp(newText)} style={styles.TextDetail} placeholder="Enter your name" />
                            <Text>{error.name}</Text>
                        </View>
                        <View>
                            <TextInput onChangeText={(newText) => setUserEmailInp(newText)} style={styles.TextDetail} placeholder="Enter your mail Id" />
                            <Text>{error.email}</Text>

                        </View>
                        <View>
                            <TextInput onChangeText={(newText) => setUserPhoneInp(newText)} style={styles.TextDetail} placeholder="Enter your phone no." />
                            <Text>{error.phone}</Text>

                        </View>
                        <View>
                            <TextInput secureTextEntry={true} onChangeText={(newText) => setUserPassInp(newText)} style={styles.TextDetail} placeholder="Create password" />
                            <Text>{error.pass}</Text>

                        </View>
                        <Pressable onPress={() => signUpFunc()}>
                            <View style={styles.LoginButton}>
                                <Text style={styles.LoginButtonText}>
                                    Sign Up
                                </Text>
                            </View>
                        </Pressable>
                        <View style={styles.footerBox}>
                            <Pressable onPress={switchToLogin}>
                                <Text style={styles.linkText}>Already a user ? Login</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    TextDetail: {
        // borderBottomWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'black',
        width: 250,
        height: 50,
        fontSize: 18,
        textAlign: 'center',
        // borderRadius: 8,
    },
    LoginButton: {
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 2,
        width: 100,
        marginTop: 15,
        alignItems: 'center',
        padding: 5,
        borderRadius: 20,
    },
    LoginButtonText: {
        color: 'yellow',
        fontSize: 18
    },
    footerBox: {
        paddingTop: 20,
        width: 250,
        flex: 0,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    }
})