import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EpisodePagination from './../Components/EpisodePagination';


export default function Episode({route}) {
  const id = route.params.id  
  return (
    <View style={styles.EpisodeContainer}> 
      <EpisodePagination id={id}  />
    </View>
  )
}

const styles = StyleSheet.create({
  EpisodeContainer:{
    flex:1,
    height:100,
   
  }

})