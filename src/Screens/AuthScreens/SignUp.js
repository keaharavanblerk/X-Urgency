/**
 * @description      :
 * @author           : MLab
 * @group            :
 * @created          : 05/10/2021 - 14:22:53
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 05/10/2021
 * - Author          : MLab
 * - Modification    :
 **/

import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native'
import { Card } from 'react-native-paper'
import { FontAwesome, AntDesign, EvilIcons } from '@expo/vector-icons'
import { handleSignUp } from '../../firebase/Auth/HandleSignUp'
import { AlertNote } from '../../Components/Alert'

export default function SignUp({ navigation }) {
  const [username, setUserName] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [ConfirmPassword, setConfirmPassword] = useState(''),
    [displayModal, setDisplayModal] = useState(false),
    [message, setMessage] = useState(''),
    [prompt, setPrompt] = useState(null),
    [prompt1, setPrompt1] = useState(null),
    [prompt2, setPrompt2] = useState(null),
    [prompt3, setPrompt3] = useState(null),
    [prompt4, setPrompt4] = useState(null)

  const Register = () => {
    if (
      username === '' &&
      ConfirmPassword === '' &&
      password === '' &&
      email === ''
    ) {
      setPrompt('Please enter thr requested information')
    } else if (username === '') {
      setPrompt(null)
      setPrompt1('Please enter username')
      setPrompt2(null)
      setPrompt3(null)
      setPrompt4(null)
    } else if (email === '') {
      setPrompt(null)
      setPrompt1(null)
      setPrompt2('Please enter email address')
      setPrompt3(null)
      setPrompt4(null)
    } else if (password === '') {
      setPrompt(null)
      setPrompt1(null)
      setPrompt2(null)
      setPrompt3('Please enter password')
      setPrompt4(null)
    } else if (ConfirmPassword === '') {
      setPrompt(null)
      setPrompt1(null)
      setPrompt2(null)
      setPrompt3(null)
      setPrompt4('Please re-enter password')
    } else {
      handleSignUp(username, email, password, ConfirmPassword, setMessage,)
      navigation.navigate("Home")
      setDisplayModal(true)
    }
  }

  return (

    <View style={styles.container}>

      <View style={{ width: '100%' }}>
        <AlertNote modalVisible={displayModal} setModalVisible={setDisplayModal} msg={message} />

        {/**----------Logo------------Logo------------- */}

        <View style={{ width: '100%' }}>
          <Card style={styles.card}>
            <View style={styles.heartIcon}>
              <FontAwesome name='heartbeat' size={110} color='#fff' />
            </View>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 30 }}> {`X-urgency`} </Text>
          </Card>
        </View>

        {/**----------Header------------Header------------- */}

        <View style={styles.header}>
          <Text style={{ fontSize: 36, textAlign: 'center', color: '#F47066' }}>{`SignUp`}</Text>
        </View>

        {/**----------txtFields------------txtFields------------- */}

        <View style={{ marginTop: 25 }}>
          <ScrollView style={{ height: 385 }} showsVerticalScrollIndicator={false}>

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
                  <AntDesign name='mail' size={16} color='black' style={{ marginTop: 20, marginLeft: 15 }} />
                  <TextInput style={styles.txtEmail} name='email' placeholder='Email' onChangeText={text => setEmail(text)} />
                </View>
              </Card>
              {prompt2 ? <Text style={styles.prompt}>{prompt2}</Text> : null}

              <Card style={styles.txtCards}>
                <View style={{ flexDirection: 'row' }}>
                  <EvilIcons name='lock' size={29} color='black' style={{ margin: 10 }} />
                  <TextInput style={styles.txtField} name='password' placeholder='Password' secureTextEntry={true} onChangeText={text => setPassword(text)} />
                </View>
              </Card>
              {prompt3 ? <Text style={styles.prompt}>{prompt3}</Text> : null}

              <Card style={styles.txtCards}>
                <View style={{ flexDirection: 'row' }}>
                  <EvilIcons name='lock' size={29} color='black' style={{ margin: 10 }} />
                  <TextInput style={styles.txtField} name='confirmPassword' placeholder='Confirm Password' secureTextEntry={true} onChangeText={text => setPassword(text)} />
                </View>
              </Card>
              {prompt4 ? <Text style={styles.prompt}>{prompt4}</Text> : null}
            </View>

            {/**----------btnSignUp------------btnSignUp------------- */}

            <View style={styles.signupView}>
              <TouchableOpacity style={styles.signUp} onPress={Register}>
                <Text style={{ fontSize: 20, color: '#fff' }} > {`SIGNUP`} </Text>
              </TouchableOpacity>

              {/**-------BACK------BACK-------BACK */}

              <View style={{ marginTop: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text>{`BACK`} </Text>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        </View>

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
    justifyContent: 'center',
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
    top: -25,
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
        height: 25,
      }
    })
  },

  txtEmail: {
    marginTop: 12,
    marginLeft: 16,
    fontSize: 18,
    borderRadius: 10,
    ...Platform.select({
      web: {
        outlineColor: '#fff',
        height: 30,
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

  signupView: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  signUp: {
    height: 50,
    width: '60%',
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: '#F47066',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
