import React from 'react';
import { View, StyleSheet } from 'react-native';
const HorizontalLine = () => {
  return <View style={[styles.horizontalLine, {marginLeft: 45, marginRight: 45, marginBottom: 15}]} />;
};

export default HorizontalLine;

const styles = StyleSheet.create({
    horizontalLine: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        alignSelf: 'stretch',
      },
})