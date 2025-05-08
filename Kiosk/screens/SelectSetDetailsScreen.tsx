// src/screens/SelectSetDetailsScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCart } from '../contexts/CartContext';
import { RootStackParamList } from '../App';

// App.tsx에 정의된 ParamList와 매치
type Props = NativeStackScreenProps<RootStackParamList, 'SelectSetDetails'>;

const logoImg: ImageSourcePropType = require('../assets/images/md-logo.png');
const friesIcon: ImageSourcePropType = require('../assets/images/fries.png');
const coleslawIcon: ImageSourcePropType = require('../assets/images/coleslaw.png');
const colaIcon: ImageSourcePropType = require('../assets/images/cola.png');
const spriteIcon: ImageSourcePropType = require('../assets/images/sprite.png');
const cheeseIcon: ImageSourcePropType = require('../assets/images/cheesesticks.png');

export default function SelectSetDetailsScreen({ navigation, route }: Props) {
  const { selectedBurger, setPrice } = route.params;
  const { addToCart } = useCart();

  const [fries, setFries] = useState<string>('');
  const [drink, setDrink] = useState<string>('');
  const [extra, setExtra] = useState<string>('');

  const basePrice = setPrice ?? 6200;
  const extraPrices: Record<string, number> = { '치즈 스틱': 3500 };
  const addedExtra = extraPrices[extra] || 0;
  const totalPrice = basePrice + addedExtra;

  const handleConfirm = () => {
    const items = [fries, drink];
    if (!fries || !drink) return;
    if (extra) items.push(extra);
    const itemName = `${selectedBurger} 세트 (${items.join(' + ')})`;
    addToCart({ name: itemName, price: totalPrice });
    navigation.navigate('Cart');
  };

  const renderOption = (
    icon: ImageSourcePropType | null,
    label: string,
    selected: boolean,
    onPress: () => void,
    addPrice: number = 0
  ) => (
    <TouchableOpacity
      key={label}
      style={[styles.optionCard, selected && styles.optionCardSelected]}
      onPress={onPress}
    >
      {icon && <Image source={icon} style={styles.optionIcon} />}
      <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
        {label}
      </Text>
      {addPrice > 0 && (
        <Text style={styles.optionPrice}>+₩{addPrice.toLocaleString()}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} style={styles.logo} />
        <Text style={styles.headerTitle}>
          {selectedBurger}{' '}
          <Text style={styles.headerPrice}>₩{totalPrice.toLocaleString()}</Text>
        </Text>
      </View>

      {/* 사이드 */}
      <View style={styles.instructionBox}>
        <View style={styles.instructionHighlight} />
        <Text style={styles.instructionText}>세트메뉴 사이드를 선택하세요</Text>
      </View>
      <View style={styles.optionsContainer}>
        {renderOption(friesIcon, '감자튀김', fries === '감자튀김', () => setFries('감자튀김'))}
        {renderOption(coleslawIcon, '코울슬로', fries === '코울슬로', () => setFries('코울슬로'))}
      </View>

      <View style={styles.divider} />

      {/* 음료 */}
      <View style={styles.instructionBox}>
        <View style={styles.instructionHighlight} />
        <Text style={styles.instructionText}>세트메뉴 음료를 선택하세요</Text>
      </View>
      <View style={styles.optionsContainer}>
        {renderOption(colaIcon, '콜라', drink === '콜라', () => setDrink('콜라'))}
        {renderOption(spriteIcon, '사이다', drink === '사이다', () => setDrink('사이다'))}
      </View>

      <View style={styles.divider} />

      {/* 추가 */}
      <View style={styles.instructionBox}>
        <View style={styles.instructionHighlight} />
        <Text style={styles.instructionText}>추가제품을 선택하세요</Text>
      </View>
      <View style={styles.optionsContainer}>
        {renderOption(null, '선택 안함', extra === '', () => setExtra(''))}
        {renderOption(
          cheeseIcon,
          '치즈 스틱',
          extra === '치즈 스틱',
          () => setExtra('치즈 스틱'),
          extraPrices['치즈 스틱']
        )}
      </View>

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

const styles = StyleSheet.create<{
  container: ViewStyle;
  header: ViewStyle;
  logo: ImageStyle;
  headerTitle: TextStyle;
  headerPrice: TextStyle;
  instructionBox: ViewStyle;
  instructionHighlight: ViewStyle;
  instructionText: TextStyle;
  optionsContainer: ViewStyle;
  divider: ViewStyle;
  optionCard: ViewStyle;
  optionCardSelected: ViewStyle;
  optionIcon: ImageStyle;
  optionLabel: TextStyle;
  optionLabelSelected: TextStyle;
  optionPrice: TextStyle;
  confirmBtn: ViewStyle;
  confirmBtnDisabled: ViewStyle;
  confirmText: TextStyle;
}>({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  logo: { width: 36, height: 36, resizeMode: 'contain', marginRight: 8 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#333' },
  headerPrice: { fontSize: 24, fontWeight: '700', color: '#DA291C' },
  instructionBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#DDD', borderRadius: 6, paddingVertical: 8, paddingHorizontal: 12, marginBottom: 12 },
  instructionHighlight: { width: 4, height: '100%', backgroundColor: '#FFC72C', borderRadius: 2, marginRight: 8 },
  instructionText: { fontSize: 16, color: '#333' },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#DDD', marginVertical: 16 },
  optionCard: { width: '45%', height: 120, borderWidth: 1, borderColor: '#DDD', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  optionCardSelected: { borderColor: '#FFC72C', backgroundColor: '#FFF8E1' },
  optionIcon: { width: 80, height: 80, resizeMode: 'contain', marginBottom: 4 },
  optionLabel: { fontSize: 16, fontWeight: '600', color: '#333', textAlign: 'center' },
  optionLabelSelected: { color: '#DA291C', fontWeight: '700' },
  optionPrice: { fontSize: 14, color: '#DA291C', marginTop: 4 },
  confirmBtn: { backgroundColor: '#FFC72C', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  confirmBtnDisabled: { backgroundColor: '#F0E68C' },
  confirmText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
});
