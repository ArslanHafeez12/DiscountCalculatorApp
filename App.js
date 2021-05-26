import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
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
        setFinalPrice('')
        setSave('')
      }
    }
    else {
      setFinalPrice('')
      setSave('')
    }
  }
  useEffect(() => {
    calculateDiscount()
  },[save,finalPrice,discountPercentage,originalPrice])

  return (
    <View style={styles.container}>
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

      <button title="Chnage Name" onClick={calculateDiscount.bind(this, "Arslan")} >Press Me!!</button>
    </View>
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
