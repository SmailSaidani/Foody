import { View, Text,Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MapIcon, StarIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../../sanity'
import { useNavigation } from '@react-navigation/native'
const SRCard = ({
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
    <TouchableOpacity className="bg-white mr-3 pb-10 shadow-xl w-80 h-100 rounded-3xl"
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

      className="h-60 w-80 rounded-sm" />
      <View className="px-3 pb-4 mt">
        <Text className="font-bold text-lg pt-2">{title}</Text>
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
      </View>

    </TouchableOpacity>
  )
}

export default SRCard