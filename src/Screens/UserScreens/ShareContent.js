import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'; ('react-native')
import { AntDesign } from '@expo/vector-icons'

export default function ShareContent({ navigation }) {
  return (

    <View style={styles.container}>
      <View style={styles.logo}>
        <Image style={{ height: 350, width: '95%' }} source={require('../../images/ShareContLOGO.png')} />
      </View>

      <View style={styles.header}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', textAlign: 'center', color: '#F47066' }} >{`Share Content?`}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.txtContent}>{`Upload and share your`}</Text>
        <Text style={styles.txtContent}>{`content with others`}</Text>
      </View>

      {/**------Screen Indicators-----------Screen Indicators----------- */}

      <View style={{ width: 360, alignItems: 'center', marginTop: 80 }} >
        <View style={{ width: 130, flexDirection: 'row', justifyContent: 'space-evenly' }} >
          <Text style={{ fontSize: 22, color: '#F47066' }}>{`o`}</Text>
          <Text style={{ fontSize: 22, color: '#F47066' }}>{`o`}</Text>
          <Text style={{ fontSize: 22, color: '#F47066' }}>{`o`}</Text>
        </View>
      </View>

      {/**------btnNext-----------btnNext--------- */}

      <View style={{ width: 360, marginVertical: 25, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('LikeConn')} style={styles.btnNext} >
          <Text style={{ fontWeight: 'bold', color: '#fff', paddingLeft: 25 }} >   {`NEXT`} </Text>

          <View style={{ left: 40 }} >
            <AntDesign name='arrowright' size={25} color='#fff' />
          </View>
        </TouchableOpacity>
      </View>

      {/**-------BACK------BACK-------BACK */}

      <View style={{ width: 360, marginVertical: 15, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{textAlign:'center'}}>{`BACK`}</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  logo: {
    width: 360,
    top: -15,
    left: 10,
    right: 10
  },

  header: {
    width: 360,
    top: -60
  },

  content: {
    width: 360,
    top: -20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  txtContent: {
    fontSize: 19,
  },

  btnNext: {
    height: 50,
    width: '60%',
    top: -20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f47066'
  }

})
