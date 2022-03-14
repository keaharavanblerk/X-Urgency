import React from "react"
import { Button, StyleSheet, TextInput } from "react-native"

export const CommentBox = ({ Post, setComment }) => {
  return (
    <>
      {/* <Text style={styles.txtCards}> */}
      {/* <Card style={styles.txtCards}> */}
      {/* <View style={{ flexDirection: 'row', width: "auto", height: 40 }}> */}
      <TextInput style={styles.comment} name="comment" placeholder="Write a comment" onChangeText={text => setComment(text)} />
      {/* <View style={{ width: 90, height: 40, borderRadius: 30 }}> */}
      <Button color="#F47066" onPress={() => Post(comment, data.firestore)} title='Comment' />
      {/* </View> */}
      {/* </View> */}
      {/* </Card> */}
      {/* </Text> */}
    </>
  )
}

const styles = StyleSheet.create({
  comment: {
    width: 295,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingLeft: 10,
  },

  btnComment: {
    backgroundColor: "#F47066"
  }
})