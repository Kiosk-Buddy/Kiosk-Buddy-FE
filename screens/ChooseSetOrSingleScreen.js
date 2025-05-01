// src/screens/ChooseSetOrSingleScreen.js

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { useCart } from '../contexts/CartContext';

// 실제 파일명에 맞춰 경로를 조정하세요
const logoImg       = require('../assets/images/md-logo.png');
const burgerOnlyImg = require('../assets/images/burger.png');
const burgerSetImg  = require('../assets/images/meal.png');

export default function ChooseSetOrSingleScreen({ route, navigation }) {
  const { selectedBurger } = route.params || {};
  const { addToCart }     = useCart();

  const burgerName  = selectedBurger || '버거';
  const singlePrice = route.params?.singlePrice ?? 9500;

  return (
    <View style={styles.container}>

      {/* HEADER: 로고 + 버거 이름 */}
      <View style={styles.header}>
        <Image source={logoImg} style={styles.logo} />
        <Text style={styles.burgerName}>{burgerName}</Text>
      </View>

      {/* PROMPT */}
      <Text style={styles.prompt}>
        세트로 드시겠습니까?
      </Text>

      {/* CARD ROW */}
      <View style={styles.cardRow}>
        {/* 세트 카드 */}
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('SelectSetDetails', { selectedBurger })
          }
        >
          <Image source={burgerSetImg} style={styles.cardImage} />
          <Text style={styles.cardLabel}>세트 선택</Text>
        </TouchableOpacity>

        {/* 단품 카드 */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            addToCart({ name: `${burgerName} 단품`, price: singlePrice });
            navigation.navigate('FoodSelect');
          }}
        >
          <Image source={burgerOnlyImg} style={styles.cardImage} />
          <Text style={styles.cardLabel}>단품 선택</Text>
        </TouchableOpacity>
      </View>

      {/* CANCEL BUTTON */}
      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>취소</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  burgerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },

  /* PROMPT */
  prompt: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },

  /* CARD ROW */
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 8,
    alignItems: 'center',
    padding: 12,
  },
  cardImage: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },

  /* CANCEL BUTTON */
  cancelBtn: {
    width: '100%',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#333',
  },
});
