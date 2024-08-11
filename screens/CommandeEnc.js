import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import * as Progress from 'react-native-progress';
export default function CommandeEnc() {
  const navigation = useNavigation()

  useEffect(()=> {
    setTimeout(()=>{
      navigation.navigate("Livraison")
    },4000)
  },[])
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#00CCBB]" >
      <Animatable.Image 
      source={require("../assets/giphy.gif")}
      animation="slideInUp"
      iterationCount={1}
      className="h-100 w-100"
      />
  <Animatable.Text animation="zoomInUp" className="text-lg text-white  font-extrabold">Preparation de la Commande</Animatable.Text>
  <Progress.Circle size={80}  indeterminate={true} color="white"  className="my-5"/>


    </SafeAreaView  >
  )
}