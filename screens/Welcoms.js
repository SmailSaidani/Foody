import { View, Text,ImageBackground,Button,StyleSheet} from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { ArrowRightCircleIcon, EnvelopeIcon } from 'react-native-heroicons/outline'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'

export default function  Welcoms  ()  {
    const[ins, setI]=useState(false)
    const [text, setText] = React.useState("");
    const navigation =useNavigation();

  return (
    <View  style={{flex:1 }}

    >
        <TailwindProvider>

        <ImageBackground source={require("../assets/web.png")}  style={ins? {flex:0.1} : {flex:1}} className="items-center justify-center ">




      </ImageBackground>
      {ins?
      <View className="flex-1 bg-white rounded-lg shadow-xl">
            <Text onPress={()=>setI(false)}>h1llo</Text>
            <View style={{flex:"row"}}>
            <EnvelopeIcon size={30} color="green"/>
            <TextInput
                label="Email"
                value={text}
                onChangeText={text => setText(text)}
                mode='outlined'
                style={{width:300, alignSelf:"center",marginTop:50}}
                outlineColor="green"
                textColor='green'
                activeOutlineColor='green'

              />
          </View>
        </View>:

      <View className="bg-blue-200  p-10 shadow-xl  rounded-lg items-center shadow-xl">
      <Text className="text-black-400 text-xl font-extrabold ">Welcome To Foody</Text>
      <Text className="text-black-400 text-xl font-extrabold ">Your Favorite food delivery app</Text>
      <TouchableOpacity className="flex-row" onPress={()=>navigation.navigate('Home',{}) }>
        <Text className="mt-6 mx-2 text-lg text-green-500 font-extrabold">Get Started</Text>
      <ArrowRightCircleIcon size={80} color="#00CCBB"  />
      </TouchableOpacity>
      </View>
      }





      </TailwindProvider>
    </View>

 )




}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
