import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { color } from 'react-native-elements/dist/helpers'
import { Feather } from '@expo/vector-icons'
import { EmergencyContacts } from '../Screens'

export default function CallSiren() {
  return (

    <View style={{ flexDirection: 'row' }}>

      {/**---------Call Siren------------Call Siren---------Call Siren-------------------- */}

      <Image source={require('../../img/siren.jpg')} style={{ width: 30, height: 35 }} />

      <View style={{ paddingVertical: 10 }}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'Arial', color: '#F47066' }} > {`Call`}</Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'Arial', color: '#F47066' }}> {`Now`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logoutIMG: {
    width: 20,
    height: 20,
    top: -30,
  }

})
