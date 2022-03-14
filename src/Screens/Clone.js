import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import { AntDesign, FontAwesome5, Entypo } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { Card } from "react-native-paper";
import { Likes } from "../firebase/Functions/Likes";
import { Dislikes } from "../firebase/Functions/Dislikes";
import { Collect, Post } from "../firebase/Storage/Storage.functions";

const Clone = ({ route, navigation }) => {
  const data = route.params.vid;
  const [userName, setUserName] = useState(data.owner);
  const [videoPlay, setVideoPlay] = useState(data.url);
  const [views, setViews] = useState(data.views);
  const [videoVisible, setVideoVisible] = useState(true);
  const [count, setCount] = useState(0);
  const reference = useRef(data.url.split("?")[0]);
  const [info, setInfo] = useState();
  const [Comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [visibleStatusBar, setVisibleStatusBar] = useState(false);
  const [status, setStatus] = React.useState({});

  const changeVisibilityStatusBar = () => {
    setVisibleStatusBar(!visibleStatusBar);
  };
  const addAct = async () => {
    let metadata = firestore
      .collection("Videos")
      .doc(data.firestore)
      .collection("Acts")
      .doc(auth.currentUser.uid);
    let found = (await metadata.get()).exists;
    found
      ? null
      : (metadata.set({
          liked: false,
          disliked: false,
          Comments: [null],
          ref: auth.currentUser.uid,
        }),
        setViews(views + 1));
  };
  const Navigate = () => {
    let match = data.match;
    navigation.navigate("Doctor", { match });
  };
  const Delete = (remove) => {
    firestore
      .collection("Videos")
      .doc(data.firestore)
      .collection("Acts")
      .doc(auth.currentUser.uid)
      .get()
      .then((doc) => {
        return doc.data().Comments;
      })
      .then((item) => {
        let update = item.filter((item) => item.comment !== remove);
        return update;
      })
      .then((update) => {
        firestore
          .collection("Videos")
          .doc(data.firestore)
          .collection("Acts")
          .doc(auth.currentUser.uid)
          .update({
            Comments: update,
          });
      });

    setComments(Comments.filter((item) => item.comment !== remove));
  };

  useEffect(() => {
    Collect(data.firestore, setComments, setCount);
    addAct();
  }, []);

  useEffect(()=>{
    console.log(data.url)
  })

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
          ref={reference}
          source={{ uri: videoPlay }}
          useNativeControls
          resizeMode="stretch"
          isLooping
          style={styles.video}
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>

      {/**-------------Visible Info----------------Visible Info-----------------Visible Info----------------  */}
      <View>
        {!visibleStatusBar ? (
          <View style={styles.statusOff}>
            <View style={styles.title}>
              <Text style={styles.vidTitle}>{data.title}</Text>
              <Text style={styles.viewCount}>
                {views} views - {data.stamp}
              </Text>
            </View>

            {/*------------DropDown-------------DropDown--------DropDown*/}
            <View style={styles.dropdown}>
              <TouchableOpacity
                title="topNav"
                onPress={() => changeVisibilityStatusBar()}
              >
                <AntDesign
                  name="downcircle"
                  size={18}
                  color="black"
                  style={styles.drop}
                />
              </TouchableOpacity>
            </View>

            {/*-------------Social Icons-------Social Icons----------Social Icons */}
            <View style={styles.socialIcons}>
              {/*------------Likes-------------Likes--------Likes*/}
              <View style={styles.like}>
                <Likes data={data.firestore} />
              </View>

              {/*------------DisLikes-------------DisLikes--------DisLikes*/}
              <View style={styles.dislike}>
                <Dislikes data={data.firestore} />
              </View>

              {/*------------Share-------------Share--------Share*/}
              <View style={styles.share}>
                <TouchableOpacity onPress={() => ShareItem(data.url)}>
                  <Text style={styles.shareIcon}>
                    <FontAwesome5 name="share" size={20} color="black" />
                  </Text>
                  <Text style={styles.shareText}> Share </Text>
                </TouchableOpacity>
              </View>

              {/*------------Save-------------Save--------Save*/}
              <View style={styles.save}>
                <Text style={styles.saveIcon}>
                  <Entypo name="save" size={20} color="black" />
                </Text>
                <Text style={styles.saveText}> Save </Text>
              </View>
            </View>

            {/*------------Avatar-------------Avatar--------Avatar*/}
            <View style={styles.avatar}>
              <Avatar
                rounded
                source={{
                  uri: "https://randomuser.me/api/portraits/men/41.jpg",
                }}
                size="medium"
                onPress={Navigate}
              />
              <Text style={styles.owner}> {data.owner}</Text>
            </View>

            {/*------------Comments-------------Comments--------Comments*/}
            <Card style={styles.txtCards}>
              <View style={styles.commentBox}>
                <TextInput
                  style={styles.comment}
                  name="comment"
                  placeholder="Write a comment"
                  onChangeText={(text) => setComment(text)}
                />
                <View style={styles.commentButton}>
                  <Button
                    color="#F47066"
                    onPress={() => Post(comment, data.firestore)}
                    title="Comment"
                  />
                </View>
              </View>
            </Card>

            <View style={styles.commentCount}>
              <Text style={styles.commentCount}>Comments: {count}</Text>
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
          <View style={styles.hiddenDescription}>
            <View style={styles.description}>
              <View>
                <Text style={styles.descriptionHead}>{"Description: "}</Text>
                <Text style={styles.descriptionText}>{data.description}</Text>
              </View>
              <View style={styles.close}>
                <TouchableOpacity onPress={() => changeVisibilityStatusBar()}>
                  <AntDesign name='closecircle' size={18} color='black' />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={styles.descriptionBox}
            >
              <Text>
                {data.description}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  back: {
    marginTop: 10,
    width: 340,
    alignItems: "flex-start",
  },
  videoContainer: {
    width: 344,
    marginTop: 25,
    backgroundColor: "#f7eeed",
  },
  video: {
    width: 340,
    height: 180,
    left: 2,
  },
  statusOff: {
    width: 340,
    justifyContent: "space-between",
  },
  title: {
    flexDirection: "row",
    width: 340,
    alignItems: "center",
    justifyContent: "space-between",
  },
  vidTitle: { fontWeight: "bold", color: "#F47066" },
  viewCount: {
    width: 340,
    left: 2,
  },
  dropdown: {
    marginLeft: 25,
    marginTop: 20,
  },
  socialIcons: {
    width: 360,
    flexDirection: "row",
    marginTop: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f47066",
    alignItems: "center",
    justifyContent: "space-around",
  },
  like: { left: -8 },
  dislike: { marginLeft: 10, marginTop: 3 },
  share: { marginLeft: 15 },
  shareIcon: { marginLeft: 8 },
  shareText: { paddingTop: 5 },
  save: { marginLeft: 2 },
  saveText: { paddingTop: 5 },
  avatar: {
    width: 340,
    marginTop: 25,
    flexDirection: "row",
  },
  owner: { paddingTop: 15 },
  txtCards: {
    width: 340,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#F47066",
  },
  commentBox: { flexDirection: "row" },
  comment: {
    width: 295,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingLeft: 10,
  },
  commentButton: {
    width: 90,
    height: 50,
    borderRadius: 15,
    marginTop: 2,
  },
  commentCount: {
    width: 340,
    alignItems: "flex-start",
  },
  commentSect: { height: 220 },
  commentsInner: {
    height: 340,
    width: 340,
  },
  comments: {
    width: 295,
    left: 3,
    marginVertical: 10,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#f47066",
    paddingLeft: 5,
  },
  txtUserComment: {
    padding: 10,
    fontSize: 18,
    color: "#fff",
  },
  txtComments: {
    color: "#fff",
    padding: 10,
  },
  hiddenDescription: {
    backgroundColor: "#fff",
    marginTop: 15,
  },
  description: {
    width: 340,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descriptionHead: { fontWeight: 'bold', color: '#F47066', fontSize: 22 },
  descriptionText:{
    maxWidth: 315,
    paddinLeft: 20 
  },
  close:{marginTop:5},
  descriptionBox: { 
    width: 340, 
    marginTop: 25, 
    alignItems: 'flex-start' 
  },
});

export default {Clone}
