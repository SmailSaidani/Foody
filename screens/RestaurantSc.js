import { View, Text, Image,TouchableOpacity} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import { urlFor } from '../sanity';
import { ArrowLeftIcon, MapPinIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/outline';
import { TailwindProvider } from 'tailwindcss-react-native';
import client from '../sanity';
import Plat from './components/Plat';
import PanierC from './components/PanierC';
import { useDispatch } from 'react-redux';
import { setRest } from '../features/restaurant';
const RestaurantSc = () => {
   const navigation = useNavigation();

    const dispatch=useDispatch()

   useLayoutEffect(()=>{
    navigation.setOptions({
        headerShown:false,
    })
   })

    const {params :{
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
    }} = useRoute();

    useEffect(()=>{
        dispatch(setRest({ id,
            img,
            title,
            rating,
            genre,
            address,
            desc,
            dishes,
            long,
            lat}))
    },[dispatch])




    const [plats, setPlats]=useState([])
    useEffect(()=>{
        const p=[]

  dishes.map(d=>
    client.fetch(
        '*[_type== "dish" && _id == $ids]',
        {ids:d._ref}
      ).then(data => {
        setPlats(old => [...old, ...data]);
        console.log(plats)

       
    })


    )


},[])
    return (
        <>
        <PanierC />
    <ScrollView>
        <TailwindProvider>
            <View className="relative">
                <Image 
                source={{
                    uri: urlFor(img).url(),
                }}
                className="w-full h-64 bg-gray-300 p-4" />
                     <TouchableOpacity onPress={()=>  navigation.goBack()}  className="absolute top-12 bg-gray-100 rounded-full left-4 p-1">
                    <ArrowLeftIcon  size={25} color="green" />
                </TouchableOpacity>
            </View>

            <View className="bg-white">
                <View className="px-4 pt-4">
                    <Text className="text-3xl font-bold">{title}</Text>
                    <View className="flex-row space-x-2 items-center my-1">
                        <StarIcon color="green" opacity={0.5} size={22}  />
                        <Text className="text-xs text-gray-500"> 
                        <Text className="text-green-500 ">{rating}</Text> . {genre}
                    </Text>

                    </View>
                    <View className="flex-row space-x-2 items-center my-1">
                        <MapPinIcon color="gray" opacity={0.7} size={22}  />
                        <Text className="text-xs text-gray-500"> 
                        <Text className="text-gray-500 ">Pres de {address}</Text> 
                    </Text>
                     
                    </View>
                    <Text className="text-gray-500 mt-2 pb-4 left-5">{desc}</Text>

                </View>
                
              <View className="pb-36">
                <Text className="px-4 pt-3 mb-3 font-bold text-xl">Menu</Text>
                {plats?.map(r=>(
      <Plat 
        id={r._id}
        key={r._id}
        nom={r.Nom_Plat}
        description={r.description_Plat}
        prix={r.Prix}
        image={r.image}
       
        />
 ))}
    
             
              </View>
            </View>
         </TailwindProvider>
    </ScrollView>
    </>
  )
}

export default RestaurantSc