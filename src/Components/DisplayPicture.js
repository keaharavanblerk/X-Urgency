import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from 'react-native'
import { auth } from "../firebase/config"
import { Avatar } from 'react-native-elements'

export const DisplayPicture = () => {

    const [image, setImage] = useState(null)
    const [initial, setInitial] = useState('')

    const getProfile = async () => {
        let name
        setImage(await auth.currentUser.photoURL)
        name = auth.currentUser.displayName
        setInitial(name.substring(0, 1))
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <>
            <View>
                {image ? (
                    <Avatar style={styles.avatar} rounded source={{ uri: image, }} size="large" />
                ) : (
                    <View style={styles.temp}>
                        <Text style={styles.temp_text}> {initial} </Text>
                    </View>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 50,
        marginTop: 80,
        borderBottomWidth: 3,
        borderColor: 'turquoise',
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        elevation: 1,
    },

    temp: {
        width: 150,
        height: 150,
        borderRadius: 80,
        marginTop: 80,
        backgroundColor: 'turquoise',
        textAlign: 'center',
        alignItems: "center",
        justifyContent: 'center'
    },

    temp_text: {
        fontSize: 40,
        color: '#fff',
    }

})