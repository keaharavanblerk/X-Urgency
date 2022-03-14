/**
 * @description      :
 * @author           : MLab
 * @group            :
 * @created          : 07/10/2021 - 10:07:05
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 07/10/2021
 * - Author          : MLab
 * - Modification    :
 **/

import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native'
import { Card } from 'react-native-paper'
import { FontAwesome, AntDesign, EvilIcons } from '@expo/vector-icons'
import { handleSignIn } from '../../firebase/Auth/HandleSignIn'
import { AlertNote } from '../../Components'

export default function MedSignIn({ navigation }) {
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [displayModal, setDisplaModal] = useState(false),
    [message, setMessage] = useState(''),
    [prompt, setPrompt] = useState(null),
    [prompt1, setPrompt1] = useState(null),
    [prompt2, setPrompt2] = useState(null)

  const Login = (setDone, setMessage) => {
    if (email === '' && password === '') {
      setPrompt('Please enter thr requested information')
    } else if (email === '') {
      setPrompt(null)
      setPrompt1('Please enter email address')
      setPrompt2(null)
    } else if (password === '') {
      setPrompt(null)
      setPrompt1(null)
      setPrompt2('Please enter password')
    } else {
      handleSignIn(email, password)
      setDisplaModal(true)
    }

    navigation.navigate('DocHome')
  }

  return (
    <View style={styles.container}>

      <View style={{ width: '100%' }}>
        <AlertNote modalVisible={displayModal} setModalVisible={setDisplaModal} msg={message} />

        {/**----------Logo------------Logo------------- */}

        <View>
          <Card style={styles.card}>
            <View style={styles.heartIcon}>
              <FontAwesome name='heartbeat' size={110} color='#fff' />
            </View>
            <Text style={{ color: '#fff', fontSize: 30 }}> {`X-urgency`} </Text>
          </Card>
        </View>

        {/**----------Header------------Header------------- */}

        <View style={styles.header}>
          <Text style={{ fontSize: 36, textAlign: 'center', color: '#F47066' }} >{`Medical SignIn`}</Text>
        </View>

        {/**----------txtFields------------txtFields------------- */}

        <View style={styles.textfieldCards}>
          {prompt ? <Text style={styles.prompt}>{prompt}</Text> : null}

          <Card style={styles.txtCards}>
            <View style={{ flexDirection: 'row' }}>
              <AntDesign name='user' size={20} color='black' style={{ margin: 13 }} />
              <TextInput style={styles.txtField} name='username' placeholder='Username' onChangeText={text => setEmail(text)} />
            </View>
          </Card>
          {prompt1 ? <Text style={styles.prompt}>{prompt1}</Text> : null}

          <Card style={styles.txtCards}>
            <View style={{ flexDirection: 'row' }}>
              <EvilIcons name='lock' size={29} color='black' style={{ margin: 10 }} />
              <TextInput style={styles.txtField} name='password' placeholder='Password' secureTextEntry={true} onChangeText={text => setPassword(text)} />
            </View>
          </Card>
          {prompt2 ? <Text style={styles.prompt}>{prompt2}</Text> : null}
        </View>

        {/**----------ResetPassword------------ResetPassword------------- */}

        <View style={styles.reset}>
          <TouchableOpacity onPress={() => { navigation.navigate('ForgotPassword') }} >
            <Text style={{ paddingTop: 20, fontSize: 18, color: '#F47066' }}>  {`Forgot Password?`}{' '}  </Text>
          </TouchableOpacity>
        </View>

        {/**----------btnLogIn------------btnLogIn------------- */}

        <View style={styles.loginView}>
          <TouchableOpacity style={styles.signIn} onPress={Login}>
            <Text style={{ fontSize: 20, color: '#fff' }}>{`LOGIN`} </Text>
          </TouchableOpacity>
        </View>

        {/*----------------------New User--------------New User------ */}

        <View style={styles.newUser}>
          <Text style={{ paddingTop: 10, textAlign: 'center', color: 'grey', fontSize: 14 }}> {' '} {`New User?`} </Text>

          <TouchableOpacity onPress={() => { navigation.navigate('DoctorSignUp') }}
            style={{ left: 5 }}>
            <Text style={{ paddingTop: 4, fontSize: 20, color: '#F47066' }}>  {`SignUp`} </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{ marginVertical: 20 }} onPress={() => navigation.goBack()} >
          <Text style={{ textAlign: 'center' }}>{`BACK`}</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  card: {
    width: '100%',
    height: 220,
    backgroundColor: '#F47066',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  heartIcon: {
    marginTop: 55,
    alignItems: 'center'
  },

  header: {
    marginTop: 20
  },

  textfieldCards: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  txtField: {
    marginTop: 14,
    fontSize: 18,
    borderRadius: 10,
    ...Platform.select({
      web: {
        outlineColor: '#fff',
        height: 25
      }
    })
  },

  prompt: {
    color: '#F47066',
    textAlign: 'center'
  },

  txtCards: {
    width: '95%',
    height: 50,
    borderRadius: 10,
    marginTop: 35,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#F47066'
  },

  reset: {
    width: '97%',
    alignItems: 'flex-end'
  },

  loginView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  newUser: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  signIn: {
    height: 50,
    width: '60%',
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: '#F47066',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
