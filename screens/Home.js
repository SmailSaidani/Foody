import { View, Text,Image } from 'react-native'
import * as React from 'react';

import  { useLayoutEffect,useState , useEffect} from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {AdjustmentsHorizontalIcon, ChevronDownIcon, UserIcon,Sear, MagnifyingGlassCircleIcon, ArrowLeftOnRectangleIcon, ShoppingCartIcon} from 'react-native-heroicons/outline'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Categories from './components/Categories';
import FtrRow from './components/FtrRow';
import SanityClientConstructor, { SanityClient } from '@sanity/client';
import client from '../sanity';
import { setRest } from '../features/restaurant';
import SRCard from './components/SRCard';

import * as Location from 'expo-location';


export default function Home  ()  {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [adr , setAdresse]=useState(null)
    useEffect(() => {
      (async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
       var L={
          longitude:location.coords.longitude,
          latitude:location.coords.latitude
       }
        let addresse= await Location.reverseGeocodeAsync(L)
        setAdresse(addresse[0].region)
        console.log(addresse)
        setLocation(location);
      })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }

    const [username,setUsername]=useState("")



    const navigation =useNavigation();
    const [ftrc , setFtrc]=useState([])
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:"meow",
            headerShown:false
        })
    })
    const [restaurants , setR]=useState([])
    const [search, setSearch] = useState(false);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);






    useEffect(()=> {
    client.fetch(`
        *[_type== "featured"] {
            ...,
            restaurants[]->{
                ...,
                dishes[]->
            }
        }`).then((data) => {
            setFtrc(data)
        })
    },[])

    useEffect(()=> {


    client.fetch(
        '*[_type== "restaurant" ]',
      ).then(data => {
        setR(data);
        console.log("sssssssss",restaurants)


    })

},[])


const [plats, setPlats]=useState([])


const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
        setSearch(true)
        console.log(text)
        setFilteredDataSource(restaurants.filter(rest=> rest.name.toLowerCase().includes(text.toLowerCase())))
        console.log(filteredDataSource,"hillow")
    }

    if(text==""){
        setFilteredDataSource([])
        setSearch(false)
    }

    }


          console.log(search)
  return (
    <SafeAreaView className="bg-white pt-5 flex-1" >

        <View className="flex-row pb-3 items-center mx-4 space-x-2">
            <Image source={{
                uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            }}
            className="h-7 w-7 bg-gray-300 p-4 br-50 rounded-full" />


            <View className="flex-1">
                <Text className="font-bold text-gray-400 text-xs">{username}</Text>


                <Text className="font-bold text-xl">{adr}
                <ChevronDownIcon  size={20}  color="green"/>
                </Text>


            </View>
            <ArrowLeftOnRectangleIcon size={35} color="green"  onPress={()=>handleSignOut()} />
        </View>

        <View className="flex-row items-center space-x-2 px-2 pb-2">
            <View className="flex-row space-x-2 flex-1  bg-gray-200 p-3">
                <MagnifyingGlassCircleIcon color="grey"  size={30}/>
                <TextInput placeholder='Serch a restaurant' onChangeText={ (text) =>searchFilterFunction(text)}  />

            </View>

            <AdjustmentsHorizontalIcon color="green" />

        </View>


        {/*  el boudy */}


            <>

            </>
            {search ?
            <ScrollView className="bg-blue-100 flex-column ">
                            <View className="mt-4 flex-row items-center justify-between px-4">
                                <Text className=" font-bold text-lg">Resultats</Text>
                        </View>
            {filteredDataSource.map(r=>(
                <View key={r._id} className="bg-blue-100   pt-5 ml-5">
                  <SRCard
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
                  </View>
            ))}
            </ScrollView>

             :
        <ScrollView  className="bg-blue-100">

            <Categories  />
                {ftrc?.map(cat =>(
                    <FtrRow
                    title={cat.Nom}
                    description={cat.description_Plat}
                    id={cat._id}
                    key={cat._id}
                     />
                ))}

                </ScrollView>  }

                <View style={{width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: 'green',
                            position: 'absolute',
                            bottom: 30,
                            right: 10,
                            alignItems:"center",
                            justifyContent:"center"

                            }} >
        <ShoppingCartIcon color="white" size={35}   onPress={()=> navigation.navigate("Panier")} />

        </View>


        <View style={{width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: 'green',
                            position: 'absolute',
                            bottom: 110,
                            right: 10,
                            alignItems:"center",
                            justifyContent:"center"

                            }} >
        <UserIcon color="white" size={35}   onPress={()=> navigation.navigate("Livraison")} />

        </View>
    </SafeAreaView>

  )
}

