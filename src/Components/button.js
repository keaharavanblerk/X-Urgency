import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { EmergencyContacts } from '../Screens';

export default function Button({ name, Run }) {

  return (

    <TouchableOpacity onPress={Run} style={styles.signIn}>
      <Text style={{ color: '#fff' }}>{name}</Text>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  signIn: {
    height: 50,
    width: 200,
    marginLeft: 85,
    marginTop: 45,
    borderRadius: 10,
    backgroundColor: '#F47066',
    alignItems: 'center',
    justifyContent: 'center'
  }

});

