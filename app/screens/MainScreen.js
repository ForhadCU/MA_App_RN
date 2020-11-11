import React, {useContext, useEffect} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../configs/MyColors';
// import async from '@react-native-async-storage/async-storage'
import GrayHorizontalLinne from '../components/GrayHorizontalLine';

const MainScreen = ({navigation}) => {
  function func() {
    // navigation.navigate('ShagotomScreen');
  }



  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.card1, styles.shadowEffect]}>
        <Text style={[styles.textHeading]}>এক নজরে</Text>
        <Text style={[{marginTop: 8, marginBottom: 5}]}>7 সপ্তাহ 0 দিন</Text>
        <GrayHorizontalLinne />
        <View
          style={[
            {
              height: '25%',
              marginTop: 5,
              marginBottom: 5,
              backgroundColor: colors.first_13_weeksColor,
            },
          ]}></View>
        <GrayHorizontalLinne />
        <Text style={[{marginTop: 5}]}>বাকি রয়েছেঃ 231 দিন</Text>
      </View>
      <View style={[styles.card2, styles.shadowEffect, {marginTop: 10}]}>
        <Text style={[styles.textHeading]}>সাপ্তাহিক পরিবর্তন</Text>
        <Text style={[{marginTop: 8, marginBottom: 5}]}>7 সপ্তাহ 0 দিন</Text>
        <View style={[styles.horizontalLine]} />
        <Image
          style={[styles.imageBistario]}
          source={require('../assets/bistarito.jpg')}
        />
        <View style={[styles.horizontalLine]} />
        <Text style={[{marginTop: 5}, {color: 'gray'}]}>
          শিশুটি এখনও শীমের বিচির মত। তার আঙ্গুল, পায়ের পাতা, শাসনালী ও জননাঙ্গ
          তৈরি হয়েছে।
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  card1: {
    width: '97%',
    height: '20%',
    marginTop: 5,
    backgroundColor: colors.logoTintColor,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 2.22,
    justifyContent: 'center',
  },
  card2: {
    width: '97%',
    height: '45%',
    marginTop: 5,
    backgroundColor: colors.logoTintColor,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 2.22,
  },
  imageBistario: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  horizontalLine: {
    height: '1%',
    borderBottomColor: 'rgb(236, 238, 237)',
    borderBottomWidth: 1,
    backgroundColor: 'rgb(236, 238, 237)',
    alignSelf: 'stretch',
  },
  shadowEffect: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  textHeading: {
    color: colors.last_13_weeksColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
