import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Socials({ text, number }) {
    return (

        <View style={styles.socials}>
            <Text style={{ fontFamily: 'Roboto', textAlign: 'center' }}>{number}</Text>
            <Text style={{ fontFamily: 'Roboto', textAlign: 'center' }}>{text}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    socials: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,

    },
})
