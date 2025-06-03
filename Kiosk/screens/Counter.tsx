// src/screens/Counter.tsx

import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RootStackParamList } from '../App';

export default function CounterScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" />

      {/* 안내 텍스트 */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          주문하신 제품을 카운터에서{'\n'}받아주세요
        </Text>
      </View>

      {/* 카운터 이미지 */}
      <Image
        source={require('../assets/images/table.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* 버튼 (처음으로) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('OrderComplete')}>
          <Text style={styles.buttonText}>처음으로</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  messageText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 50,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 4,
    borderColor: '#eee',
    borderWidth: 1.5,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
});
