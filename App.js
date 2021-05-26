// In App.js in a new project

import { StatusBar } from 'expo-status-bar';
import  React, { useState,useEffect } from 'react';
import { View, Text,  Button, StyleSheet, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen=({navigation})=> {

  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [finalPrice, setFinalPrice] = useState('');
  const [save, setSave] = useState();

  const calculateDiscount = () => {
    if (originalPrice != '' && discountPercentage != '') {
      if (discountPercentage >= 0 && discountPercentage <= 100 && originalPrice >= 0) {
        const x = originalPrice / 100*discountPercentage
        setFinalPrice(originalPrice-x)
        setSave(x)
      }
      else {
        setFinalPrice('0.00 ')
        setSave('0.00')
      }
    }
    else {
      setFinalPrice('0.00')
      setSave('0.00')
    }
  }
  useEffect(() => {
    calculateDiscount()
  },[save,finalPrice,discountPercentage,originalPrice])

  return (
    <View style={styles.container}>
      <view>
      <button
      onClick={()=>navigation.navigate('History')}
      >Go to History Screen</button>
      </view>
      
      <view >
        <Text >Original Price</Text>
        <TextInput style={styles.inputText}
          placeholder="Enter Original Price"
          onChangeText={text => {
            setOriginalPrice(text)
            calculateDiscount()
            
          }}

          defaultValue={originalPrice}
        ></TextInput>
      </view>
      <view>
        <Text>Discount Percentage</Text>
        <TextInput style={styles.inputText}
          placeholder="Enter Original Price"
          onChangeText={text => {
            setDiscountPercentage(text)
            calculateDiscount()
            
          }}
          defaultValue={discountPercentage}
        ></TextInput>
      </view>
      <view>
        <text>Final Price</text>
        <text>{finalPrice}</text>
      </view>
      <view>
        <text>You Save</text>
        <text>{save}</text>
      </view>
    </View>
  );

}

const History=({navigation})=> {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>History Screen</Text>
      <button
      onClick={()=>navigation.navigate("Home")}
      ></button>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="History" component={History} 
          options={{
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'blue'
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    borderBottomWidth: 1,

  }
});

export default App;