import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import colors from '../configs/MyColors';
import {useNavigation} from '@react-navigation/native';

const FloatingActionButton = () => {
  const navigation = useNavigation();
  const [isModalShown, setIsModalShown] = useState(false);
  const [data, setData] = useState([
    {id: 1, name: 'ইমারজেন্সি     ', icon: require('../assets/emergency2.png')},
    {id: 2, name: 'দায়িত্ব', icon: require('../assets/daiyetto2.png')},
    {id: 3, name: 'খাবার', icon: require('../assets/khabar2.png')},
    {id: 4, name: 'ওজন', icon: require('../assets/ojon2.png')},
    {id: 5, name: 'নোট', icon: require('../assets/note2.png')},
    {id: 6, name: 'জিজ্ঞাসা', icon: require('../assets/jiggasha2.png')},
  ]);

  const onTouchEvent = () => {
    console.log('Clicked');
    setIsModalShown(true);
  };

  function onTouchBottomViewItem(item) {
    setIsModalShown(false);
    switch (item) {
      case 1:
        navigation.navigate('First');
        break;
      case 2:
        navigation.navigate('Second');
        break;
      case 3:
        navigation.navigate('Third');
        break;
      case 4:
        navigation.navigate('Fourth');
        break;
      case 5:
        navigation.navigate('Fifth');
        break;
      case 6:
        navigation.navigate('Sixth');
        break;

      default:
        break;
    }
  }

  return (
    <View>
      <View>
        <TouchableOpacity
          style={[styles.floatButtonView, styles.shadowEffect1]}
          onPress={() => onTouchEvent()}>
          <Text
            style={{
              color: colors.logoTintColor,
              fontWeight: 'bold',
              fontSize: 24,
            }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalShown} transparent={true} animationType="slide">
        <View style={[styles.modalBottomView]}>
          <FlatList
            // onPress={() => {}}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item}) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  onTouchBottomViewItem(item.id);
                }}>
                <View
                  style={{
                    flex: 1,
                    marginLeft: 5,
                    marginBottom: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image source={item.icon} style={[styles.imageIcon]} />
                  <Text>{item.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              setIsModalShown(false);
            }}>
            <Image
              source={require('../assets/cross.png')}
              style={[styles.crossIcon, styles.crossIconView]}
            />
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  crossIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: colors.primaryColor,
  },
  crossIconView: {
    position: 'absolute',
    right: 15,
    top: 5,
  },
  floatButtonView: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    borderRadius: 60 / 2,
  },
  imageIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: colors.primaryColor,
  },
  modalBottomView: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    height: '23%',
    bottom: 2,
    paddingLeft: 10,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
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
});

export default FloatingActionButton;
