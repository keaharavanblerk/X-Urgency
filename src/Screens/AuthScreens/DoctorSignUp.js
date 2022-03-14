import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Platform, Picker, ScrollView } from 'react-native'
import { Card } from 'react-native-paper'
import { FontAwesome, AntDesign, EvilIcons } from '@expo/vector-icons'
import { handleDoctorSignUp } from '../../firebase/Auth/HandleSignUp'
import { AlertNote } from '../../Components/Alert'

export default function DoctorSignUp({ navigation, setDetails }) {
  const [email, setEmail] = useState(''),
    [name, setName] = useState(''),
    [surname, setSurname] = useState(''),
    [contactdetails, setContactDetails] = useState(''),
    [qualification, setQualification] = useState(''),
    [specialization, setSpecialization] = useState(''),
    [branch, setBranch] = useState(''),
    [password, setPassword] = useState(''),
    [description, setDescription] = useState(''),
    [confirmpassword, setConfirmPassword] = useState(''),
    [prompt1, setPrompt1] = useState(null),
    [prompt2, setPrompt2] = useState(null),
    [prompt3, setPrompt3] = useState(null),
    [prompt4, setPrompt4] = useState(null),
    [prompt5, setPrompt5] = useState(null),
    [prompt6, setPrompt6] = useState(null),
    [prompt7, setPrompt7] = useState(null),
    [prompt8, setPrompt8] = useState(null),
    [prompt9, setPrompt9] = useState(null),
    [visibleStatusBar, setVisibleStatusBar] = useState(true)

  const changeVisibilityStatusBar = () => {
    if (name === '') {
      setPrompt1('Please enter name')
      setPrompt2(null)
      setPrompt3(null)
      setPrompt4(null)
      setPrompt5(null)
      setVisibleStatusBar(!visibleStatusBar)
    } else if (surname === '') {
      setPrompt1(null)
      setPrompt2('Please enter surname')
      setPrompt3(null)
      setPrompt4(null)
      setPrompt5(null)
      setVisibleStatusBar(!visibleStatusBar)
    } else if (contactdetails === '') {
      setPrompt1(null)
      setPrompt2(null)
      setPrompt3('Please enter contact details')
      setPrompt4(null)
      setPrompt5(null)
      setVisibleStatusBar(!visibleStatusBar)
    } else if (email === '') {
      setPrompt1(null)
      setPrompt2(null)
      setPrompt3(null)
      setPrompt4('Please enter email address')
      setPrompt5(null)
    } else if (qualification === '') {
      setPrompt1(null)
      setPrompt2(null)
      setPrompt3(null)
      setPrompt4(null)
      setPrompt5('Please enter qualification')
    } else {
      setVisibleStatusBar(!visibleStatusBar)
    }
  }

  const Register = () => {
    if (
      qualification === '' &&
      branch === '' &&
      password === '' &&
      confirmpassword === ''
    ) {
      setPrompt('Please enter thr requested information')
    } else if (description === '') {
      setPrompt6('Please tell us about you')
      setPrompt7(null)
      setPrompt8(null)
      setPrompt9(null)
    } else if (branch === '') {
      setPrompt6(null)
      setPrompt7('Please enter branch name')
      setPrompt8(null)
      setPrompt9(null)
    } else if (password === '') {
      setPrompt6(null)
      setPrompt7(null)
      setPrompt8('Please enter password')
      setPrompt9(null)
    } else if (confirmpassword === '') {
      setPrompt6(null)
      setPrompt7(null)
      setPrompt8(null)
      setPrompt9('Please re-enter password')
    } else {
      handleDoctorSignUp(
        email,
        password,
        name + ' ' + surname,
        qualification,
        specialization,
        branch,
        contactdetails,
        description
      )
    }

    navigation.navigate('DocHome')
  }

  return (

    <View style={styles.container}>
      <View style={{ width: '100%' }}>

        {/**----------Logo------------Logo------------- */}

        <View style={{ width: '100%' }}>
          <Card style={styles.card}>
            <View style={styles.heartIcon}>
              <FontAwesome name='heartbeat' size={110} color='#fff' />
            </View>
            <Text style={{ color: '#fff', fontSize: 30 }}> {' '}{`X-urgency`}{' '}</Text>
          </Card>
        </View>

        {/**----------Header------------Header------------- */}

        <View style={styles.header}>
          <Text style={{ fontSize: 36, textAlign: 'center', color: '#F47066' }} >{`Medical SignUp`}</Text>
        </View>

        {/**----------txtFields------------txtFields------------- */}

        <View style={{ width: '100%', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
          {visibleStatusBar ? (
            <ScrollView style={{ height: 380, width: '100%' }} showsVerticalScrollIndicator={false}  >

              {/*-------------Screen1.1------------Screen1.1-----------Screen1.1---------*/}

              <View style={styles.textfieldCards}>
                <Card style={styles.txtCards}>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.txtField} name='name' placeholder='Name' onChangeText={text => setEmail(text)} />
                  </View>
                </Card>
                {prompt1 ? <Text style={styles.prompt}>{prompt1}</Text> : null}

                <Card style={styles.txtCards}>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.txtField} name='Surname' placeholder='Surname' onChangeText={text => setSurname(text)} />
                  </View>
                </Card>
                {prompt2 ? <Text style={styles.prompt}>{prompt2}</Text> : null}

                <Card style={styles.txtCards}>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.txtField} name='ContactDetails' placeholder='Contact Details' onChangeText={text => setContactDetails(text)} />
                  </View>
                </Card>
                {prompt3 ? <Text style={styles.prompt}>{prompt3}</Text> : null}

                <Card style={styles.txtCards}>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.txtField} name='email' placeholder='Email' onChangeText={text => setEmail(text)} />
                  </View>
                </Card>
                {prompt4 ? <Text style={styles.prompt}>{prompt4}</Text> : null}

                <Card style={styles.txtCards}>
                  <Picker specialization={specialization} style={styles.picker} onValueChange={(itemValue, itemIndex) => setSpecialization(itemValue)} >
                    <Picker.Item label='Doctor' value='Doctor' />
                    <Picker.Item label='Nurse' value='Nurse' />
                    <Picker.Item
                      label='Basic Abulance Assistance'
                      value='BEA' />
                    <Picker.Item
                      label='Ambulance Emergency Assistance'
                      value='AEA' />
                    <Picker.Item label='Critical Care Assist' value='CCA' />
                    <Picker.Item
                      label='Emergency Care Practitioner'
                      value='ECP' />
                  </Picker>
                </Card>

                <Card style={styles.txtCards}>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.txtField} name='Qualification' placeholder='Qualification' onChangeText={text => setQualification(text)} />
                  </View>
                </Card>
                {prompt5 ? <Text style={styles.prompt}>{prompt5}</Text> : null}

                <View style={{ width: '100%', alignItems: 'center' }}>
                  <TouchableOpacity style={styles.signIn} onPress={changeVisibilityStatusBar} >
                    <Text style={{ fontSize: 20, color: '#fff' }}  >  {`NEXT`} </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          ) : (
            <ScrollView
              style={{ height: 380, width: '100%' }}
              showsVerticalScrollIndicator={false}>

              {/*-------------Screen1.2------------Screen1.2-----------Screen1.2---------*/}

              <View style={styles.textfieldCards}>
                <Card style={styles.txtCards}>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.txtField} name='Description' placeholder='Description' onChangeText={text => setDescription(text)} />
                  </View>
                </Card>

                <Card style={styles.txtCards}>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.txtField} name='Branch' placeholder='Branch' onChangeText={text => setBranch(text)} />
                  </View>
                </Card>

                <Card style={styles.txtCards}>
                  <TextInput style={styles.txtField} name='password' placeholder='Password' secureTextEntry={true} onChangeText={text => setPassword(text)} />

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

              <View style={{ width: '100%', alignItems: 'center' }}>
                <TouchableOpacity style={styles.btnNxt} onPress={Register}>
                  <Text style={{ fontSize: 20, color: '#fff' }}  >  {`SIGNIN`} </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>

        {/**-------BACK------BACK-------BACK */}

        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>{' BACK '}</Text>
          </TouchableOpacity>
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
    top: -20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  txtField: {
    marginTop: 14,
    marginLeft: 16,
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

  picker: {
    width: '95%',
    height: 50,
    borderRadius: 10,
    marginLeft: 11,
    fontSize: 18,
    borderWidth: 0,
    opacity: 0.8
  },

  btnNxt: {
    height: 50,
    width: '60%',
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: '#F47066',
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
