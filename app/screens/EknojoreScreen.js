import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import CropHorizontal from '../components/CropHorizontalLine';
import HorizontalLine from '../components/HorizontalLine';
import color from '../configs/MyColors';
import AsyncStorage from '@react-native-async-storage/async-storage'

var mydatabase = openDatabase({name: 'MaAppDatabase.db'});

const EknojoreScreen = ({navigation}) => {
  var currentDate = new Date();
  var currentTime = currentDate.getTime();
  var tempDate2;
  var tempDate1;
  var tempRnTime, tempRnDays;
  var tmepDueTime, tempDueDays;

  const [uId, setUId] = useState(0);
  const [runningDays, setRunningDays] = useState('');
  const [runningWeeks, setRunningWeeks] = useState('');
  const [dueDays, setDueDays] = useState('');
  const [dueWeeks, setDueWeeks] = useState('');
  const [totalDueDays, setTotalDueDays] = useState('');


  useEffect(() => {
    mydatabase.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          console.log(results.rows.item(i));
          // temp.push(results.rows.item(i));
          tempDate1 = new Date(results.rows.item(i).date_1);
          tempDate2 = new Date(results.rows.item(i).date_2);

          tempRnTime = currentTime - tempDate1.getTime();
          tmepDueTime = tempDate2.getTime() - currentTime;
          tempRnDays = tempRnTime / (1000 * 3600 * 24);
          tempDueDays = Math.ceil(tmepDueTime / (1000 * 3600 * 24));

          console.log('dueDays :' + tempDueDays);

          setRunningWeeks(Math.floor(tempRnDays / 7));
          setRunningDays(Math.floor(tempRnDays % 7));
          setDueWeeks(Math.ceil(tempDueDays / 7));
          setDueDays(Math.ceil(tempDueDays % 7));
          setTotalDueDays(tempDueDays);
        }
      });
    });
  }, []);

  function goToBack() {
    navigation.goBack();
  }
  function goToFinish() {
    // console.log('My date2: ' + date2)
    mydatabase.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user set runningDays=?, runningWeeks=?, dueDays=?, dueWeeks=?, totalDueDays=? where user_id=?',
        [runningDays, runningWeeks, dueDays, dueWeeks, totalDueDays, 0],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Successfully Updated');
            saveToStorage();
            navigation.navigate('MainScreen');
          } else console.log('Updation Failed');
        },
      );
    });

    // const saveToStorage = async() =>  {
    //   await AsyncStorage.setItem( '@data1', JSON.stringify({_W: 'loggedIn'}))
    //   console.log('Save to storage Done!')
    // }  
      const saveToStorage = async() =>  {
      await AsyncStorage.setItem( '@data1', 'loggedIn')
      console.log('Save to storage Done!')
    }

  }
  return (
    <SafeAreaView style={[styles.container]}>
      <Image
        style={[styles.datePickerLogo, {marginBottom: 20}]}
        source={require('../assets/eknojoreFrag.jpg')}
      />
      <CropHorizontal />
      <Text style={[styles.textProthomMashik]}>এক নজরে</Text>
      <Text style={{color: 'white'}}>
        {'এখন চলছেঃ ' + runningWeeks + ' সপ্তাহ দিন  ' + runningDays + ' দিন'}
      </Text>
      <Text style={{color: 'white'}}>
        {'বাকি রয়েছেঃ ' +
          dueWeeks +
          ' সপ্তাহ ' +
          dueDays +
          ' দিন ' +
          ' (' +
          totalDueDays +
          ' দিন)'}
      </Text>

      <HorizontalLine />
      <View style={[styles.containerRightBottom]}>
        <TouchableOpacity onPress={goToFinish}>
          <Text style={[styles.buttonNextText]}>সংরক্ষণ</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.containerLeftBottom]}>
        <TouchableOpacity onPress={goToBack}>
          <Text style={[styles.buttonPreviousText]}>পূর্ববর্তী</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EknojoreScreen;

const styles = StyleSheet.create({
  buttonNextText: {
    color: 'white',
    fontSize: 15,
  },
  buttonPreviousText: {
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
  containerRightBottom: {
    position: 'absolute',
    bottom: 18,
    right: 25,
  },
  containerLeftBottom: {
    position: 'absolute',
    bottom: 18,
    left: 25,
  },
  datePickerLogo: {
    width: 120,
    height: 120,
  },
  textProthomMashik: {
    marginBottom: 25,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
  textDate: {
    marginBottom: 15,
    fontSize: 25,
    color: 'white',
  },
});
