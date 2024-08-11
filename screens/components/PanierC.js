import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { panierTtl, selectPanier } from '../../features/panier'
import { useNavigation } from '@react-navigation/native'
import { selectRest } from '../../features/restaurant'

export default function PanierC  ()  {
    const items = useSelector(selectPanier)
    const navigation=useNavigation()
    const total=useSelector(panierTtl)
    if (items.length === 0) return null  
  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity onPress={()=> navigation.navigate("Panier")} className="bg-[#00CCBB] mx-5 p-4 rounded-lg flex-row items-center space-x-1">
        <Text className="text-white font-extrabold text-lg bg-[#01A299] py-1 px-2">{items.length}</Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">Voir Panier</Text>
      <Text className="text-white font-extrabold text-lg text-center">{total} Da</Text>
      </TouchableOpacity>
    </View>
  )
}

 