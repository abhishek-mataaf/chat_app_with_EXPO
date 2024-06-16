import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , ScrollView } from 'react-native';
import LoginComp from './components/LoginComp';
import SignUpComp from './components/SignUpComp';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{
        marginTop: 30
      }}>
        <Text style={styles.textDetail}>My Chat App</Text>
      </View>
      <View style={{
        marginTop: 20
        // justifyContent:'',
      }}>
        <LoginComp />
        {/* <SignUpComp /> */}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff99',
    alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  textDetail: {
    fontWeight: 'bold',
    fontSize: 30,
  }
});
