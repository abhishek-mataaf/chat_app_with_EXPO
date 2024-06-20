import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import jsonUserData from '../../UserData/users.json';

export default function SignUpComp({ switchToLogin }: any) {
    const [lastIndexobj, setLastIndexobj] = useState<string>('');
    const [userNameInp, setUserNameInp] = useState<string>('')
    const [userEmailInp, setUserEmailInp] = useState<string>('')
    const [userPhoneInp, setUserPhoneInp] = useState<string>('')
    const [userPassInp, setUserPassInp] = useState<string>('')
    const [userData, setUserData] = useState<{
        id: string
        userName: string,
        userEmail: string,
        userPhone: string,
        userPass: string,
        userPicPath: string,
        messageArray: []
    }>()
    const [error, setError] = useState<{ pass: string, name: string, phone: string, email: string }>({ pass: '', name: '', phone: '', email: '' });
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        console.log(lastIndexobj, ' upper');
        setUserData({
            id: Math.floor(1000 + Math.random() * 9000).toString(),
            userName: userNameInp.toLowerCase(),
            userEmail: userEmailInp.toLowerCase(),
            userPhone: userPhoneInp,
            userPass: userPassInp,
            userPicPath: "data:image/jpeg;base64,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",
            messageArray: []
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
            if (isValid) {
                let data = await AsyncStorage.getItem("userData");
                if (data) {
                    let checkUser = JSON.parse(data);
                    if (Array.isArray(checkUser)) {
                        let res = checkUser.find((element: { userEmail: string | undefined; }) => {
                            return element.userEmail == userData?.userEmail
                        });
                        if (res) {
                            alert("user Already exits");
                        }
                        else {
                            checkUser.push(userData);
                            await AsyncStorage.setItem('userData', JSON.stringify(checkUser));
                            alert("User successfully inserted.");
                            switchToLogin();
                        }
                    }
                    else {
                        let newUserAdd: string = JSON.stringify([userData, ...JSON.parse(data)]);
                        let result: any = await AsyncStorage.setItem("userData", newUserAdd)
                        alert("User succesfully inserted.")
                        switchToLogin();
                    }
                }
                else {
                    let result: any = await AsyncStorage.setItem("userData", JSON.stringify(jsonUserData));
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
                        <TouchableOpacity onPress={() => signUpFunc()}>
                            <View style={styles.LoginButton}>
                                <Text style={styles.LoginButtonText}>
                                    Sign Up
                                </Text>
                            </View>
                        </TouchableOpacity>
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