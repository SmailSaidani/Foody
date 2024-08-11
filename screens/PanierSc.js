import { View, Text,SafeAreaView,TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRest } from '../features/restaurant';
import { panierTtl, selectPanier } from '../features/panier';
import { useState } from 'react';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';
import { EnlvPanier } from '../features/panier';
export default function PanierSc  ()  {
    const navigation = useNavigation();
    const restaurant=useSelector(selectRest)
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
    <SafeAreaView className="mt-20 flex-1 bg-white" >
        <View className="flex-1 bg-gray-100" >
            <View className="p-5 border-b border-[#0fba65] bg-white shadow-xs">
                <View className="pt-5">
                    <Text className="text-lg font-bold text-center">Panier</Text>
                    <Text className="text-center text-gray-400" >{restaurant.title}</Text>

                </View>
                <TouchableOpacity onPress={()=>  navigation.goBack()}  className="absolute 0 pt-2 rounded-full right-4 ">
                    <XCircleIcon  size={50} color="#0fba65" bg-white shadow-xs />
                </TouchableOpacity>
            </View>


            <View className="flex-row items-center space-x-4 px-4 py-4  bg-white my-5">
                <Image source={{
                    uri : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                }}
                className="h-10 w-10 bg-gray-200 p-4 rounded-full"
                />

                <Text className="flex-1">Livraison dans 50-60 min</Text>
                <TouchableOpacity>
                    <Text className="text-[#0fba65]">Changer</Text>
                </TouchableOpacity>
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

                        <TouchableOpacity>
                            <Text 
                            className="text-[#0fba65] text-lr" 
                            onPress={()=> dispatch(EnlvPanier({id : key}))}
                            >Remove </Text>
                        </TouchableOpacity>
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

                <TouchableOpacity onPress={()=>navigation.navigate('CommandeEnc')} className="rounded-lg bg-[#00CCBB] p-4">
                    <Text className="text-center text-white text-lg font-bold">Confirmer Commande</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>

  )
}

