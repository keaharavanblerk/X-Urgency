import React, { useState, useRef, useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Dimensions, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera'
import { Video } from 'expo-av'

const WINDOW_HEIGHT = Dimensions.get('window').height

const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032)
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09)

export default function UploadVideo({ Navigate }) {
  const [visible, setVisible] = useState(false)
  const [hasPermission, setHasPermission] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [isPreview, setIsPreview] = useState(false)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [isVideoRecording, setIsVideoRecording] = useState(false)
  const [videoSource, setVideoSource] = useState(null)
  const cameraRef = useRef()
  const ref = useRef(null)
  const [status, setStatus] = useState({})
  const [selectedValue, setSelectedValue] = useState('stroke'),
    [title, setTitle] = useState(),
    [description, setDescpription] = useState(),

    //--------Open Image-Picker-------Open Image-Picker---------

    openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()

      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!')
        return
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Videos'
      })
      if (pickerResult.cancelled === true) {
        return
      }

      setSelectedImage({ localUri: pickerResult.uri })
    },

    //-----???????----------???????----------

    Run = () => { openImagePickerAsync(); selectedImage ? (UploadVideo(selectedImage.localUri, title, description, selectedValue, Log), Navigate(0)) : null },

    //-------Opening Camera---------Opening Camera---------

    openCamera = async () => {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true
      })
      if (!result.cancelled) {
        setSelectedImage({ localUri: result.uri })
      }
    }

  //-------Granting to Open Camera on first run----------

  useEffect(() => {
    ; (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  //--------Setting Camera to open---------

  const onCameraReady = () => {
    setIsCameraReady(true)
  }

  //--------Recording Video-------Recording Video----------

  const recordVideo = async () => {
    if (cameraRef.current) {
      try {
        const videoRecordPromise = cameraRef.current.recordAsync()

        if (videoRecordPromise) {
          setIsVideoRecording(true)
          const data = await videoRecordPromise
          const source = data.uri
          if (source) {
            setIsPreview(true)
            console.log('video source', source)
            setVideoSource(source)
          }
        }
      } catch (error) {
        console.warn(error)
      }
    }
  }

  //-------Stoping Video-Record-------Stoping Video-Record------

  const stopVideoRecording = () => {
    if (cameraRef.current) {
      setIsPreview(false)
      setIsVideoRecording(false)
      cameraRef.current.stopRecording()
    }
  }

  //------Switching Camera from Back-to-Front/Front-to-Back-----

  const switchCamera = () => {
    if (isPreview) {
      return
    }
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    )
  }

  //--------Canceling Preview--------Canceling Preview------

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview()
    setIsPreview(false)
    setVideoSource(null)
  }

  const renderCancelPreviewButton = () => (
    <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
      <View style={[styles.closeCross, { transform: [{ rotate: '45deg' }] }]} />
      <View style={[styles.closeCross, { transform: [{ rotate: '-45deg' }] }]} />
    </TouchableOpacity>
  )

  const renderVideoPlayer = () => (
    <Video source={{ uri: videoSource }} shouldPlay={true} style={styles.media} />
  )

  const renderVideoRecordIndicator = () => (
    <View style={styles.recordIndicatorContainer}>
      <View style={styles.recordDot} />
      <Text style={styles.recordTitle}>{'Recording...'}</Text>
    </View>
  )

  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        <Text style={styles.text}>{'Flip'}</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} disabled={!isCameraReady} onLongPress={recordVideo} onPressOut={stopVideoRecording} onPress={takePicture} style={styles.capture} />
    </View>
  )

  const [selectedImage, setSelectedImage] = useState(null)

  //------Camera Permission (NULL)-----Permission(NULL)-----------

  return (
    hasPermission === null ? (
      <View />
    ) : (hasPermission === false ? (
      <View>
        <Text style={styles.text}>No access to camera!</Text>

        <Text style={styles.instructions}>
          To upload a Video from your phone, just press the button below!
        </Text>

        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: 'https://th.bing.com/th/id/OIP.cEbsQkks2CN7pkPbOsForAHaHa?w=205&h=205&c=7&r=0&o=5&pid=1.7' }} style={styles.logo} />
        </View>

        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <TouchableOpacity onPress={Run} style={styles.button1} >
            <Text style={styles.buttonText}>Pick a video</Text>
          </TouchableOpacity>
        </View>

      </View>
    ) : (selectedImage !== null ? (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
        <TouchableOpacity onPress={() => { Upload(selectedImage.localUri) }} style={styles.button} >
          <Text style={styles.buttonText}>Share This Photo</Text>
        </TouchableOpacity>
      </View>

    ) : (

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <SafeAreaView>
            {!visible ? (
              <SafeAreaView //style={styles.container}
              >
                <Text style={styles.instructions}>
                  {`To upload a Video from your phone, open camera.`}
                </Text>

                <View style={{ alignItems: 'center' }}>
                  <Image source={{ uri: 'https://th.bing.com/th/id/OIP.cEbsQkks2CN7pkPbOsForAHaHa?w=205&h=205&c=7&r=0&o=5&pid=1.7' }} style={styles.logo} />
                </View>

                <TouchableOpacity style={styles.button1} onPress={() => { setVisible(!visible) }} >
                  <Text>{`Open Camera`}</Text>
                </TouchableOpacity>
              </SafeAreaView>

            ) : (

              <View>
                <SafeAreaView //style={styles.container}
                >
                  <Camera ref={cameraRef} style={styles.contain} type={cameraType} flashMode={Camera.Constants.FlashMode.on} onCameraReady={onCameraReady} onMountError={error => { console.log('cammera error', error) }} />

                  <View style={styles.contain}>
                    {isVideoRecording && renderVideoRecordIndicator()}
                    {videoSource && renderVideoPlayer()}
                    {isPreview && renderCancelPreviewButton()}
                    {!videoSource && !isPreview && renderCaptureControl()}
                  </View>

                  <View style={{ width: 380, marginTop: 400, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >

                    <TouchableOpacity onPress={() => { setVisible(!visible) }} >
                      <Text>{`Close`}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setVisible(!visible) }} >
                      <Text>{Record}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setVisible(!visible) }}  >
                      <Text>{Record}</Text>
                    </TouchableOpacity>
                  </View>

                </SafeAreaView>
              </View>
            )}
          </SafeAreaView>
        </View>
      </ScrollView>

    ))))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  imgContainer: {
    alignItems: 'center'
  },

  instructions: {
    textAlign: 'center',
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    paddingTop: 35,
    fontFamily: 'Roboto'
  },

  thumbnail: {
    width: 300,
    height: 300,
    marginTop: 100,
    resizeMode: 'contain',
  },

  logo: {
    width: 270,
    height: 270,
    marginTop: 20
  },

  button1: {
    backgroundColor: '#F47066',
    padding: 20,
    marginTop: 30,
    borderRadius: 5
  },

  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Roboto'
  },

  contain: {
    flex: 1,
    alignItems: 'center'
  },

  closeButton: {
    position: 'absolute',
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4c5c4',
    opacity: 0.7,
    zIndex: 2
  },

  media: {
    ...StyleSheet.absoluteFillObject
  },

  closeCross: {
    width: '68%',
    height: 1,
    backgroundColor: 'black'
  },

  control: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 38,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  capture: {
    backgroundColor: '#f5f6f5',
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31
  },

  recordIndicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    opacity: 0.7
  },

  recordTitle: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center'
  },

  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: '#ff0000',
    marginHorizontal: 5
  },

  text: {
    textAlign: 'center',
    fontSize: 24,
    color: 'red',
    fontFamily: 'Roboto'
  }

})
