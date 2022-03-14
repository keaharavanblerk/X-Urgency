/**
 * @description      :
 * @author           : TLeeuw
 * @group            :
 * @created          : 08/11/2021 - 10:11:41
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 08/11/2021
 * - Author          : TLeeuw
 * - Modification    :
 **/

import React, { useState, useRef } from "react";
import { StyleSheet, Picker, Text, TouchableOpacity, View, TextInput, Pressable, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import { UploadVideo } from "../../firebase/Storage/Storage.functions";
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { Video } from "expo-av";
import { AlertNote } from '../../Components'

// const btoa = require("btoa")
// const atob = require("atob")

export default function Upload({ Log, Navigate }) {

  const ref = useRef(null);
  const [status, setStatus] = useState({});
  const [alert, setAlert] = useState(false)
  const [selectedValue, setSelectedValue] = useState("stroke"),
    [title, setTitle] = useState(),
    [description, setDescription] = useState(),
    [selectedImage, setSelectedImage] = useState(null),

    openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Videos',
        videoMaxDuration: 7,
        allowsEditing: true
      });

      if (pickerResult.duration > 30000) {
        setAlert(true)
        return
      }
      if (pickerResult.cancelled === true) {
        return;
      }

      // console.log(atob(pickerResult.duration))
      setSelectedImage({ localUri: pickerResult.uri });
    },

    Run = () => {
      selectedImage ? (UploadVideo(
        selectedImage.localUri,
        title,
        description,
        selectedValue,
        Log
      ),
        Navigate(0),
        alert('Uploaded Video')
      ) : (null)

    },

    openCamera = async () => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true
      });
      if (!result.cancelled) {
        setSelectedImage({ localUri: result.uri })
      }
    }

  return (

    <View style={styles.container}>

      <AlertNote modalVisible={alert} setModalVisible={setAlert} msg="This video is too long" />

      <Text style={styles.header}>Upload Or Create Your First Aid Video Here</Text>

      <ScrollView>

        <View style={{ flexDirection: "row" }}>
          <TextInput style={styles.txtField} name="username" placeholder="Title" onChangeText={text => setTitle(text)} />
        </View>

        <View>
          <Picker
            selectedValue={selectedValue}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} >
            <Picker.Item label="Stroke" value="Stroke" />
            <Picker.Item label="Heart-Attack" value="Heart-Attack" />
            <Picker.Item label="Epilepsy" value="Epilepsy" />
            <Picker.Item label="CPR" value="CPR" />
            <Picker.Item label="Drowning" value="Drowning" />
            <Picker.Item label="Choking" value="Choking" />
            <Picker.Item label="Java" value="Java" />
            <Picker.Item label="Burns" value="Burns" />
          </Picker>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TextInput style={styles.txtField} name="password" placeholder="Description" onChangeText={text => setDescription(text)} />
        </View>

        {selectedImage ? (
          <Video ref={ref} source={{ uri: selectedImage.localUri }} resizeMode="stretch" isLooping onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            style={{ width: 380, height: 220, marginTop: 5, alignSelf: "center", }} />

        ) : (

          <Pressable onPress={openImagePickerAsync} style={{ flexDirection: 'row' }}>
            <Card style={styles.txtUser}>
              <View>
                <Text style={{ fontSize: 16, paddingTop: -300, marginLeft: -20, marginTop: 30, color: 'lightgray' }}>Upload Video Here!</Text>
              </View>
              <Icon style={styles.icon} name="slideshow" color="#F47066" size={40} />
            </Card>
          </Pressable>
        )}

        <TouchableOpacity onPress={() => { navigation.navigate('uploadVideo') }}>
          <View style={styles.iconContainer}>
            <Icon name="camera" color='white' size={30} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={Run} style={styles.button}>
          <Text style={styles.buttonText}>Upload Video</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  header: {
    paddingTop: 100,
    fontSize: 25,
    textAlign: "center",
    color: "#F47066",
    fontWeight: "bold",
    marginBottom: 30,
  },

  txtField: {
    width: 330,
    height: 60,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: "#F47066",
    marginBottom: 20,
    fontSize: 16,
  },

  txtUser: {
    width: 330,
    height: 200,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingLeft: 100,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#F47066",
  },

  icon: {
    marginTop: 30,
    marginLeft: 40,
  },

  paragraph: {
    marginBottom: 350,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F96056',
  },

  input1: {
    width: 280,
    height: 40,
    borderRadius: 10,
    marginTop: -280,
    marginLeft: 17,
    padding: 20,
    fontSize: 16,
    borderColor: '#F96056',
    borderWidth: 1,
    //outlineColor: 'transparent',
  },

  input2: {
    width: 280,
    height: 40,
    borderRadius: 10,
    marginTop: -220,
    marginLeft: 17,
    padding: 20,
    fontSize: 16,
    borderColor: '#F96056',
    borderWidth: 1,
    //outlineColor: 'transparent',
  },

  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#F47066',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 3,
    marginTop: 40,
    marginLeft: -8,
  },

  picker: {
    width: 330,
    height: 60,
    margin: 10,
    borderRadius: 10,
    borderColor: "#F47066",
    paddingLeft: 20,
  },

  button: {
    backgroundColor: '#F47066',
    padding: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "white",
    marginRight: 20,
    height: 50,
    marginTop: 40,
  },

  buttonText: {
    fontSize: 20,
    color: '#fff',
    marginTop: -5,
  },

});
