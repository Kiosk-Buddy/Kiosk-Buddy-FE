// Payselection.tsx

import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RootStackParamList } from '../App';

export default function Payselection() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" />

      {/* 안내 텍스트 */}
      <Text style={styles.title}>
        결제 방법을 선택해 주세요{'\n'}
      </Text>

      {/* 결제 옵션 버튼들 */}
      <View style={styles.paymentOptions}>
        <TouchableOpacity style={styles.paymentButton}>
          <Image
            source={require('../assets/images/mobile.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.optionText}>모바일 상품권</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => navigation.navigate('Payprogress')}
        >
          <Image
            source={require('../assets/images/creditcard.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.optionText}>카드 결제</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.paymentButton}>
          <Image
            source={require('../assets/images/kakao.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.optionText}>간편 결제</Text>
        </TouchableOpacity>
      </View>

      {/* 하단 버튼 */}
      <View style={styles.bottomButtons}>

        <TouchableOpacity 
          style={styles.bottomButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.bottomButtonText}>이전단계</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 50,
    color: '#333',
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 50,
  },
  paymentButton: {
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ccc',
    width: 100,
    height: 100,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  bottomButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 10,
    marginTop: 300,
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});