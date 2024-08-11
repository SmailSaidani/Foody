import { View, Text,SafeAreaView,TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRest } from '../features/restaurant'
import { CircleStackIcon, HomeIcon, HomeModernIcon, XCircleIcon } from 'react-native-heroicons/outline'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { urlFor } from '../sanity';
import { EnlvPanier } from '../features/panier';
import { panierTtl, selectPanier } from '../features/panier';
import { useDispatch } from 'react-redux';
import { useState,useEffect,useRef } from 'react'
import { shareAsync } from 'expo-sharing';

export default function Livraison() {
  const componentRef = useRef();





const navigation = useNavigation();


    const navigate=useNavigation()
    const restaurant=useSelector(selectRest);
    const items=useSelector(selectPanier)
    const dispatch=useDispatch()
    const [git, setGitems]=useState([])
    console.log("aaaaaaa",useSelector(selectRest))
    const sttl=useSelector(panierTtl)
    useEffect(()=>{
        const gItems= items.reduce((results,item)=> {
            (results[item.id]=results[item.id] || []).push(item);
            return results
        },{})
        setGitems(gItems)
    },[items])
  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
            <View className="flex-row justify-between my-5 items-center p-5">
                <TouchableOpacity onPress={()=>  navigate.navigate("Home")} >
                    <XCircleIcon  size={40} color="black" />
                </TouchableOpacity>
                <Text className="font-light text-white text-lg">Help</Text>
            </View>


            <View className="bg-white  mx-5 my-2 rounded-md p-6 z-50 shadow-md">
              <View className="flex-row justify-between">
              <View >
                    <Text className="text-lg text-gray-400">
                        Temps Estime
                    </Text>
                    <Text className="text-4xl font-bold">50 Minutes</Text>
                </View>
                        <Animatable.Image
            source={require("../assets/giphy.gif")}
            animation="slideInUp"
            iterationCount={1}
            className="h-20 w-20"
            />
              </View>
              <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />

              <Text className="mt-3 text-gray-400">
                Votre Commande Chez {restaurant.title} est en cours de Preparation
              </Text>
            </View>
      </SafeAreaView>
      <View className="bg-white" ref={componentRef}>
      <View className="flex-row items-center space-x-4 px-4 py-4  bg-white my-5">
                <Image source={{
                    uri : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                }}
                className="h-10 w-10 bg-gray-200 p-4 rounded-full"
                />

                <Text className="flex-1">Livraison dans 50-60 min</Text>

            </View>

            <ScrollView className="divide-y divide-gray-200">
                {Object.entries(git).map(([key,item]) => (
                    <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                        <Text>{item.length}x</Text>

                        <Image
                        source={{uri : urlFor(item[0]?.image).url() }}
                        className="h-12 w-12 rounded-full"

                        />
                        <Text className="flex-1">{item[0]?.nom}</Text>

                        <Text className="text-gray-500">
                            {item[0]?.prix} Da
                        </Text>


                    </View>

                ))}
            </ScrollView>



            <View className="p-5 bg-white space-y-4">
                <View className="flex-row justify-between">
                    <Text className="text-gray-400">Sous-Total</Text>
                    <Text className="text-gray-400">{sttl} Da</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-400">Livraison</Text>
                    <Text className="text-gray-400">400 Da</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-black-400">Total</Text>
                    <Text className="font-extrabold">{sttl+400} Da</Text>
                </View>

                <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} className="rounded-lg bg-[#00CCBB] p-4">
                    <Text className="text-center text-white text-lg font-bold">Retour a L'ecran D'acceuil</Text>
                </TouchableOpacity>

            </View>

            </View>

    </View>
  )
}