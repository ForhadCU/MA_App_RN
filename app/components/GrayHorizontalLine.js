import React from 'react';
import { View, StyleSheet } from 'react-native';
const HorizontalLine = () => {
  return <View style={[styles.horizontalLine ]} />;
};

export default HorizontalLine;

const styles = StyleSheet.create({
    horizontalLine: {
        height: "2%",
        borderBottomColor: 'rgb(236, 238, 237)',
        borderBottomWidth: 1,
        backgroundColor: 'rgb(236, 238, 237)',
        alignSelf: 'stretch',
      },
})

//{marginLeft: 45, marginRight: 45, marginBottom: 15}