import React from "react"
import { TextInput, StyleSheet } from 'react-native'

export const LargeInput = () => {
    return (

        <TextInput style={styles.input} placeholder="Tell us about yourself" multiline />
    )
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        height: 250,
        borderRadius: 10,
        marginLeft: 2,
        marginTop: 35,
        paddingTop: 5,
        borderWidth: 1,
        borderColor: '#F47066',
        paddingLeft: 25,
        paddingTop: 25,
        textAlignVertical: 'top'
    }

})