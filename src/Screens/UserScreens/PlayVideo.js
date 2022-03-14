/**
 * @description      :
 * @author           : TLeeuw
 * @group            :
 * @created          : 03/11/2021 - 09:30:54
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 03/11/2021
 * - Author          : TLeeuw
 * - Modification    :
 **/

import React, { useState, useEffect, useRef } from 'react'
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  Pressable,
  Platform
} from 'react-native'
import { Card } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { Avatar } from 'react-native-elements'
import { Video } from 'expo-av'
import { Likes } from '../../firebase/Functions/Likes'
import { Dislikes } from '../../firebase/Functions/Dislikes'
import { auth, firestore } from '../../firebase/config'
import { Collect, Post } from '../../firebase/Storage/Storage.functions'

export default function PlayVideo ({ navigation, route }) {
  const data = route.params.vid
  const [userName, setUserName] = useState(data.owner)
  const [videoPlay, setVideoPlay] = useState(data.uri)
  const [views, setViews] = useState(data.views)
  const [videoVisible, setVideoVisible] = useState(true)
  const [count, setCount] = useState(0)
  const reference = useRef(data.index)
  const [info, setInfo] = useState()
  const [Comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [visibleStatusBar, setVisibleStatusBar] = useState(false)
  const [status, setStatus] = useState()

  const changeVisibilityStatusBar = () => {
    setVisibleStatusBar(!visibleStatusBar)
  }

  const addAct = async () => {
    let metadata = firestore
      .collection('Videos')
      .doc(data.firestore)
      .collection('Acts')
      .doc(auth.currentUser.uid)
    let found = (await metadata.get()).exists
    found
      ? null
      : (metadata.set({
          liked: false,
          disliked: false,
          Comments: [null],
          ref: auth.currentUser.uid
        }),
        setViews(views + 1))
  }
  const Navigate = () => {
    let match = data.match
    navigation.navigate('Doctor', { match })
  }

  const Delete = remove => {
    firestore
      .collection('Videos')
      .doc(data.firestore)
      .collection('Acts')
      .doc(auth.currentUser.uid)
      .get()
      .then(doc => {
        return doc.data().Comments
      })
      .then(item => {
        let update = item.filter(item => item.comment !== remove)
        return update
      })
      .then(update => {
        firestore
          .collection('Videos')
          .doc(data.firestore)
          .collection('Acts')
          .doc(auth.currentUser.uid)
          .update({
            Comments: update
          })
      })

    setComments(Comments.filter(item => item.comment !== remove))
  }

  useEffect(() => {
    Collect(data.firestore, setComments, setCount)
    addAct()
  }, [])

  return (
    <View style={styles.contain}>
      {/**-------BACK------BACK-------BACK */}
      <View style={styles.back}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>{`BACK`}</Text>
        </TouchableOpacity>
      </View>

      {/**-------------Video----------------Video-----------------Video---------------- */}
      <View style={styles.videoContainer}>
        <Video
          ref={data.index}
          source={{ uri: data.uri }}
          useNativeControls
          resizeMode='contain'
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>

      <View>
        <Text style={styles.vidTitle}>{data.title}</Text>
        <Text style={styles.viewCount}>
          {views} views - {data.stamp}
        </Text>
      </View>

      {/*-------------Social Icons-------Social Icons----------Social Icons */}
      <View style={styles.socialIcons}>
              {/*------------Likes-------------Likes--------Likes*/}

              <View style={styles.like}>
                <Likes data={data.firestore} />
              </View>

              {/*------------DisLikes-------------DisLikes--------DisLikes*/}
              <View style={styles.dislike}>
                {<Dislikes data={data.firestore} />}
              </View>

              {/*------------Share-------------Share--------Share*/}
              <View style={styles.share}>
                <TouchableOpacity onPress={() => ShareItem(data.url)}>
                  <Text style={styles.shareIcon}>
                    <FontAwesome5 name='share' size={20} color='black' />
                  </Text>
                  <Text style={styles.shareText}> Share </Text>
                </TouchableOpacity>
              </View>

              {/*------------Save-------------Save--------Save*/}

              <View style={styles.save}>
                <Text style={styles.saveIcon}>
                  <Entypo name='save' size={20} color='black' />
                </Text>
                <Text style={styles.saveText}> Save </Text>
              </View>
            </View>


      <View>

        {/**-------------Visible Info----------------Visible Info-----------------Visible Info----------------  */}
        {!visibleStatusBar ? (
          <View style={styles.statusOff}>
            <View style={styles.title}>
              <View/>
              {/*------------DropDown-------------DropDown--------DropDown*/}
              <View style={styles.dropdown}>
                <TouchableOpacity
                  title='topNav'
                  onPress={() => changeVisibilityStatusBar()}
                >
                  <AntDesign name='downcircle' size={18} color='black' />
                </TouchableOpacity>
              </View>
            </View>

            
            {/*------------Avatar-------------Avatar--------Avatar*/}
            <View style={styles.avatar}>
              <Avatar
                rounded
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/41.jpg'
                }}
                size='medium'
                // onPress={Navigate}
              />
              <Text style={styles.owner}> {data.owner}</Text>
            </View>

            {/*------------Comments-------------Comments--------Comments*/}
            <Card style={styles.txtCards}>
              <View style={styles.commentBox}>
                <View>
                  <TextInput
                    style={styles.txtFieldComment}
                    name='comment'
                    placeholder='Write a comment'
                    onChangeText={text => setComment(text)}
                  />
                </View>

                <View style={styles.commentButton}>
                  <Button
                    color='#F47066'
                    onPress={() => Post(comment, data.firestore)}
                    title='Comment'
                  />
                </View>
              </View>
            </Card>

            <View style={styles.commentCount}>
              <Text style={{ fontSize: 16 }}>Comments: {count}</Text>
            </View>

            <ScrollView
              style={styles.commentSect}
              showsVerticalScrollIndicator={false}
            >
              <Card style={styles.commentsInner}>
                {Comments.map((item, index) => (
                  <View style={styles.comments} key={index}>
                    <Text style={styles.txtUserComment}>{item.user}</Text>
                    <Text style={styles.txtComments}>{item.comment}</Text>
                  </View>
                ))}
              </Card>
            </ScrollView>
          </View>
        ) : (
          /**-------------Hidden Description----------------Hidden Description-----------------Hidden Description----------------  */

          <View style={styles.descriptionContainer}>
            <View style={styles.description}>
              <View>
                <Text style={styles.descriptionHead}>{'Description: '}</Text>
                <Text style={styles.descriptionText}>{data.description}</Text>
              </View>

              <View style={styles.close}>
                <TouchableOpacity onPress={() => changeVisibilityStatusBar()}>
                  <AntDesign name='closecircle' size={18} color='black' />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.descriptionBox}>
              <Text>{data.description}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  back: {
    marginTop: 10
  },

  videoContainer: {
    marginTop: 25,
    // position: 'absolute',
    width: '100%',
    backgroundColor: '#f7eeed'
  },

  statusOff: {
    width: 340,
    justifyContent: 'space-between'
  },

  title: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  vidTitle: {
    fontSize: 18,
    color: '#F47066'
  },

  viewCount: {
    width: 340,
    left: 2
  },

  dropdown: {
    marginTop: 12,
    // left: -12
  },

  close: {
    marginTop: 5
  },

  /*--------------Socials--------------------Socials----------------- */
  socialIcons: {
    width: 380,
    flexDirection: 'row',
    marginTop: 15,
    left: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f47066',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  like: {
    left: -8
  },

  dislike: {
    marginLeft: 10,
    marginTop: 3
  },

  share: {
    marginLeft: 15
  },

  save: {
    marginLeft: 2
  },

  saveIcon: {
    marginLeft: 8
  },

  avatar: {
    width: 340,
    flexDirection: 'row'
  },

  descriptionContainer: {
    width: 340
  },

  /*------------Comments------------------Comments----------------------- */
  txtCards: {
    width: '100%',
    height: 37,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginTop: 35,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#F47066'
  },

  commentBox: {
    flexDirection: 'row'
  },

  txtFieldComment: {
    margin: 8,
    fontSize: 18,
    borderRadius: 10,
    ...Platform.select({
      web: {
        outlineColor: '#fff',
        height: 25
      }
    })
  },

  commentButton: {
    width: '32%',
    height: 50,
    borderRadius: 25,
    left: 11
  },

  comments: {
    width: '65%',
    left: 3,
    marginVertical: 10,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#f47066'
  },

  txtComments: {
    color: '#fff',
    padding: 10
  },

  btnComment: {
    backgroundColor: '#F47066'
  },

  commentSect: {
    height: 220
  },

  commentsInner: {
    height: 340,
    width: 340
  },

  txtUserComment: {
    padding: 10,
    fontSize: 18,
    color: '#fff'
  },

  commentCount: {
    width: 340,
    marginTop: 20,
    alignItems: 'flex-start'
  },

  hiddenDescription: {
    backgroundColor: '#fff',
    marginTop: 20
  },

  safeArea: {
    marginTop: 10
  },

  description: {
    width: '100%',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  descriptionBox: {
    width: 340,
    marginTop: 25,
    alignItems: 'flex-start'
  },

  descriptionHead: {
    fontWeight: 'bold',
    color: '#F47066',
    fontSize: 22
  },

  descriptionText: {
    maxWidth: 315
  },

  shareIcon: {
    marginLeft: 8
  },

  shareText: {
    paddingTop: 5
  },

  saveText: {
    paddingTop: 5
  },

  owner: {
    paddingTop: 15,
    fontSize: 17,
    color: '#f47066'
  }
})
