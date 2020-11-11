import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import HorizontalLine from '../components/HorizontalLine';
import color from '../configs/MyColors';
import DateTimePicker2 from '@react-native-community/datetimepicker';
import CropHorizontal from '../components/CropHorizontalLine';
import {openDatabase} from 'react-native-sqlite-storage';

var mydatabase = openDatabase({name: 'MaAppDatabase.db'});

const Date2Screen = ({navigation}) => {
  // const {date1} = route.params;
  // var getDate1 = JSON.stringify(date1)
  // var getDate1 = new Date(date1)
  // var mDate = new Date(props.mydate);
  // mDate.setDate(mDate.getDate() + 280);
  const [date2, setDate2] = useState('');
  // const [actualDate, setActualDate] = useState('');
  const [date1, setDate1] = useState('');
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  var weekLimitation = 45 * (7 * 24 * 3600 * 1000);

  useEffect(() => {
    mydatabase.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          console.log(results.rows.item(i));
          // temp.push(results.rows.item(i));
          let mDate1 = new Date(results.rows.item(i).date_1);
          setDate1(mDate1);
          let mDate2 = new Date(results.rows.item(i).date_1);
          let temp = new Date(mDate2.setDate(mDate2.getDate() + 280));
          setDate2(temp);
        }
      });
    });
  }, []);

  function goToBack() {
    navigation.goBack();
  }
  function goToNext() {
    mydatabase.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user set date_2=? where user_id=?',
        [date2.toString(), 0],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Updated date: ' + date2);
            navigation.navigate('EknojoreScreen');
          } else console.log('Updation Failed');
        },
      );
    });
  }
  const onChangeDate2 = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow(Platform.OS === 'ios');
    let tempCal1 = currentDate.getTime() - date1.getTime();
    if (tempCal1 > weekLimitation) {
      alert('Sorry, invalid date');
    } else setDate2(currentDate);
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
      <Text style={[styles.textProthomMashik]}>প্রসবের সম্ভাব্য তারিখ </Text>
      <Text style={[styles.textDate]}>
        {date2.toString().substr(4, 6)}, {date2.toString().substr(11, 4)}
        {/* {date2.toString()} */}
      </Text>

      {show && (
        <DateTimePicker2
          testID="dateTimePicker2"
          value={new Date(date2)}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeDate2}
        />
      )}
      <HorizontalLine />
      <View style={[styles.containerRightBottom]}>
        <TouchableOpacity onPress={goToNext}>
          <Text style={[styles.buttonNextText]}>পরবর্তী</Text>
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

export default Date2Screen;

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
