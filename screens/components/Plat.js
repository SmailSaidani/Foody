import { View, Text, TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from '../../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline'
import { useDispatch, useSelector } from 'react-redux'
import { ajouterPanier, EnlvPanier, selectPanier, selectPId } from '../../features/panier'
import panier from '../../features/panier'
export default function Plat  ({id,nom,description,prix,image}) {
    const[isPrs, setPrs]=useState(false)
    const items = useSelector((state) => selectPId(state, id))
      const dispatch =useDispatch()
    const ajouterP= ()=>{
      dispatch(ajouterPanier({id,nom,description,prix,image}))

    }
    const suppP= ()=>{
      if (!items.length >0 ) return;
      dispatch(EnlvPanier({id}))
    
    }
    console.log(items)
  return (
    <>
    <TouchableOpacity onPress={()=> setPrs(!isPrs)} className={`bg-white border p-4 border-gray-200 ${isPrs && "border-b-0"}`}>
      <View className="flex-row">
        <View className="flex-1 pr-2">
        <Text className="text-lg mb-1">{nom}</Text>
        <Text className="text-gray-400">{description}</Text>
        <Text className="text-gray-800">{prix} Da</Text>
        </View>
      <View>
        <Image 
        source={{
            uri : urlFor(image).url()
        }}
        className="h-20 w-20 bg-gray-200 p-4 rounded-full"
        />
      </View>
      </View>

    </TouchableOpacity >

    {isPrs && (
        <View className="bg-white">
            <View className="flex-row space-x-1 items-center">
                <TouchableOpacity disabled={!items.length} onPress={()=> suppP()}>
                    <MinusCircleIcon  size={40} color={items.length > 0 ? "green" : "gray"}/>
                </TouchableOpacity>
                <Text >{items.length}</Text>
                <TouchableOpacity onPress={()=> ajouterP()}>
                    <PlusCircleIcon  size={40} color="green"/>
                </TouchableOpacity>

            </View>
        </View>
    )
    }
    </>
  )
}

