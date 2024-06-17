import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, TouchableHighlight } from "react-native"


export default function LoginComp() {
    const navigatePath = useRouter()
    const [userIdInp, setUserIdInp] = useState('')
    const [userPassInp, setUserPassInp] = useState('')
    const [userData, setuserData] = useState<{ userId: string, userPass: string }>()

    useEffect(() => {
        setuserData({
            userId: userIdInp,
            userPass: userPassInp
        })
    }, [userIdInp, userPassInp])
    const LogInFunction = async () => {
        let res: string | null = await AsyncStorage.getItem('userData');
        if (res) {
            let checkUser = JSON.parse(res);
            let isUser = checkUser.find((element: { userEmail: string | undefined, userPass: string | undefined }) => {
                return element.userEmail == userData?.userId && element.userPass == userData?.userPass
            });
            if (isUser) {
                alert("Login Done")
            }
            else {
                alert('Used id or password is invaild')
            }

        }
    }
    const NewUserAddFunc = () => {
        // router.push('/components/SignUpComp')
        navigatePath.push('/components/SignUpComp')
    }
    const PassForgetFunc = () => {

    }
    return (
        <>
            <View style={{
                backgroundColor: 'yellow',
                shadowColor: 'grey',
                shadowOpacity: 0.2,
                shadowOffset: { width: -2, height: -4 },
                elevation: 5,
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
                    }}>Login</Text>
                </View>
                <View style={{
                    flex: 1,
                    gap: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View>
                        <TextInput onChangeText={(newText) => setUserIdInp(newText)} style={styles.TextDetail} placeholder="User ID" />
                    </View>
                    <View>
                        <TextInput onChangeText={(newText) => setUserPassInp(newText)} style={styles.TextDetail} placeholder="Password" />
                    </View>
                    <Pressable onPress={() => LogInFunction()}>
                        <View style={styles.LoginButton}>
                            <Text style={styles.LoginButtonText}>
                                Login
                            </Text>
                        </View>
                    </Pressable>
                    <View style={styles.footerBox}>
                        <Pressable onPress={() => NewUserAddFunc()}>
                            {/* <Link href={{
                                pathname:'/components/SignUpComp'
                            }}> */}
                            <Text style={styles.linkText}>New User ?</Text>
                            {/* </Link> */}
                        </Pressable>
                        <Pressable onPress={() => PassForgetFunc()}>
                            <Text style={styles.linkText}>forget Password</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    TextDetail: {
        borderWidth: 2,
        borderColor: 'black',
        width: 250,
        height: 50,
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 8,
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