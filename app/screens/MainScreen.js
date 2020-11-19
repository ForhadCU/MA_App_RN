import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Blocks from '../components/Blocks';
import FloatingActionButton from '../components/FloatingActionButton';
// import async from '@react-native-async-storage/async-storage'
import GrayHorizontalLinne from '../components/GrayHorizontalLine';
import {
  dataBlocksList,
  dataMenuList,
  dataWeeklyAudioList,
  dataWeeklySuggestionList,
} from '../configs/allData';
import colors from '../configs/MyColors';
import Sound from 'react-native-sound';

var mydatabase = openDatabase({name: 'MaAppDatabase.db'});
//ttt
console.log('MainScreen is running...');
const MainScreen = ({navigation}) => {
  const today = new Date();

  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [dueDays, setDueDays] = useState(null);
  const [runningWeeklyDays, setRunningWeeklyDays] = useState(null);
  const [runningWeeks, setRunningWeeks] = useState(null);
  const [isModalShown, setIsModalShown] = useState(false);
  // const [name, setName] = useState(songsName());

  var microphonClickCounter = 0;
  var sound = new Sound(songsName());

  function onPlay() {
    if (microphonClickCounter % 2 == 0) {
      sound.play();
    } else {
      sound.stop();
    }
    microphonClickCounter++;
  }
  function songsName() {
    if (runningWeeks == null) {
      return 'empty';
    } else if (runningWeeks < 2) {
      return 'empty';
    } else {
      return dataWeeklyAudioList[runningWeeks].name;
    }
  }

  function actionOnRow(item) {
    setIsModalShown(false);
    switch (item) {
      case 1:
        navigation.navigate('PragnencyScreen');
        break;
      case 2:
        navigation.navigate('PurberItihas');
        break;
      case 3:
        navigation.navigate('AppSharringScreen');
        break;
      case 4:
        navigation.navigate('Motamot');
        break;
      case 5:
        navigation.navigate('AboutUsScreen');
        break;
      case 6:
        setIsModalShown(false);
        break;
    }
  }

  function readWeeks() {
    mydatabase.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          // console.log(results.rows.item(i));
          let tempDate2 = new Date(results.rows.item(i).date_2);
          let tempDate1 = new Date(results.rows.item(i).date_1);
          // console.log(tempDate1.getTime())
          // console.log(tempDate1.getTime - today.getTime())
          let tempDueDays = Math.ceil(
            (tempDate2.getTime() - today.getTime()) / (1000 * 3600 * 24),
          );
          let tempRunningWeeks = Math.floor(
            (today.getTime() - tempDate1.getTime()) / (1000 * 3600 * 24) / 7,
          );
          let tempRunningWeeklyDays = Math.floor(
            ((today.getTime() - tempDate1.getTime()) / (1000 * 3600 * 24)) % 7,
          );
          setDate1(tempDate1.toDateString());
          setDueDays(tempDueDays);
          setRunningWeeks(tempRunningWeeks);
          setRunningWeeklyDays(tempRunningWeeklyDays);
        }
      });
    });

    return runningWeeks;
  }

  function onMenuTouch() {
    setIsModalShown(true);
  }

  function getWeeklySuggestion() {
    if (runningWeeks == null) {
      return (
        <Text style={[{marginTop: 5, color: 'gray', flex: 20}]}>
          Loading...
        </Text>
      );
    } else {
      return (
        <Text style={[{marginTop: 5, color: 'gray', flex: 20}]}>
          {dataWeeklySuggestionList[runningWeeks].name}
        </Text>
      );
    }
  }

  // console.log('MainScreen Func() calling..');
  return (
    <SafeAreaView style={[styles.container]}>
      {/* ActionBar */}
      <View
        style={{
          backgroundColor: colors.primaryColor,
          height: 56,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={[styles.textAppBarTitle, {marginLeft: 20}]}>
            স্বাগতম
          </Text>
        </View>
        <TouchableOpacity onPress={() => onMenuTouch()}>
          <View
            style={{
              marginRight: 0,
              height: 50,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/menu_verticle.png')}
              style={[styles.imageMenu]}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Eknojore View */}
      <View style={[styles.card1, styles.shadowEffect, {flex: 1}]}>
        <View style={{flex: 1}}>
          <Text style={[styles.textHeading]}>এক নজরে</Text>
          <Text style={[{marginTop: 8, marginBottom: 5}]}>
            {runningWeeks} সপ্তাহ {runningWeeklyDays} দিন
          </Text>
          <GrayHorizontalLinne />
        </View>
        <View
          style={[
            {
              flex: 1,
              height: '25%',
              marginTop: 5,
              marginBottom: 5,
            },
          ]}>
          <View style={{flex: 2}}>
            <View style={{flex: 1, marginBottom: 5, marginTop: 5}}>
              <Blocks />
            </View>
            <View style={{flex: 1}}>
              {runningWeeks == 0 ? (
                <View
                  style={{
                    height: 15,
                    width: 7.76,
                    margin: 1,
                    backgroundColor: colors.weekIndicatorColor,
                  }}
                />
              ) : (
                <View style={{opacity: 100}} />
              )}
              <FlatList
                horizontal={true}
                data={dataBlocksList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => {
                  if (item.id <= readWeeks()) {
                    return (
                      <View
                        style={{
                          height: 20,
                          width: 7.76,
                          margin: 1,
                          backgroundColor: item.color,
                        }}
                      />
                    );
                  }
                  if (item.id == 40) {
                    return (
                      <View
                        style={{
                          height: 20,
                          width: 7.76,
                          margin: 1,
                          backgroundColor: item.color,
                        }}
                      />
                    );
                  }
                }}
              />
            </View>
          </View>
        </View>
        <View style={{flex: 0.5}}>
          <GrayHorizontalLinne />
          <Text style={[{marginTop: 5}]}>বাকি রয়েছেঃ {dueDays} দিন</Text>
        </View>
      </View>

      {/* ShaptahikPoribornton View */}
      <View
        style={[styles.card2, styles.shadowEffect, {marginTop: 10, flex: 3}]}>
        <View style={{flex: 0.7}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 6}}>
              <Text style={[styles.textHeading]}>সাপ্তাহিক পরিবর্তন</Text>
              <Text style={[{marginTop: 5, marginBottom: 2}]}>
                {runningWeeks} সপ্তাহ {runningWeeklyDays} দিন
              </Text>
            </View>
            {/* <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:'green'
                  }}> */}
            <TouchableOpacity onPress={() => onPlay()}>
              <View
                style={{
                  height: '100%',
                  width: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/icon_microphone.png')}
                  style={[styles.iconMicrophone]}
                />
              </View>
              {/* <Text>text</Text> */}
            </TouchableOpacity>
            {/* </View> */}
          </View>
          <View style={[styles.horizontalLine, {flex: 0.04}]} />
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'lightblue',
          }}>
          <Image
            style={[styles.imageBistarito]}
            source={require('../assets/bistarito.jpg')}
          />
        </View>

        <View style={{flex: 0.65, justifyContent: 'center'}}>
          <View style={[styles.horizontalLine, {flex: 1}]} />
          {getWeeklySuggestion()}
        </View>
      </View>

      {/* EmptyView */}
      <View style={{flex: 2, backgroundColor: 'blue'}}></View>

      {/* Floating Button */}
      <View style={[styles.floatingActionButton]}>
        <FloatingActionButton />
      </View>

      {/* Modal */}
      <Modal visible={isModalShown} transparent={true}>
        <View style={{flex: 1}}>
          <View
            style={[
              {
                flex: 1,
                backgroundColor: '#ffffff',
                right: 0,
                top: 5,
                padding: 10,
                position: 'absolute',
                width: '40%',
              },
              styles.shadowEffect,
            ]}>
            <View style={[{backgroundColor: 'white', flex: 1}]}>
              <FlatList
                // onPress={() => {
                //   setIsModalShown(false);
                // }}
                data={dataMenuList}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => actionOnRow(item.id)}>
                    <View style={{height: 40, justifyContent: 'center'}}>
                      <Text style={{fontSize: 16, paddingBottom: 5}}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MainScreen;

// //key : sss

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  buttonList: {
    backgroundColor: 'gray',
  },
  card1: {
    width: '97%',
    height: '20%',
    marginTop: 5,
    backgroundColor: colors.logoTintColor,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
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
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 2.22,
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  floatButtonView: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    borderRadius: 60 / 2,
  },
  shadowEffect1: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
  },
  horizontalLine: {
    // height: 1,
    borderBottomColor: 'rgb(236, 238, 237)',
    borderBottomWidth: 1,
    backgroundColor: 'rgb(236, 238, 237)',
    alignSelf: 'stretch',
  },
  imageBistarito: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageMenu: {
    width: 20,
    height: 20,
    tintColor: 'white',
    resizeMode: 'contain',
    // position: 'absolute',
    // right: 15,
    // top: 15,
  },
  iconMicrophone: {
    resizeMode: 'contain',
    tintColor: colors.primaryColor,
    height: 25,
    width: 25,
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
    color: colors.final_13_weeksColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textAppBarTitle: {
    color: 'white',
    fontSize: 24,
    // position: 'absolute',
    // left: 35,
    // top: 12,
  },
});

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import colors from '../configs/MyColors'
// console.log('MainScreen is running..')
// const MainScreen = () => {
//   console.log('log')
//   return (
//     <View>
//       <Text>MainScreen</Text>
//     </View>
//   );
// }

// export default MainScreen;
