import React, { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HorizontalLine from '../components/HorizontalLine';
import color from '../configs/MyColors';

const ShagotomScreen = ({navigation}) => {
  useEffect(()=>{
    // async()=>{
      
    // }
  }, [])

  function goTo() {
    navigation.navigate('Date1Screen');
    console.log('GO to date1')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.animatedImage}
          source={require('../assets/mother1.png')}
        />
      </View>
      <View>
        <Text style={styles.pagerText}>স্বাগতম!!</Text>
      </View>
      <HorizontalLine />
      <View style={[styles.containerBottom]}>
        <TouchableOpacity onPress={goTo}>
          <Text style={[styles.buttonNextText]}>পরবর্তী</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ShagotomScreen;

const styles = StyleSheet.create({
  animatedImage: {
    width: 250,
    height: 250,
    marginBottom: 25,
    tintColor: color.logoTintColor,
  },
  buttonNextText: {
    color: 'white',
    fontSize: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primaryColor,
  },
  containerBottom: {
    position: 'absolute',
    bottom: 18,
    right: 25,
  },
  containerHorizontalLine: {},
  pagerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
