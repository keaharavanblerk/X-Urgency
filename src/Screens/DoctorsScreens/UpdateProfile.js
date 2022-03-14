import React, { useState, useEffect } from "react"
import { View, StyleSheet, TextInput, Pressable, Text, ScrollView, Image } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { auth, firestore, storage } from '../../firebase/config'
import { DisplayPicture, LargeInput } from '../../Components'
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-elements';
import { v4 as uuidv4 } from 'uuid'
import firebase from 'firebase'

var atob = require('atob')

function UpdateProfile() {

    //Copies for testing
    const [uid, setID] = useState(null)

    //Main Running
    const [about, setAbout] = useState("")
    const [qualification, setQualification] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [branch, setBranch] = useState("")
    const [contact, setContact] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState(null)
    const [initial, setInitial] = useState('')

    //----------Get Profile----------Get Profile----------Get Profile----------Get Profile----------

    const getProfile = async () => {
        let name
        auth.currentUser.photoURL ? setImage(await auth.currentUser.photoURL) : console.log(auth.currentUser.photoURL)
        name = auth.currentUser.displayName
        setInitial(name.substring(0, 1))
    }

    //----------Get Credentials----------Get Credentials----------Get Credentials----------Get Credentials

    const getCred = () => {
        firestore.collection("Users").doc(uid).collection("cred").doc(uid).get()
        firestore.collection("Users").doc(auth.currentUser.uid).collection("cred").doc(auth.currentUser.uid).get()
            .then(doc => {
                setAbout(doc.data().about)
                setBranch(doc.data().branch)
                setContact(doc.data().contact)
                setEmail(auth.currentUser.email)
                setQualification(doc.data().qualification)
                setSpecialization(doc.data().specialization)
            })
    }

    //---------------Updating Crendtials-------------Updating Crendtials-----------

    const resetCred = async () => {
        let document = firestore.collection("Users").doc(auth.currentUser.uid).collection("cred").doc(auth.currentUser.uid).get().then(doc => doc.data())

        if (image) {

            if (auth.currentUser.photoURL) {
                null
            } else {
                try {

                    //------------Delete IMG.jpeg------------Delete IMG.jpeg------------Delete IMG.jpeg------------

                    storage.ref().child(`/Display Pictures/${auth.currentUser.uid}.jpeg`).delete()
                } catch (err) {
                    try {

                        //------------Delete IMG.jpg------------Delete IMG.jpg------------Delete IMG.jpg------------

                        storage.ref().child(`/Display Pictures/${auth.currentUser.uid}.jpg`).delete()
                    } catch (err) {
                        try {

                            //------------Delete IMG.png------------Delete IMG.png------------Delete IMG.png------------

                            storage.ref().child(`/Display Pictures/${auth.currentUser.uid}.png`).delete()
                        } catch (err) {
                            null
                        }
                    }
                }
            }

            var byteString = atob(image.split(',')[1])
            var MIMEstring = image.split(',')[0].split(':')[1].split(';')[0]

            var ab = new ArrayBuffer(byteString.length)
            var ia = new Uint8Array(ab)
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i)
            }

            var bb = new Blob([ab], { type: MIMEstring })
            var upload = storage.ref().child(`/Display Pictures/${auth.currentUser.uid}.${bb.type.split('/')[1]}`).put(bb)

            await upload.on('state_changed',
                async snapshot => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            // console.log("Task paused")
                            break
                        case firebase.storage.TaskState.RUNNING:
                            // console.log("Task running")
                            break
                    }
                },
                err => {
                    console.log(err)
                })

            let ref = await storage.ref()
            let photoURL
            try {
                photoURL = await ref.child(`Display Pictures/${auth.currentUser.uid}.${bb.type.split('/')[1]}`).getDownloadURL()
                    .then(url => url)
            } catch (err) {
                console.log(err)
            }
            console.log(photoURL)
            auth.currentUser.updateProfile({
                photoURL: photoURL
            })

            console.log(auth.currentUser.photoURL)

        }
        if (document.about !== about) firestore.collection("Users").doc(auth.currentUser.uid).collection("cred").doc(auth.currentUser.uid).update({ about: about })
        if (document.qualification !== qualification) firestore.collection("Users").doc(auth.currentUser.uid).collection("cred").doc(auth.currentUser.uid).update({ qualification: qualification })
        if (document.specialization !== specialization) firestore.collection("Users").doc(auth.currentUser.uid).collection("cred").doc(auth.currentUser.uid).update({ specialization: specialization })
        if (document.branch !== branch) firestore.collection("Users").doc(auth.currentUser.uid).collection("cred").doc(auth.currentUser.uid).update({ branch: branch })
        if (document.contact !== contact) firestore.collection("Users").doc(auth.currentUser.uid).collection("cred").doc(auth.currentUser.uid).update({ contact: contact })
        if (document.email !== email) auth.currentUser.updateEmail(email)
    }

    //------------------Opening Image Picker------------------Opening Image Picker

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({ mediaTypes: 'Images' });
        if (pickerResult.cancelled === true) {
            return;
        }
        setImage(pickerResult.uri);
    }

    useEffect(() => {
        uid ? getCred() : null
    }, [uid])

    useEffect(() => {
        uid ? getProfile() : null
    }, [])

    useEffect(() => {
        auth.signInWithEmailAndPassword("yomzi123@gmail.com", "Asstastic")
    }, [])

    useEffect(() => {
        auth.onAuthStateChanged(doc => {
            setID(doc.uid)
            setImage(doc.photoURL)
        })
    }, [])
    return (
            <ScrollView contentContainerStyle={styles.body} vertical={true} >
                <Pressable onPress={openImagePickerAsync}>
                    {image ? (
                        <Image style={styles.image} source={{ uri: image }} />
                    ) : (
                        <View style={styles.temp}>
                            <Text style={styles.temp_text}> {initial} </Text>
                        </View>
                    )}
                    <Feather name="edit" size={24} color="#F47066" style={{ left: 120, top: -20 }} />
                </Pressable>

                <TextInput style={styles.inputLarge} placeholder="Tell us about yourself" multiline maxLength={480} editable defaultValue={about} onChangeText={text => setAbout(text)} />
                <TextInput placeholder="Qualification" style={styles.input} editable defaultValue={qualification} onChangeText={text => setQualification(text)} />
                <TextInput placeholder="Specialization" style={styles.input} editable defaultValue={specialization} onChangeText={text => setSpecialization(text)} />
                <TextInput placeholder="Branch" style={styles.input} editable defaultValue={branch} onChangeText={text => setBranch(text)} />
                <TextInput placeholder="Contact number" style={styles.input} editable defaultValue={contact} onChangeText={text => setContact(text)} />
                <TextInput placeholder="Email" style={styles.input} editable defaultValue={email} onChangeText={text => setEmail(text)} />

                <Pressable style={styles.button} onPress={resetCred}>
                    <Text style={{ fontSize: 18, color: '#fff' }}>Save</Text>
                </Pressable>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        // flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    button: {
        height: 50,
        width: 200,
        marginTop: 40,
        borderRadius: 10,
        backgroundColor: '#F47066',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },

    input: {
        width: 300,
        height: 50,
        borderRadius: 10,
        marginLeft: 2,
        marginTop: 35,
        paddingTop: 5,
        borderWidth: 1,
        borderColor: '#F47066',
        paddingLeft: 25
    },

    inputLarge: {
        width: 300,
        height: 250,
        borderRadius: 10,
        marginLeft: 2,
        marginTop: 35,
        paddingTop: 5,
        borderWidth: 1,
        borderColor: '#F47066',
        paddingLeft: 25,
        paddingTop: 25,
        textAlignVertical: 'top'
    },

    avatar: {
        borderRadius: 50,
        marginTop: 80,
        borderBottomWidth: 3,
        borderColor: 'turquoise',
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        elevation: 1,
    },

    image: {
        width: 150,
        height: 150,
        borderRadius: 80,
        marginTop: 80,
    },

    temp: {
        width: 150,
        height: 150,
        borderRadius: 80,
        marginTop: 80,
        backgroundColor: 'turquoise',
        textAlign: 'center',
        alignItems: "center",
        justifyContent: 'center'
    },

    temp_text: {
        fontSize: 40,
        color: '#fff',
    }
})

export default {UpdateProfile}