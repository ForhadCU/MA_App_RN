import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../configs/MyColors';

const Blocks = () => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={[styles.first_13_Weeks]} />
      <View style={[styles.first_13_Weeks]} />
      <View style={[styles.first_13_Weeks]} />
      <View style={[styles.first_13_Weeks]} />
      <View style={[styles.first_13_Weeks]} />
      <View style={[styles.first_13_Weeks]} />
      <View style={[styles.first_13_Weeks]} />
      <View style={[styles.first_13_Weeks]} />
      <View style={[styles.first_13_Weeks]} />
      <View style={[styles.first_13_Weeks]} />
      <View style={[styles.first_13_Weeks]} />
      <View style={[styles.first_13_Weeks]} />
      <View style={[styles.first_13_Weeks]} />

      <View style={[styles.second_13_weeks]} />
      <View style={[styles.second_13_weeks]} />
      <View style={[styles.second_13_weeks]} />
      <View style={[styles.second_13_weeks]} />
      <View style={[styles.second_13_weeks]} />
      <View style={[styles.second_13_weeks]} />
      <View style={[styles.second_13_weeks]} />
      <View style={[styles.second_13_weeks]} />
      <View style={[styles.second_13_weeks]} />
      <View style={[styles.second_13_weeks]} />
      <View style={[styles.second_13_weeks]} />
      <View style={[styles.second_13_weeks]} />
      <View style={[styles.second_13_weeks]} />

      <View style={[styles.final_13_weeksColor]} />
      <View style={[styles.final_13_weeksColor]} />
      <View style={[styles.final_13_weeksColor]} />
      <View style={[styles.final_13_weeksColor]} />
      <View style={[styles.final_13_weeksColor]} />
      <View style={[styles.final_13_weeksColor]} />
      <View style={[styles.final_13_weeksColor]} />
      <View style={[styles.final_13_weeksColor]} />
      <View style={[styles.final_13_weeksColor]} />
      <View style={[styles.final_13_weeksColor]} />
      <View style={[styles.final_13_weeksColor]} />
      <View style={[styles.final_13_weeksColor]} />
      <View style={[styles.final_13_weeksColor]} />
    </View>
  );

};

const styles = StyleSheet.create({
  first_13_Weeks: {
    flex: 1,
    backgroundColor: colors.first_13_weeksColor,
    margin: 1,
  },
  second_13_weeks: {
    flex: 1,
    backgroundColor: colors.second_13_weeksColor,
    margin: 1,
  },
  final_13_weeksColor: {
    flex: 1,
    backgroundColor: colors.final_13_weeksColor,
    margin: 1,
  },
});
export default Blocks;
