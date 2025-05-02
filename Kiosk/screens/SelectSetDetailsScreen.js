// src/screens/SelectSetDetailsScreen.js

import React, { useState } from 'react';
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
const friesIcon     = require('../assets/images/fries.png');
const coleslawIcon  = require('../assets/images/coleslaw.png');
const colaIcon      = require('../assets/images/cola.png');
const spriteIcon    = require('../assets/images/sprite.png');
const cheeseIcon    = require('../assets/images/cheesesticks.png');

export default function SelectSetDetailsScreen({ route, navigation }) {
  const { selectedBurger } = route.params || {};
  const { addToCart }     = useCart();

  const [fries, setFries]   = useState('');
  const [drink, setDrink]   = useState('');
  const [extra, setExtra]   = useState('');

  // 세트 가격
  const setPrice = route.params?.setPrice ?? 6200;

  const handleConfirm = () => {
    const parts = [fries, drink];
    if (extra) parts.push(extra);
    const itemName = `${selectedBurger} 세트 (${parts.join(' + ')})`;
    addToCart({ name: itemName, price: setPrice });
    navigation.navigate('FoodSelect');
  };

  const renderOption = (icon, label, selected, onPress) => (
    <TouchableOpacity
      key={label}
      style={[styles.optionCard, selected && styles.optionCardSelected]}
      onPress={onPress}
    >
      <Image source={icon} style={styles.optionIcon} />
      <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      {/* HEADER: 로고 + 버거 이름 + 가격 */}
      <View style={styles.header}>
        <Image source={logoImg} style={styles.logo} />
        <Text style={styles.headerText}>{selectedBurger}</Text>
        <Text style={styles.headerPrice}>₩{setPrice.toLocaleString()}</Text>
      </View>

      {/* 사이드 안내 */}
      <View style={styles.instructionBox}>
        <View style={styles.instructionHighlight} />
        <Text style={styles.instructionText}>
          세트메뉴 사이드를 선택하세요
        </Text>
      </View>
      <View style={styles.optionsContainer}>
        {renderOption(friesIcon, '감자튀김', fries === '감자튀김', () => setFries('감자튀김'))}
        {renderOption(coleslawIcon, '코울슬로', fries === '코울슬로', () => setFries('코울슬로'))}
      </View>

      <View style={styles.divider} />

      {/* 음료 안내 */}
      <View style={styles.instructionBox}>
        <View style={styles.instructionHighlight} />
        <Text style={styles.instructionText}>
          세트메뉴 음료를 선택하세요
        </Text>
      </View>
      <View style={styles.optionsContainer}>
        {renderOption(colaIcon, '콜라', drink === '콜라', () => setDrink('콜라'))}
        {renderOption(spriteIcon, '사이다', drink === '사이다', () => setDrink('사이다'))}
      </View>

      <View style={styles.divider} />

      {/* 추가제품 안내 */}
      <View style={styles.instructionBox}>
        <View style={styles.instructionHighlight} />
        <Text style={styles.instructionText}>
          추가제품을 선택하세요
        </Text>
      </View>
      <View style={styles.optionsContainer}>
        {/* 선택 안함 */}
        <TouchableOpacity
          style={[styles.optionCard, extra === '' && styles.optionCardSelected]}
          onPress={() => setExtra('')}
        >
          <Text style={[styles.optionLabel, extra === '' && styles.optionLabelSelected]}>
            선택 안함
          </Text>
        </TouchableOpacity>
        {/* 치즈 스틱 */}
        {renderOption(cheeseIcon, '치즈 스틱', extra === '치즈 스틱', () => setExtra('치즈 스틱'))}
      </View>

      {/* 선택 완료 버튼 */}
      <TouchableOpacity
        style={[styles.confirmBtn, !(fries && drink) && styles.confirmBtnDisabled]}
        onPress={handleConfirm}
        disabled={!(fries && drink)}
      >
        <Text style={styles.confirmText}>세트 선택 완료</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  headerPrice: {
    fontSize: 18,
    color: '#666',
    marginLeft: 8,
  },

  instructionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  instructionHighlight: {
    width: 4,
    height: '100%',
    backgroundColor: '#FFC72C',
    borderRadius: 2,
    marginRight: 8,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
  },

  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  divider: {
    height: 1,
    backgroundColor: '#DDD',
    marginVertical: 16,
  },

  optionCard: {
    width: '45%',
    height: 120,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionCardSelected: {
    borderColor: '#FFC72C',
    backgroundColor: '#FFF8E1',
  },
  optionIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  optionLabel: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  optionLabelSelected: {
    color: '#DA291C',
    fontWeight: '700',
  },

  confirmBtn: {
    backgroundColor: '#FFC72C',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmBtnDisabled: {
    backgroundColor: '#F0E68C',
  },
  confirmText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
