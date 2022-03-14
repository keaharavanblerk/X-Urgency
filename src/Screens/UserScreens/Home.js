import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView
} from 'react-native'
// import { ScrollView } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'
import { auth, firestore } from '../../firebase/config'
import {LoadSet} from '../../firebase/Storage/Storage.functions'
import Header from '../../Components/Header'
import Menu from '../../Components/Menu'
import CallSiren from '../../Components/CallSiren'
import LogOutComp from '../../Components/LogOutComp'
import VideoList from '../../Components/VideoList'
import { Feather } from '@expo/vector-icons'
import { Avatar, Badge } from 'react-native-elements'
import { AlertNote } from '../../Components/Alert'
import { Video } from 'expo-av'

export default function Home ({ navigation, Exit }) {
  const [status, setStatus] = useState({})
  const [videos, setLoad] = useState(null)
  const [image, setImage] = useState(null)
  const [initial, setInitial] = useState('')
  const [collection, setCollection] = useState([
    {
      title: "Video 1",
      views: 7,
      tag: "Choking",
      stamp: "2 days ago",
      id: 1,
      description: "Lorem ipsum etc",
      owner: "Ntsikayomzi Ngcakani",
      firestore: "c4ac278a-baa1-403a-bb98-1f4ff9d8af7",
      match: "XYRltIaLknbfJrvZG4OfyOtGYTz2",
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },

    {
      title: "Video 2",
      views: 200,
      tag: "Stroke",
      stamp: "3 years ago",
      id: 2,
      description: "Lorem ipsum etc",
      owner: "Thabo Moeti",
      firestore: "b7e7379f-4c5b-459a-8b17-14cfb254786",
      match: "SvkJPojTkUNBr8IVgoKqoTosIlE3",
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    }
  ])

  // useEffect(() => {
  //   auth.currentUser ?
  //     //  (setImage(auth.currentUser.photoURL),
  //       setInitial(auth.currentUser.displayName.substring(0, 1))
  //     : auth.onAuthStateChanged(doc => {
  //         // setImage(doc.photoURL)
  //         // console.log(doc.displayName)
  //         setInitial(doc.displayName.substring(0, 1))
  //         console.log(auth.currentUser)
  //       })
  // }, [])

  // useEffect(()=>{
  //   LoadSet(setCollection)
  // }, [])

  // const reference = useRef(collection.map(item=>item.uri))

  const ItemSeperatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: 380,
          left: -10,
          backgroundColor: '#c8c8c8'
        }}
      />
    )
  }

  const [displayModal, setDisplaModal] = useState(false)
  const [message, setMessage] = useState('')

  return (
    <View style={styles.container}>

<View style={{ alignItems:'center' }}>

  <View style={{width:'100%'}}>
      <AlertNote
        modalVisible={displayModal}
        setModalVisible={setDisplaModal}
        msg={message}
      />

      {/**------------------CallSiren--------------------CallSiren----------------- */}
      <View
        style={{
          width: '95%',
          flexDirection: 'row',
          marginVertical: 35,
          justifyContent: 'flex-end'
        }}>
        <View style={{ left: -15 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EmergencyContacts')}
          >
            <CallSiren />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={Exit}>
            <LogOutComp />
          </TouchableOpacity>
        </View>
      </View>

      {/**----------------Header/Avatar--------------------Header/Avatar--------------- */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        {/*-------------Header---------------Header--------------Header------- */}
        <View>
          <Header />
        </View>

        <View style={{top:-25}}>
          {image ? (
            <Avatar rounded source={{ uri: image }} size='large' />
          ) : (
            <View style={styles.temp}>
              <Text style={styles.temp_text}> {initial} </Text>
            </View>
          )}
        </View>
      </View>

      {/**-----------Menu Category--------------Menu Category--------------------- */}
      <View style={{ width: '100%', alignItems:'center'}}>
        <Menu />
      </View>

      {/*---------------------- Video Scroll View--------------------*/}
      <View style={{ marginTop:15, alignItems:' center'}}>
        <ScrollView
          style={{ height: 435 }}
          vertical={true}
          showsVerticalScrollIndicator={false}
        >
          {collection
            ? collection.map((vid, index) => (
                <View
                  style={{ width: 360, marginTop: 20, alignItems:'center', backgroundColor: '#b5a8a8' }}
                  key={index}
                >
                  <TouchableOpacity
                    style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => navigation.navigate('PlayVideo', { vid })}
                  >
                    <Video
                      ref={vid.index}
                      source={{ uri: vid.uri }}
                      resizeMode='stretch'
                      isLooping
                      style={{ width: '100%', height: 180 }}
                    />
                  </TouchableOpacity>
 
                <View
                  style={{
                    width: '98%',
                    flexDirection: 'row',
                    margin:3,
                    justifyContent: 'space-between'}} >
                    <Text style={styles.vidTitle}>{vid.title}</Text>
                    <Text style={styles.tag}>{vid.views}Views</Text>
                  </View>

                  <View style={{ width:'98%', margin:3, marginTop: -25, alignItems:'flex-start'}}>
                    <Text style={styles.tag1}>{vid.tag} </Text>
                    <Text style={styles.tag}>{vid.stamp}</Text>
                  </View>

                  <ItemSeperatorView />
                </View>
              ))
            : null}
            
        </ScrollView>
      </View>
      </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor: '#fff'
  },

  logoutIMG: {
    width: 15,
    height: 15
  },

  menu2: {
    width: '95%',
    height: 520,
    borderRadius: 15,
    elevation: 5
  },

  categoryListText: {
    paddingLeft: 15,
    fontSize: 17,
    fontWeight: 'bold'
  },

  vidTitle: {
    marginTop: -25,
    fontSize: 17,
    fontWeight:'bold',
    color: 'black'
  },

  tag: {
    color:'#fff'
  },

  tag1: {
    color:'#fff',
    marginTop: -25
  },



  temp: {
    width: 70,
    height: 70,
    borderRadius: 50,
    left: -10,
    backgroundColor: 'turquoise',
    alignItems: 'center',
    justifyContent: 'center'
  },

  temp_text: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
    
  }
})
