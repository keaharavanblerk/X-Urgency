import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import { Card } from 'react-native-paper'
import { Avatar, Badge } from 'react-native-elements';
import { Socials } from '../../Components/index';
import { auth, firestore } from '../../firebase/config';
import Button from '../../Components/button';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

 const MedProfile = ({ navigation, route }) => {


  const info = route.params.match
  const [About, setAbout] = useState(true);
  const [Qualification, setQualification] = useState(false);
  const [Specialization, setSpecialization] = useState(false);
  const [Contact, setContact] = useState(false);
  const [doctor, setDoctor] = useState("")
  const [email, setEmail] = useState("")
  const [data, setData] = useState(null);
  const [subscription, setSubscription] = useState({ text: "", Func: () => null })

  const getDoctorInfo = () => {
    firestore.collection("Users").doc(/*info*/"XYRltIaLknbfJrvZG4OfyOtGYTz2").collection("cred").doc(/*info*/"XYRltIaLknbfJrvZG4OfyOtGYTz2").get()
      .then(doc => {
        setData(doc.data())
      })

    firestore.collection("Users").doc(/*info*/"XYRltIaLknbfJrvZG4OfyOtGYTz2").get()
      .then(doc => {
        setDoctor(doc.data().username)
        setEmail(doc.data().email)
      })
  }

  const Subscribe = async () => {
    let change = await firestore.collection("Users").doc(/*info*/"XYRltIaLknbfJrvZG4OfyOtGYTz2").collection("cred").doc(/*info*/"XYRltIaLknbfJrvZG4OfyOtGYTz2").get()
      .then(doc => {
        return doc.data().subscribers
      })

    firestore.collection("Users").doc(/*info*/"XYRltIaLknbfJrvZG4OfyOtGYTz2").collection("cred").doc(/*info*/"XYRltIaLknbfJrvZG4OfyOtGYTz2").update({
      subscribers: [...change, auth.currentUser.uid]
    })

    setSubscription({
      Func: unSubscribe,
      text: "unfollow"
    })
  }

  const unSubscribe = async () => {
    let change = await firestore.collection("Users").doc(/*info*/"XYRltIaLknbfJrvZG4OfyOtGYTz2").collection("cred").doc(/*info*/"XYRltIaLknbfJrvZG4OfyOtGYTz2").get()
      .then(doc => {
        return doc.data().subscribers
      })

    change = change.filter(item => item !== auth.currentUser.uid)
    firestore.collection("Users").doc(/*info*/"XYRltIaLknbfJrvZG4OfyOtGYTz2").collection("cred").doc(/*info*/"XYRltIaLknbfJrvZG4OfyOtGYTz2").update({
      subscribers: change
    })

    setSubscription({
      Func: Subscribe,
      text: "follow"
    })
  }

  useEffect(() => {
    getDoctorInfo()
  }, [])

  const [image, setImage] = useState(null)
  const [initial, setInitial] = useState("N")
  const getProfile = async () => {
    let name
    setImage(false)
    name = await firestore.collection("Users").doc(/*info*/"XYRltIaLknbfJrvZG4OfyOtGYTz2").get().then(doc => doc.data().username)
    setInitial(name.substring(0, 1))
  }

  useEffect(() => {
    getProfile()
  }, [])

  useEffect(() => {
    firestore.collection("Users").doc(/*info*/"XYRltIaLknbfJrvZG4OfyOtGYTz2").collection("cred").doc(/*info*/"XYRltIaLknbfJrvZG4OfyOtGYTz2").get()
      .then(doc => {
        let array = []
        array = [...array, doc.data().subscribers]
        let index = array.indexOf(auth.currentUser.uid)
        if (index === -1) {
          setSubscription({
            Func: unSubscribe,
            text: "unfollow"
          })

        } else {
          setSubscription({
            Func: Subscribe,
            text: "follow"
          })
        }
      })
  }, [])

  return (

    <View style={styles.container}>
      <View>
        {
          image ? (
            <Avatar style={styles.avatar} rounded source={{ uri: image, }} size="large" />
          ) : (
            <View style={styles.temp}>
              <Text style={styles.temp_text}> {initial} </Text>
            </View>
          )}
      </View>

      {/*Doctor-Cards---------------Doctor-Cards---------Doctor-Cards */}

      <View style={{ width: 355, marginTop: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', }}>

        <Card style={styles.docCards}>
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <MaterialCommunityIcons name="certificate-outline" size={34} color="#fff" />
            <Text style={{ paddingTop: 10, fontSize: 16, color: '#fff' }}> {`Qualifiation`}</Text>
          </View>
        </Card>

        <Card style={styles.docCards}>
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <MaterialCommunityIcons name="briefcase-clock-outline" size={34} color="#fff" />
            <Text style={{ paddingTop: 10, fontSize: 16, color: '#fff' }}>  {`Experience`} </Text>
          </View>
        </Card>

        <Card style={styles.docCards}>
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <Feather name="award" size={32} color="#fff" />
            <Text style={{ paddingTop: 10, fontSize: 16, color: '#fff' }}>  {`Awards`} </Text>
          </View>
        </Card>

      </View>

      {/*Socials---------------Socials---------Socials---------- */}

      <View style={{ paddingTop: 20, width: 335, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <Socials text="Following" number="15" />
        <Socials text="Followers" number={data.subscribers ? data.subscribers.length : 0} />
        <Socials text="Likes" number="3.1M" />
      </View>

      {/**------------------About--------------About-------------About----------- */}

      <View style={{ marginTop: 35, width: 335 }}>
        <Text style={styles.txtHead}>{`About`}</Text>
        <Text style={styles.txtAbout}>
          {`Neurologists These are specialists in the nervous system, which includes the brain, spinal cord, and nerves. They treat strokes, brain and spinal tumors, epilepsy, Parkinson's disease, and Alzheimer's disease.`}
        </Text>
      </View>

      {/**----------------Contacts---------Contacts------------Contacts----------- */}

      <View style={{ width: 335, marginTop: 35, alignItems: 'center' }}>

        {/*-------------CALL------------CALL---------CALL--------- */}

        <View style={{ width: 220, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Feather name='phone' size={20} color='black' />
          <Text style={{ textAlign: 'center', paddingTop: 2, fontSize: 16, color: '#F47066' }} > {`Call Now`}</Text>
          <Text style={{ paddingTop: 2, fontSize: 16 }}>
            {`(053) 871 2956`}
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={{ paddingTop: 5, textAlign: 'center' }}>{`OR`}</Text>
        </View>

        {/*---------------SMS---------------SMS----------------SMS----- */}

        <View style={{ marginTop: 10, width: 175, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <AntDesign name='mail' size={20} color='black' />
          <Text style={{ paddingLeft: 10, paddingTop: 2, fontSize: 16, color: '#F47066' }} >  {' '} {`SMS`} </Text>
          <Text style={{ paddingLeft: 10, paddingTop: 2, fontSize: 16 }}>
            {`078 454 2123`}
          </Text>
        </View>
      </View>
      {/*--------------BACK------------BACK------------BACK */}

      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>{`BACK`} </Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor: '#fff',
  },
  textTitle: {
    fontFamily: 'Roboto',
    color: '#F47066',
    fontSize: 25,
    marginTop: 5,
  },
  textTitle2: {
    fontSize: 15,
    marginTop: 20,
    marginLeft: 5,
  },
  box: {
    flexDirection: 'row',
  },
  tab: {
    paddingLeft: 5,
    width: 380,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginTop: 80,
    borderBottomWidth: 3,
    borderColor: 'turquoise',
    shadowColor: 'grey',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    elevation: 1,
  },
  words: {
    width: 250,
    textAlign: 'center',
    alignSelf: 'center',
  },
  follow: {
    top: 10,
    backgroundColor: "#f47066",
    width: 70,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  txtHead: {
    fontSize: 30,
    fontFamily: 'flexi-titling',
    color: '#F47066'
  },
  temp: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginTop: 80,
    backgroundColor: 'turquoise',
    textAlign: 'center',
    justifyContent: 'center'
  },
  temp_text: {
    fontSize: 40,
    color: '#fff',
  },
  textTitle: {
    color: 'red',
    fontSize: 25,
    marginTop: 5,
  },
  txtAbout: {
    fontSize: 16,
    paddingTop: 15
  },
  docCards: {
    width: 100,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F47066',
  },

});

export default {MedProfile}

// export default Doctor;