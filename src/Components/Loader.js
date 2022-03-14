import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const ProgressBar = ({ status }) => {

    const [inner, setInner] = useState({ width: `${status}%`, height: 15, backgroundColor: '#F47066' })

    useEffect(() => {
        setInner({ width: `${status}%`, height: 15, backgroundColor: '#F47066' })

    }, [status])

    return (

        <View style={styles.outer}>
            <View style={inner}> </View>
        </View>

    )
}

const Loading = () => {
    return (

        <View style={styles.loading}>
            <ActivityIndicator size={60} />
        </View>

    )
}

const styles = StyleSheet.create({
    bar: {
        width: '100%',
        height: 15,
        backgroundColor: 'transparent'
    },

    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 450
    }
})

export { ProgressBar, Loading }