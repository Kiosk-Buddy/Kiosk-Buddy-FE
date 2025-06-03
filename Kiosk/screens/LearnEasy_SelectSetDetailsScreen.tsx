// LearnEasy_SelectSetDetailsScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useCart } from '../contexts/CartContext';

const { width, height } = Dimensions.get('window');
type Props = NativeStackScreenProps<RootStackParamList, 'LearnEasy_SelectSetDetailsScreen'>;

const logoImg = require('../assets/images/md-logo.png');
const friesIcon = require('../assets/images/fries.png');
const coleslawIcon = require('../assets/images/coleslaw.png');
const colaIcon = require('../assets/images/cola.png');
const spriteIcon = require('../assets/images/sprite.png');
const cheeseIcon = require('../assets/images/cheesesticks.png');
const homeIcon = require('../assets/images/Home.png');

export default function LearnEasy_SelectSetDetailsScreen({ navigation }: Props) {
  const [step, setStep] = useState(0);
  const { addToCart } = useCart();

  const [fries, setFries] = useState('');
  const [drink, setDrink] = useState('');
  const [extra, setExtra] = useState('');

  const selectedBurger = '빅맥';
  const setPrice = 6200;
  const extraPrices: Record<string, number> = { '치즈 스틱': 3500 };
  const addedExtra = extraPrices[extra] || 0;
  const totalPrice = setPrice + addedExtra;

  const isDimmed = step >= 1;
  const highlightTarget = {
    2: '감자튀김',
    3: '콜라',
    4: '선택없음',
    5: '감자튀김',
    6: '콜라',
    7: '선택없음',
    8: '세트선택완료',
  }[step];

  const tooltip = {
    1: { type: 'box', title: '사이드 메뉴 고르기', text: '세트메뉴 주문 시, 세트 안에 포함되는 음료와 사이드 메뉴를 골라야 합니다.', top: height * 0.35 },
    2: { type: 'balloon-next', title: '사이드 선택', text: '세트 메뉴와 함께 나올 사이드를 선택합니다.', top: height * 0.35, tail: 'down' },
    3: { type: 'balloon-next', title: '음료 선택', text: '함께 마실 음료를 선택합니다.', top: height * 0.55, tail: 'down' },
    4: { type: 'balloon-next', title: '추가 메뉴 선택', text: '세트 메뉴와 상관없는 추가 메뉴를 구매할 수 있습니다.\n아래의 숫자는 추가 메뉴의 가격입니다.', top: height * 0.34, tail: 'down' },
    5: { type: 'balloon', title: '', text: '감자튀김을 터치하세요', top: height * 0.35, tail: 'up' },
    6: { type: 'balloon', title: '', text: '콜라를 터치하세요', top: height * 0.55, tail: 'up' },
    7: { type: 'balloon', title: '', text: '선택없음을 터치하세요', top: height * 0.75, tail: 'up' },
    8: { type: 'balloon', title: '', text: '세트선택완료 버튼을 터치하세요', top: height * 0.85, tail: 'up' },
  }[step];

  const getDimStyle = (label: string) => {
    if (!isDimmed) return {};
    if (label === highlightTarget) {
      return { opacity: 1, zIndex: 10, borderWidth: 2, borderColor: '#FFD700' };
    }
    return { opacity: 0.3 };
  };

  const handleConfirm = () => {
    const requiredSide = '감자튀김';
    const requiredDrink = '콜라';
    const requiredExtra = '';
    if (!fries || !drink) return;
    if (fries !== requiredSide || drink !== requiredDrink || extra !== requiredExtra) return;

    const items = [fries, drink, extra].filter(Boolean);
    const itemName = `${selectedBurger} 세트 (${items.join(' + ')})`;
    addToCart({ name: itemName, price: totalPrice });
  };

  const handleStepAdvance = (label: string) => {
    if (
      (step === 5 && label === '감자튀김') ||
      (step === 6 && label === '콜라') ||
      (step === 7 && label === '선택없음') ||
      (step === 8 && label === '세트선택완료')
    ) {
      setStep(step + 1);
    }
  };

  const renderOption = (
    icon: any,
    label: string,
    selected: boolean,
    onPress: () => void,
    addPrice = 0
  ) => {
    const isEnabled = step < 5 || label === highlightTarget;
    const disabled = isDimmed && !isEnabled;
    return (
      <TouchableOpacity
        key={label}
        style={[
          styles.optionCard,
          selected && styles.optionCardSelected,
          getDimStyle(label),
        ]}
        onPress={() => {
          if (!disabled) {
            onPress();
            handleStepAdvance(label);
          }
        }}
        disabled={disabled}
      >
        {icon && <Image source={icon} style={styles.optionIcon} />}
        <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>{label}</Text>
        {addPrice > 0 && <Text style={styles.optionPrice}>+₩{addPrice.toLocaleString()}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <Pressable style={styles.container} onPress={() => step === 0 && setStep(1)}>
      <View style={styles.header}>
        <Image source={logoImg} style={styles.logo} />
        <Text style={styles.headerTitle}>
          {selectedBurger} <Text style={styles.headerPrice}>₩{totalPrice.toLocaleString()}</Text>
        </Text>
      </View>

      {isDimmed && <View style={styles.dimLayer} pointerEvents="none" />}

      {tooltip?.type === 'box' && (
        <View style={[styles.tooltipBox, { top: tooltip.top }]}>
          <Text style={styles.tooltipTitle}>{tooltip.title}</Text>
          <Text style={styles.tooltipContent}>{tooltip.text}</Text>
          <TouchableOpacity style={styles.tooltipBtn} onPress={() => setStep(step + 1)}>
            <Text style={styles.tooltipBtnText}>다음</Text>
          </TouchableOpacity>
        </View>
      )}

      {tooltip?.type?.startsWith('balloon') && (
        <View style={[styles.tooltipBalloon, { top: tooltip.top }]}>
          {tooltip.title !== '' && <Text style={styles.tooltipTitle}>{tooltip.title}</Text>}
          <Text style={styles.tooltipContent}>{tooltip.text}</Text>
          {tooltip.type === 'balloon-next' && (
            <TouchableOpacity style={styles.tooltipBtn} onPress={() => setStep(step + 1)}>
              <Text style={styles.tooltipBtnText}>다음</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.instructionBox}>
        <View style={styles.instructionHighlight} />
        <Text style={styles.instructionText}>세트메뉴 사이드를 선택하세요</Text>
      </View>
      <View style={styles.optionsContainer}>
        {renderOption(friesIcon, '감자튀김', fries === '감자튀김', () => setFries('감자튀김'))}
        {renderOption(coleslawIcon, '코울슬로', fries === '코울슬로', () => setFries('코울슬로'))}
      </View>

      <View style={styles.instructionBox}>
        <View style={styles.instructionHighlight} />
        <Text style={styles.instructionText}>세트메뉴 음료를 선택하세요</Text>
      </View>
      <View style={styles.optionsContainer}>
        {renderOption(colaIcon, '콜라', drink === '콜라', () => setDrink('콜라'))}
        {renderOption(spriteIcon, '사이다', drink === '사이다', () => setDrink('사이다'))}
      </View>

      <View style={styles.instructionBox}>
        <View style={styles.instructionHighlight} />
        <Text style={styles.instructionText}>추가제품을 선택하세요</Text>
      </View>
      <View style={styles.optionsContainer}>
        {renderOption(null, '선택없음', extra === '', () => setExtra(''))}
        {renderOption(cheeseIcon, '치즈 스틱', extra === '치즈 스틱', () => setExtra('치즈 스틱'), 3500)}
      </View>

      <TouchableOpacity
        style={[styles.confirmBtn, getDimStyle('세트선택완료')]}
        onPress={() => {
          handleStepAdvance('세트선택완료');
          handleConfirm();
          navigation.navigate('LearnEasy_CartScreen')
        }}
        disabled={isDimmed && highlightTarget !== '세트선택완료'}
      >
        <Text style={styles.confirmText}>세트선택완료</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => navigation.navigate('KioskSelect')}
      >
        <Image source={homeIcon} style={{ width: 20, height: 20, marginRight: 4 }} />
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>처음으로</Text>
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: { width: 36, height: 36, resizeMode: 'contain', marginRight: 8 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#333' },
  headerPrice: { fontSize: 24, fontWeight: '700', color: '#DA291C' },
  instructionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  instructionHighlight: {
    width: 4,
    height: '100%',
    backgroundColor: '#FFC72C',
    borderRadius: 2,
    marginRight: 8,
  },
  instructionText: { fontSize: 16, color: '#333' },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionCard: {
    width: '45%',
    height: 110,
    backgroundColor: '#fff',
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
  optionIcon: { width: 70, height: 70, resizeMode: 'contain', marginBottom: 4 },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  optionLabelSelected: { color: '#DA291C', fontWeight: '700' },
  optionPrice: { fontSize: 14, color: '#DA291C', marginTop: 4 },
  confirmBtn: {
    backgroundColor: '#FFC72C',
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  dimLayer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 1,
  },
  tooltipBox: {
    position: 'absolute',
    left: '10%',
    right: '10%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    zIndex: 100,
    alignItems: 'center',
  },
  tooltipBalloon: {
    position: 'absolute',
    left: '10%',
    right: '10%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    zIndex: 100,
  },
  tooltipTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  tooltipContent: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  tooltipBtn: {
    marginTop: 14,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  tooltipBtnText: { fontSize: 14, fontWeight: 'bold', color: '#fff' },
  homeBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 200,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
