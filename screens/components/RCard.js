import { View, Text,Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MapIcon, PlusCircleIcon, PlusIcon, StarIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../../sanity'
import { useNavigation } from '@react-navigation/native'
const RCard = ({
    id,
    img,
    title,
    rating,
    genre,
    address,
    desc,
    dishes,
    long,
    lat
}) => {
  const navigation=useNavigation()
  return (
    <TouchableOpacity className="bg-white mr-3 pb-10 shadow rounded-md"
    onPress={()=>{
      navigation.navigate('Restaurant',{
        id,
    img,
    title,
    rating,
    genre,
    address,
    desc,
    dishes,
    long,
    lat
      })

    }}
    >
      <Image
      source={{
        uri : urlFor(img).url()
      }}

      className="h-60 w-64 rounded-md mx-2 my-2" />
      <View className="flex-row">

      <View className="px-3 pb-2 mt-0">
        
        <Text className="font-bold text-lg pt-2">{title}    </Text>
        <View className="flex-row items-center space-x-1">
            <StarIcon color="green" opacity={0.5} size={22} />
            <Text className="text-xs text-gray-500"> 
                 <Text className="text-green-500 ">{rating}</Text> . {genre}
            </Text>
        </View>
        <View className="flex-row items-center space-x-1">
            <MapIcon color="green" opacity={0.5} size={22 } />
            <Text className="text-xs text-gray-500">Pres de . {address}</Text>
        </View>
        <View>
        </View>
      </View>

      </View>

    </TouchableOpacity>
  )
}

export default RCard