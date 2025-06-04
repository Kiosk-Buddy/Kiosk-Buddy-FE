// src/screens/SelectSetDetailsScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Pressable,
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
  // route.params로 전달된 값들
  const {
    selectedBurger,
    setPrice,
    scenario,
    missionItems,
    requiredSide,   // 예: '감자튀김'
    requiredDrink,  // 예: '콜라'
    requiredExtra,  // 예: '치즈 스틱' 또는 ''(추가 옵션 없음)
  } = route.params;

  const { addToCart } = useCart();

  const [fries, setFries] = useState<string>('');
  const [drink, setDrink] = useState<string>('');
  const [extra, setExtra] = useState<string>('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  // 기본 세트 가격(ChooseSetOrSingle에서 전달된 setPrice가 없으면 6200원으로 처리)
  const basePrice = setPrice ?? 6200;
  // 추가 옵션 가격 맵 (현재 '치즈 스틱'만 유료)
  const extraPrices: Record<string, number> = { '치즈 스틱': 3500 };
  const addedExtra = extraPrices[extra] || 0;
  const totalPrice = basePrice + addedExtra;

  const handleConfirm = () => {
    // 0) 사이드/음료이 두 개는 반드시 선택되어 있어야 함
    if (!fries || !drink) {
      // 버튼을 비활성화해두었다면 도달할 일은 없지만, 안전하게 리턴
      return;
    }

    // 1) “선택된 사이드가 미션에 지정된 requiredSide와 동일하지 않으면” 에러
    if (fries !== requiredSide) {
      setShowErrorModal(true);
      return;
    }

    // 2) “선택된 음료가 미션에 지정된 requiredDrink와 동일하지 않으면” 에러
    if (drink !== requiredDrink) {
      setShowErrorModal(true);
      return;
    }

    // 3) “추가 옵션(requiredExtra)” 검사:
    //    requiredExtra가 빈 문자열("")인 경우 → 사용자가 extra도 ''(선택 안함)이어야 통과
    //    requiredExtra가 non-empty인 경우 → 사용자가 반드시 같은 값을 골라야 통과
    const shouldMatchExtra = requiredExtra === '' ? extra === '' : extra === requiredExtra;
    if (!shouldMatchExtra) {
      setShowErrorModal(true);
      return;
    }

    // 위 세 가지 모두 통과했을 때만 장바구니에 추가
    const items = [fries, drink, extra].filter(item => item !== '');
    const itemName = `${selectedBurger} 세트 (${items.join(' + ')})`;

    addToCart({ name: itemName, price: totalPrice });
    navigation.navigate('Cart', { scenario, missionItems });
  };

  // 옵션 카드 렌더링 함수 (기존 코드와 동일)
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

      {/* ① 사이드 선택 */}
      <View style={styles.instructionBox}>
        <View style={styles.instructionHighlight} />
        <Text style={styles.instructionText}>세트메뉴 사이드를 선택하세요</Text>
      </View>
      <View style={styles.optionsContainer}>
        {renderOption(
          friesIcon,
          '감자튀김',
          fries === '감자튀김',
          () => setFries('감자튀김')
        )}
        {renderOption(
          coleslawIcon,
          '코울슬로',
          fries === '코울슬로',
          () => setFries('코울슬로')
        )}
      </View>

      <View style={styles.divider} />

      {/* ② 음료 선택 */}
      <View style={styles.instructionBox}>
        <View style={styles.instructionHighlight} />
        <Text style={styles.instructionText}>세트메뉴 음료를 선택하세요</Text>
      </View>
      <View style={styles.optionsContainer}>
        {renderOption(
          colaIcon,
          '콜라',
          drink === '콜라',
          () => setDrink('콜라')
        )}
        {renderOption(
          spriteIcon,
          '사이다',
          drink === '사이다',
          () => setDrink('사이다')
        )}
      </View>

      <View style={styles.divider} />

      {/* ③ 추가 제품 선택 */}
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

      {/* ④ 확인 버튼 (사이드/음료 둘 다 선택되지 않았다면 disabled) */}
      <TouchableOpacity
        style={[
          styles.confirmBtn,
          !(fries && drink) && styles.confirmBtnDisabled,
        ]}
        onPress={handleConfirm}
        disabled={!(fries && drink)}
      >
        <Text style={styles.confirmText}>세트 선택 완료</Text>
      </TouchableOpacity>

      {/* 잘못된 선택 모달 */}
      <Modal
        transparent
        animationType="fade"
        visible={showErrorModal}
        onRequestClose={() => setShowErrorModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>잘못된 선택입니다</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setShowErrorModal(false)}
            >
              <Text style={styles.modalButtonText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalOverlay: ViewStyle;
  modalContent: ViewStyle;
  modalText: TextStyle;
  modalButton: ViewStyle;
  modalButtonText: TextStyle;
}>( {
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
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
    marginBottom: 12,
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
  divider: { height: 1, backgroundColor: '#DDD', marginVertical: 16 },
  optionCard: {
    width: '45%',
    height: 120,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionCardSelected: { borderColor: '#FFC72C', backgroundColor: '#FFF8E1' },
  optionIcon: { width: 80, height: 80, resizeMode: 'contain', marginBottom: 4 },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  optionLabelSelected: { color: '#DA291C', fontWeight: '700' },
  optionPrice: { fontSize: 14, color: '#DA291C', marginTop: 4 },
  confirmBtn: {
    backgroundColor: '#FFC72C',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmBtnDisabled: { backgroundColor: '#F0E68C' },
  confirmText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  modalOverlay: {
   flex: 1,
   backgroundColor: 'rgba(0,0,0,0.5)',
   justifyContent: 'center',
   alignItems: 'center',
 },
  modalContent: {
   width: 250,
   backgroundColor: '#fff',
   borderRadius: 8,
   padding: 20,
   alignItems: 'center',
 },
  modalText: { fontSize: 18, marginBottom: 20 },
  modalButton: {
   backgroundColor: '#28a745',
   borderRadius: 5,
   paddingHorizontal: 20,
   paddingVertical: 8,
 },
  modalButtonText: { color: '#fff', fontSize: 16 },
} );
