import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Entypo } from 'react-native-vector-icons'
import { firestore, auth } from '../config';

function Counter({ video }) {

  const [count, setCount] = useState(0),
    [pressed, setPressed] = useState(false),
    Check = async () => {
      let myLike = await firestore.collection('Videos').doc(video).collection('Acts').doc(auth.currentUser.uid).get()
        .then(doc => (doc.data().liked))
      firestore.collection('Videos').doc(video).collection('Acts').where("liked", "==", true)
        .onSnapshot(query => {
          query.forEach(doc => {
            doc.exists ? setCount(count + 1) : null
          })
        })
    },

    Like = async () => {
      let thisLike = await firestore.collection('Videos').doc(video).collection('Acts').doc(auth.currentUser.uid).get()
        .then(doc => (doc.data().liked))
      let thisDislike = await firestore.collection('Videos').doc(video).collection('Acts').doc(auth.currentUser.uid).get()
        .then(doc => (doc.data().disliked))
      thisLike ? (
        firestore.collection('Videos').doc(video).collection('Acts').doc(auth.currentUser.uid).update({
          liked: false
        }),

        setPressed(!pressed)

      ) : (

        thisDislike ? (
          firestore.collection('Videos').doc(video).collection('Acts').doc(auth.currentUser.uid).update({
            liked: true,
            disliked: false
          }),

          setPressed(!pressed)

        ) : (

          firestore.collection('Videos').doc(video).collection('Acts').doc(auth.currentUser.uid).update({
            liked: true
          }),

          setPressed(!pressed)

        )
      )
    };

  useEffect(() => { Check() }, [pressed])

  return (
    <View>
      <TouchableOpacity onPress={Like}>
        <Entypo name="thumbs-up" size={20} color="black" />
        <Text style={{ paddingTop: 6 }}> {count}</Text>
      </TouchableOpacity>
    </View>

  );
}

const Likes = ({ data }) => {
  return (<Counter video={data} />)

};

export { Likes }