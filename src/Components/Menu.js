import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'
import { auth, LoadSet, firestore } from '../firebase/config'

export default function Menu({ list, setVids }) {
  const categories = ['Stroke', 'Cardiac', 'Epilepsy', 'CPR', 'Choking', 'Drowning', 'Bleeding', 'Burns']
  const { selectedCategory, setSelectedCategory } = useState(1)

  const SelectEmergency = (index) => {
    return
    setSelectedCategory(index)
    console.log('category clicked')
  }

  return (
    <View>

      {/*----------------------Horizontal Menu----------------------*/}

      <ScrollView style={{ width: 360 }} horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ width: 719, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >

          {categories.map((emergency, index) => (
            <TouchableOpacity key={index} activeOpacity={0.8}
              style={{ height: 30, width: 75, borderRadius: 20, backgroundColor: '#f47066', alignItems: 'center', justifyContent: 'center' }}
              onPress={SelectEmergency(index)}  >

              <View>
                <Text style={{
                  fontSize: 15,
                  //color: '#fff'
                  color: selectedCategory == index ? '#black' : '#fff'
                }}> {emergency}</Text>

                {selectedCategory == index && (<View style={{ height: 3, width: 55, backgroundColor: '#47066', marginTop: 2 }}> </View>)}

              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  menuIcons: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 2,
    ...Platform.select({
      web: {
        color: '#fff'
      }
    })
  },

  menuCard: {
    width: 65,
    height: 65,
    borderRadius: 5,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f96056'
  }

})
