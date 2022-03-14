import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { color } from 'react-native-elements/dist/helpers'
import { auth, firestore } from '../firebase/config'
import { LogOut } from '../firebase/Auth/LogOut'
import { Feather } from '@expo/vector-icons'

export default function Header() {
  return (

    <View>

      {/*---------------------------Header--------------------------*/}

      <View style={{ top: -20 }}>
        <Text style={styles.header}> {`WHAT'S YOUR`}</Text>
        <Text style={styles.header}> {`EMERGENCY ?`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    color: '#F96056',
    fontSize: 30,
    fontFamily: 'Arial'
  }

})
