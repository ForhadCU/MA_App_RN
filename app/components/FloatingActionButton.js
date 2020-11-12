import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Button,
  Text,
} from 'react-native';

import colors from '../configs/MyColors';

class FloatingActionButton extends Component {
  onTouchEvent = () => {
    Alert.alert('FAB Clicked');
  };
  render() {
    return (
      <View>
        <TouchableOpacity
          style={[styles.floatButtonView, styles.shadowEffect1]}
          onPress={this.onTouchEvent}>
          <View>
            <Text
              style={{
                color: colors.logoTintColor,
                fontWeight: 'bold',
                fontSize: 25,
              }}>
              +
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});

export default FloatingActionButton;

// import React from 'react';
// import { View, Text,  } from 'react-native';
// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from 'react-native-popup-menu';
 
// export const YourApp = () => (
  // <View>
  //   <Text>Hello world!</Text>
  //   <Menu>
  //     <MenuTrigger text='Select action' />
  //     <MenuOptions>
  //       <MenuOption onSelect={() => alert(`Save`)} text='Save' />
  //       <MenuOption onSelect={() => alert(`Delete`)} >
  //         <Text style={{color: 'red'}}>Delete</Text>
  //       </MenuOption>
  //       <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
  //     </MenuOptions>
  //   </Menu>
  // </View>
// );
