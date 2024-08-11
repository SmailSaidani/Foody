import { View, Text,Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TailwindProvider } from 'tailwindcss-react-native'
import { urlFor } from '../../sanity'
import { useNavigation } from '@react-navigation/native'

const CatCard = ({img, title}) => {
  const navigation=useNavigation()

  console.log("h")
  console.log(img)
  return (
    <TailwindProvider>
    <TouchableOpacity className="relative mr-2" >
    <Image
      source={{
        uri : urlFor(img).url()
      }}

        className="h-20 w-20"/>
        <Text className="absolute   bottom-1 left-1 text-white font-bold">{title}</Text>
    </TouchableOpacity>
    </TailwindProvider>
  )
}

export default CatCard