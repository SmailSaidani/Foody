import { View, Text } from 'react-native'
import React, { useState,useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import CatCard from './CatCard'
import client, { urlFor } from '../../sanity'
const Categories = () => {
    const [cat, setCats]=useState([])
  useEffect(()=> {
    client.fetch(`
        *[_type== "category"]`).then((data) => {
          setCats(data)
          console.log(data)
        })
    },[])
    console.log(cat)
  return (
    <ScrollView horizontal showsVerticalScrollIndicator={false}
    contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
    }}>
       {cat.map(c=>(
            <CatCard title={c.name} img={c.image} key={c._id}  />
          
           ))}
      
    </ScrollView>
  )
}

export default Categories