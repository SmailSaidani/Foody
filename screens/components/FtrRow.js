import { View, Text } from 'react-native'
import React, { useState,useEffect } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import { ScrollView } from 'react-native-gesture-handler'
import RCard from './RCard'
import client from '../../sanity';

const FtrRow = ({title, description,id}) => {
  const [restaurants , setR]=useState([])
  
  useEffect(()=> {
    client.fetch(`
    *[_type== "featured" && _id == $id] {
      ...,
      restaurants[]->{
          ...,
          dishes[]->,
        type->{
          name
        }
      },
  }[0]`,{id}).then((data) => {
    setR(data.restaurants)
        })
    },[])
     console.log(restaurants[0])
      return (
    <View>

    <View className="mt-4 flex-row items-center justify-between px-4">
      <Text className=" font-bold text-lg">{title}</Text>
      <ArrowRightIcon color="green" />
    </View>
    <Text className=" font-bold text-xs text-gray-500 px-4">{description}</Text>
    <ScrollView 
    horizontal
    contentContainerStyle={{
        paddingHorizontal:15,
        
    }}
    showsHorizontalScrollIndicator={false}
    className="pt-4">
     

     {restaurants?.map(r=>(
      <RCard 
        id={r._id}
        key={r._id}
        img={r.image}
        title={r.name}
        rating={r.rating}
        genre={r.name}
        address={r.adresse}
        desc={r.short_description}
        dishes={r.plats}
        long={r.long}
        lat={r.lat}
        />
 ))}
        
        
    </ScrollView>
    </View>
  )
}

export default FtrRow