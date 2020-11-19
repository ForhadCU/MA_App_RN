import DateTimePicker1 from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  Image, SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import CropHorizontal from '../components/CropHorizontalLine';
import HorizontalLine from '../components/HorizontalLine';
import color from '../configs/MyColors';

var mydatabase = openDatabase({name: 'MaAppDatabase.db'});

const Date1Screen = ({navigation}) => { 
  const [date1, setDate1] = useState(new Date());
  const [uId, setUid] = useState(1);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  var today = new Date();
  var weekLimitation = 39 * (7*24*3600*1000)

  useEffect(() => {
    mydatabase.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY, date_1 TEXT, date_2 TEXT, runningDays TEXT, runningWeeks TEXT, dueDays TEXT, dueWeeks TEXT, totalDueDays TEXT)',
              [],
            );
          }
        },
      );
    });
  }, []);

  function goToNext() {
    console.log('uId: '+uId)
    // var l = 1;
    if (uId == 1) {
      setUid(0)
      mydatabase.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_user (user_id, date_1) VALUES (?,?)',
          [0, date1.toString()],
          (tx, results) => {
            console.log(
              'Results',
              results.rowsAffected + '\n' + 'date1 is: ' + date1,
            );
            if (results.rowsAffected > 0) {
              // console.log('Inserted Date' + results.rows.item(1).date_1);
              console.log('Updated UId: '+ uId)
              navigation.navigate('Date2Screen');
 
            } else console.log('Registration Failed');
          },
        );
      }); 
    } else {
          mydatabase.transaction((tx) => {
            tx.executeSql(
              'UPDATE table_user set date_1=? where user_id=?',
              [date1.toString(), 0],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  console.log('Updated date: ' + date1);
                  navigation.navigate('Date2Screen');
                } else console.log('Updation Failed');
              },
            );
          });

    }

  }
  function goToBack() {
    navigation.goBack();
  }
  const onChangeDate1 = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShow(Platform.OS === 'ios');
    // setDate1(currentDate);

    let tempcal1 = today.getTime() - currentDate.getTime();

    if (currentDate.getTime() > today.getTime()) {
      alert('Sorry, invalid date');
    } else if(tempcal1 > weekLimitation)
    {
      alert("Sorry, invalid date")
    } 
    
    else setDate1(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={{marginBottom: 15, color: 'white', fontSize: 16}}>
        তারিখ বদলাতে এখানে চাপুন
      </Text>
      <TouchableOpacity onPress={showDatepicker}>
        <Image
          style={[styles.datePickerLogo, {marginBottom: 35}]}
          source={require('../assets/icons8-planner-100.png')}
        />
      </TouchableOpacity>
      <CropHorizontal />
      <Text style={[styles.textProthomMashik]}>শেষ মাসিক এর প্রথম দিন</Text>
      <Text style={[styles.textDate]}>
        {date1.toString().substr(4, 6)}, {date1.toString().substr(11, 4)}
      </Text>
      {show && (
        <DateTimePicker1
          testID="dateTimePicker1"
          value={date1}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeDate1}
        />
      )}

      <HorizontalLine />
      <View style={[styles.containerRightBottom]}>
        <TouchableOpacity onPress={goToNext}>
          <View style={{height: 50, width: 90, justifyContent: 'center', alignItems: 'center'}}>

          <Text style={[styles.buttonNextText]}>পরবর্তী</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.containerLeftBottom]}>
        <TouchableOpacity onPress={goToBack}>
          <View style={{height: 50, width: 90, justifyContent: 'center', alignItems: 'center'}}>

          <Text style={[styles.buttonPreviousText]}>পূর্ববর্তী</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Date1Screen;

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
    bottom: 0,
    right: 0,
  },
  containerLeftBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  datePickerLogo: {
    width: 70,
    height: 70,
    tintColor: color.logoTintColor,
  },
  textProthomMashik: {
    marginBottom: 15,
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
