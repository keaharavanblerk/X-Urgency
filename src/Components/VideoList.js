import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-paper'
import { Video } from 'expo-av'
import { ScrollView } from 'react-native-gesture-handler'

const ItemSeperatorView = () => {
  return (

    <View style={{ height: 0.5, width: 380, backgroundColor: '#c8c8c8' }} />
  )
}

export const VideoList = ({ videos, VideoScreen }) => {
  const [status, setStatus] = useState({})
  const ref = useRef(null)

  return (

    <View>
      <ScrollView style={{ height: 420, width: 335 }} vertical={true} showsVerticalScrollIndicator={false} >
        <View>
          {videos ? videos.map((vid) => (<View style={{ width: 335, alignItems: 'center', justifyContent: 'center' }}
            key={vid.id}>
            <Card style={{ width: 335, height: 245, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA' }} >

              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('PlayVideo', { vid })} >
                <Video ref={ref} source={{ uri: vid.url }} resizeMode='stretch' isLoopingonPlaybackStatusUpdate={status => setStatus(() => status)}
                  style={{ width: '100%', height: 165, marginTop: 5, alignSelf: 'center' }} />
              </TouchableOpacity>

              <View style={{ justifyContent: 'space-between' }}>
                <Text style={styles.vidTitle}>{vid.title}</Text>
                <Text style={styles.tag}>{vid.owner}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                  <Text style={styles.tag}>{vid.views} Views</Text>
                  <Text style={styles.tag}>{vid.stamp}</Text>
                </View>

              </View>
            </Card>
            <ItemSeperatorView />
          </View>
          ))
            :
            null
          }
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  vidTitle: {
    paddingLeft: 2,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#F47066'
  },

  tag: {
    paddingLeft: 5,
    fontSize: 12,
    fontFamily: 'Roboto'
  }
})
