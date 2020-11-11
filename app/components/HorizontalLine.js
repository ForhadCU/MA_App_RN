import React from 'react';
import { View, StyleSheet } from 'react-native';
import color from '../configs/MyColors'
const HorizontalLine = () => {
  return <View style={[styles.horizontalLine]}>
  </View>;
};

export default HorizontalLine;

const styles = StyleSheet.create({
  horizontalLine: {
    width: "100%",
    borderBottomColor: color.horizontalLineColor,
    borderBottomWidth: 1.0,
    position: 'absolute',
    bottom: 50
  }
})