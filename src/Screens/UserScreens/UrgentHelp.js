import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'; ('react-native')
import { AntDesign } from '@expo/vector-icons'

export default function UrgentHelp({ navigation }) {
  return (

    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}
      style={styles.logo}>
        <Image style={{ height: 350, width: '95%' }} source={require('../../images/UrgentHelpLOGO.png')} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', textAlign: 'center', color: '#F47066' }} >{`Need Urgent Help?`}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.txtContent}>{`Learn basic first-aid skills`}</Text>
        <Text style={styles.txtContent}>{`by watching short`}</Text>
        <Text style={styles.txtContent} >{`videos of everyday first-aid scenarios`}</Text>
      </View>

      {/**------Screen Indicators-----------Screen Indicators----------- */}

      <View style={{ width: 360, alignItems: 'center', marginTop: 80 }}>
        <View style={{ width: 130, top: -25, flexDirection: 'row', justifyContent: 'space-evenly' }}  >
          <Text style={{ fontSize: 22, color: '#F47066' }}>{`o`}</Text>
          <Text style={{ fontSize: 22, color: '#F47066' }}>{`o`}</Text>
          <Text style={{ fontSize: 22, color: '#F47066' }}>{`o`}</Text>
        </View>
      </View>

      {/**------btnNext-----------btnNext--------- */}

      <View style={{ width: 360, marginTop: 15, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.buttons} >
          <Text style={{ fontWeight: 'bold', color: '#fff', }}> {`SignIn`} </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}
          style={styles.buttons} >
          <Text style={{ fontWeight: 'bold', color: '#fff', }}>  {`Create Account`} </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor: '#fff'
  },

  logo: {
    width: 360,
    top: -55,
    left: 10,
    right: 10
  },

  header: {
    width: 360,
    top: -50
  },

  content: {
    width: 360,
    alignItems: 'center',
    justifyContent: 'center'
  },

  txtContent: {
    fontSize: 19,
  },

  buttons: {
    height: 50,
    width: '60%',
    borderRadius: 10,
    top: -30,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f47066'
  }

})
