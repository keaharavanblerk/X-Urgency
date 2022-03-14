import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default function TakeVideo({ navigation }) {
  return (
    <View>

      <View style={styles.logo}>
        <Image style={{ height: 310, width: 250 }} source={require('../../images/TakeVideoLOGO.png')} />
      </View>

      <View>
        <Text>{`Take a video?`}</Text>
      </View>

      <View style={styles.content}>
        <Text>{`Learn basic first-aid skills`}</Text>
        <Text>{`by watching short`}</Text>
        <Text>{`videos of everyday first-aid scenarios`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  header: {},
  content: {}
})
