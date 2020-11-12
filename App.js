import React, {useState, useEffect, useMemo, useReducer} from 'react';
import {
  View,
  Text,
  Button,
  StatusBar,
  ToolbarAndroidComponent,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import ShagotomScreen from './app/screens/ShagotomScreen';
import Date1Screen from './app/screens/Date1Screen';
import Date2Screen from './app/screens/Date2Screen';
import EknojoreScreen from './app/screens/EknojoreScreen';
import MainScreen from './app/screens/MainScreen';
import CustomStatusBar from './app/components/CustomStatusBar';
import colors from './app/configs/MyColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import test from './app/screens/test';

const Stack = createStackNavigator();

function App() {
  console.log('I m first log');
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // readData();
    console.log('useEffect called');
    readData();

    // setTimeout(() => {
    //   setIsLoading(false);
    //   readData();
    // }, 3000);
  }, []);

  const readData = async () => {
    let data = await AsyncStorage.getItem('@data1');
    setUserToken(data);
  };

  // if (isLoading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size="large" color={colors.horizontalLineColor} />
  //     </View>
  //   );
  // }
  console.log('userToken :' + userToken + '  type: ' + typeof userToken);

  return (
    <NavigationContainer>
      <CustomStatusBar />

      {userToken == null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="ShagotomScreen"
            component={ShagotomScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Date1Screen"
            component={Date1Screen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Date2Screen"
            component={Date2Screen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EknojoreScreen"
            component={EknojoreScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{headerTitle: 'স্বাগতম', headerLeft: null}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{
              headerTitle: 'স্বাগতম',
              headerLeft: null,
              headerTintColor: colors.logoTintColor,
              headerStyle:{
                backgroundColor: colors.primaryColor
              },
              headerShown: false
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;








// // import * as React from 'react';
// // import { Appbar } from 'react-native-paper';

// // const App = () => {
// //   const _goBack = () => console.log('Went back');

// //   const _handleSearch = () => console.log('Searching');

// //   const _handleMore = () => console.log('Shown more');

// //   return (
// //     <Appbar.Header>
// //       <Appbar.BackAction onPress={_goBack} />
// //       <Appbar.Content title="Title" subtitle="Subtitle" />
// //       <Appbar.Action icon={require('./app/assets/icons8-planner-100.png')} onPress={_handleSearch} />
// //       <Appbar.Action icon={require('./app/assets/menu_verticle.png')} onPress={_handleMore} />
// //     </Appbar.Header>
// //   );
// // };

// // export default App;

// // import React, {useState, useEffect} from 'react';
// // import {
// //   StyleSheet,
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// // } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import {NavigationContainer} from '@react-navigation/native';
// // import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';

// // const App = () => {
// //   const STORAGE_KEY = '@save_age';
// //   const [age, setAge] = useState('');

// //   useEffect(() => {
// //     readData();
// //   }, []);

// //   const saveData = async () => {
// //     try {
// //       await AsyncStorage.setItem(STORAGE_KEY, age);
// //       alert('Data successfully saved');
// //     } catch (e) {
// //       alert('Failed to save the data to the storage');
// //     }
// //   };
// //   const readData = async () => {
// //     try {
// //       const userAge = await AsyncStorage.getItem(STORAGE_KEY);

// //       if (userAge !== null) {
// //         setAge(userAge);
// //       }
// //     } catch (e) {
// //       alert('Failed to fetch the data from storage');
// //     }
// //   };

// //   const onChangeText = (userAge) => setAge(userAge);

// //   const onSubmitEditing = () => {
// //     if (!age) return;

// //     saveData(age);
// //     setAge('');
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.header}>
// //         <Text style={styles.title}>Android App</Text>
// //       </View>
// //       <View style={styles.panel}>
// //         <Text>Enter your age here:</Text>
// //         <TextInput
// //           style={styles.input}
// //           value={age}
// //           placeholder="Age is just a number"
// //           // onChangeText={onChangeText}
// //           // onSubmitEditing={onSubmitEditing}
// //         />
// //         <Text style={styles.text}>Your age is {age}</Text>
// //         <TouchableOpacity onPress={onSubmitEditing} style={styles.button}>
// //           <Text style={styles.buttonText}>Clear Storage</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // };
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   header: {
// //     width: '100%',
// //     backgroundColor: '#dcdcdc',
// //     padding: 20,
// //     borderBottomWidth: StyleSheet.hairlineWidth,
// //     alignItems: 'center',
// //   },
// //   title: {
// //     fontSize: 22,
// //     color: '#333',
// //     fontWeight: 'bold',
// //   },
// //   panel: {
// //     paddingTop: 40,
// //     alignItems: 'center',
// //   },
// //   text: {
// //     fontSize: 24,
// //     padding: 10,
// //     backgroundColor: '#dcdcdc',
// //   },
// //   input: {
// //     padding: 15,
// //     height: 50,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#333',
// //     margin: 10,
// //   },
// //   button: {
// //     margin: 10,
// //     padding: 10,
// //     backgroundColor: 'yellow',
// //   },
// //   buttonText: {
// //     fontSize: 18,
// //     color: '#444',
// //   },
// // });

// // export default App;

// // import React from 'react';
// // import {MenuProvider} from 'react-native-popup-menu';
// // import FloatingActionButton from './app/components/FloatingActionButton';

// // export default App = () => {
// //   return (
// //     <MenuProvider>
// //       <FloatingActionButton />
// //     </MenuProvider>
// //   );
// // };

// // somewhere in your app

//Menu

// import React, { Text, View } from 'react-native';
// import {
//   MenuContext
// } from 'react-native-menu';
// import TopNevigation from './app/components/TopNavigation'

// export default App = () => {
//   // You need to place a MenuContext somewhere in your application, usually at the root.
//   // Menus will open within the context, and only one menu can open at a time per context.
//   return (
//     <View>
//       <MenuContext style={{flex: 1}}>
//         <View>

//         <TopNevigation />
//         </View>
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           <Text>Hello!</Text>
//         </View>
//       </MenuContext>
//       </View>
//     );
// };
