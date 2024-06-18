import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomePage = () => {
    return (
        <View style={styles.container}>
            <Text>
                this is Home Component
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height:700,
        borderColor:'black',
        borderWidth:2,
        justifyContent:'center',
        alignItems:'center',
        
    }
})

export default HomePage;
