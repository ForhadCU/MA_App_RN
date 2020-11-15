import React, {useState} from 'react';
import {
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
import FloatingActionButton from '../components/FloatingActionButton';
// import async from '@react-native-async-storage/async-storage'
import GrayHorizontalLinne from '../components/GrayHorizontalLine';
import colors from '../configs/MyColors';

const MainScreen = ({navigation}) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [data, setData] = useState([
    {name: 'প্রেগন্যান্সি শেষ করুন', id: 1},
    {name: 'পূর্বের ইতিহাস', id: 2},
    {name: 'এপটি শেয়ার করুন', id: 3},
    {name: 'মতামত দিন', id: 4},
    {name: 'About Us', id: 5},
    {name: 'Dismiss', id: 6},
  ]);

  // const data = [
  //   {name: 'প্রেগন্যান্সি শেষ করুন', id: 1},
  //   {name: 'পূর্বের ইতিহাস', id: 2},
  //   {name: 'এপটি শেয়ার করুন', id: 3},
  //   {name: 'মতামত দিন', id: 4},
  //   {name: 'About Us', id: 5},
  //   {name: 'Dismiss', id: 6},
  // ]
  


  function onMenuTouch() {
    setIsModalShown(true);
  }
  // function onTouchCancel(){
  //   setIsModalShown(false)
  // }
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
  
  function onTouchEvent(){
    console.log('Clicked')
  }

  return (
    <SafeAreaView style={[styles.container]}>
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
        <View style={{marginRight: 20}}>
          <TouchableOpacity onPress={onMenuTouch}>
            <Image
              source={require('../assets/menu_verticle.png')}
              style={[styles.imageMenu]}
            />
          </TouchableOpacity>
        </View>
      </View>
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

      <View style={[styles.floatingActionButton]}>
        <FloatingActionButton />
      </View>

      <View>
        
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
                data={data}
                renderItem={({item}) => (
                  // <View style={{height: 60, justifyContent: 'center'}}>
                  //   <Text style={{fontSize: 20, paddingBottom: 20}}>
                  //     {item.name}
                  //   </Text>
                  //   <GrayHorizontalLinne />
                  // </View>
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
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 2.22,
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 40,
    right: 40,
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
    height: '1%',
    borderBottomColor: 'rgb(236, 238, 237)',
    borderBottomWidth: 1,
    backgroundColor: 'rgb(236, 238, 237)',
    alignSelf: 'stretch',
  },
  imageBistario: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
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
  textAppBarTitle: {
    color: 'white',
    fontSize: 24,
    // position: 'absolute',
    // left: 35,
    // top: 12,
  },
});

//DropDown Menu

// import React, {Component} from 'react';
// import {AppRegistry ,Text, View} from 'react-native';
// import {
//   Option,
//   OptionList,
//   Select,
//   updatePosition,
// } from 'react-native-dropdown-latest';

// class MainScreen extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       canada: '',
//     };
//   }

//   componentDidMount() {
//     updatePosition(this.SELECT1);
//     updatePosition(this.OPTIONLIST);
//   }

//   _getOptionList() {
//     return this.OPTIONLIST;
//   }

//   _canada(province) {
//     this.setState({
//       ...this.state,
//       canada: province,
//     });
//   }

//   render() {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Select
//           width={250}
//           ref="SELECT1"
//           optionListRef={this._getOptionList.bind(this)}
//           defaultValue="Select a Province in Canada ..."
//           onSelect={this._canada.bind(this)}>
//           <Option>Alberta</Option>
//           <Option>British Columbia</Option>
//           <Option>Manitoba</Option>
//           <Option>New Brunswick</Option>
//           <Option>Newfoundland and Labrador</Option>
//           <Option>Northwest Territories</Option>
//           <Option>Nova Scotia</Option>
//           <Option>Nunavut</Option>
//           <Option>Ontario</Option>
//           <Option>Prince Edward Island</Option>
//           <Option>Quebec</Option>
//           <Option>Saskatchewan</Option>
//           <Option>Yukon</Option>
//         </Select>

//         <Text>Selected provicne of Canada: {this.state.canada}</Text>

//         <OptionList ref="OPTIONLIST" />
//       </View>
//     );
//   }
// }

// export default MainScreen;
// AppRegistry.registerComponent('App', () => App);
