// src/screens/SelectSetDetailsScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useCart } from '../contexts/CartContext';

const { height } = Dimensions.get('window');

const logoImg = require('../assets/images/md-logo.png');
const homeIcon = require('../assets/images/Home.png');
const friesIcon = require('../assets/images/fries.png');
const coleslawIcon = require('../assets/images/coleslaw.png');
const colaIcon = require('../assets/images/cola.png');
const spriteIcon = require('../assets/images/sprite.png');
const cheeseIcon = require('../assets/images/cheesesticks.png');

type Props = NativeStackScreenProps<RootStackParamList, 'SelectSetDetails'>;

export default function SelectSetDetailsScreen({ navigation, route }: Props) {
  const {
    selectedBurger,    // ex: '빅맥'
    setPrice,          // ex: 6200 (세트 기본가)
    scenario,          // 'easy' | 'medium' | 'hard'
    missionItems = [], // ex: ['빅맥','치즈버거'] or ['빅맥','치즈버거','감자튀김','콜라','치즈 스틱']
    requiredSide,      // hard 시퀀스 또는 학습용일 때 필요
    requiredDrink,
    requiredExtra,
    mode = 'test',
    currentStep,
  } = route.params;

  const { addToCart } = useCart();
  const [fries, setFries] = useState('');
  const [drink, setDrink] = useState('');
  const [extra, setExtra] = useState('');
  const [step, setStep] = useState(0);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showMissionModal, setShowMissionModal] = useState(false);

  const basePrice = setPrice ?? 6200;
  const totalPrice = basePrice + (extra === '치즈 스틱' ? 3500 : 0);

  const isLearn = mode === 'learn';
  const isMedium = scenario === 'medium';
  const isHard = scenario === 'hard' && (currentStep === 0 || currentStep === 2);
  const isStepFlow = isLearn && (isMedium || isHard);

  const isCurrentSetStep = (stepNum: number, label: string) => {
    if (step === 0) return requiredSide === label;
    if (step === 1) return requiredDrink === label;
    if (step === 2) return requiredExtra === label;
    return false;
  };

  const handleSelect = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    targetStep: number
  ) => {
    if (isStepFlow && step !== targetStep) return;
    setter(value);
    if (isStepFlow) setStep(prev => prev + 1);
  };

  // ① 전체 미션 텍스트
  const getMissionText = () => {
    if (scenario === 'easy' && missionItems.length === 1) {
      return `미션: ${missionItems[0]} 단품 1개 주문하기`;
    }
    if (scenario === 'medium' && missionItems.length === 2) {
      return `미션:\n1) ${missionItems[0]} 세트 1개 주문하기\n2) ${missionItems[1]} 단품 1개 주문하기`;
    }
    if (scenario === 'hard' && missionItems.length === 5) {
      const [setBurger, singleBurger, side, drink, extra] = missionItems;
      return `미션:\n1) ${setBurger} 세트 1개 주문하기\n   - 포함 항목: ${side}, ${drink}, ${extra}\n2) ${singleBurger} 단품 1개 주문하기`;
    }
    return '미션 정보가 없습니다.';
  };

  // ② 단계별 말풍선 힌트
  const getBubbleText = () => {
    if (!isStepFlow) return '';
    if (scenario === 'medium') {
      switch (step) {
        case 0:
          return requiredSide === '감자튀김'
            ? '감자튀김을 터치하세요'
            : '코울슬로를 터치하세요';
        case 1:
          return requiredDrink === '콜라'
            ? '콜라를 터치하세요'
            : '사이다를 터치하세요';
        case 2:
          return requiredExtra === ''
            ? '선택 없음을 터치하세요'
            : '치즈스틱을 터치하세요';
        case 3:
          return '세트선택완료 버튼을 터치하세요';
      }
    } else if (scenario === 'hard' && currentStep === 0) {
      switch (step) {
        case 0:
          return '감자튀김을 터치하세요';
        case 1:
          return '콜라를 터치하세요';
        case 2:
          return '선택 없음을 터치하세요';
        case 3:
          return '세트선택완료 버튼을 터치하세요';
      }
    } else if (scenario === 'hard' && currentStep === 2) {
      switch (step) {
        case 0:
          return '코울슬로를 터치하세요';
        case 1:
          return '사이다를 터치하세요';
        case 2:
          return '치즈 스틱을 터치하세요';
        case 3:
          return '세트선택완료 버튼을 터치하세요';
      }
    }
    return '';
  };

  // ③ “확인” 눌렀을 때: 중간 난이도는 사이드 선택 없이 곧바로 장바구니 담기
  const handleConfirm = () => {
    if (isMedium) {
      // 중간 난이도: missionItems = [버거1, 버거2]
      // 첫 번째(세트)만 담도록 -> `${selectedBurger} 세트` 형태로 바로 넣기
      const name = `${selectedBurger} 세트`;
      addToCart({ name, price: basePrice });
      navigation.navigate('Cart', { scenario, missionItems, mode, currentStep });
      return;
    }

    // 나머지: easy/hard/learn 모드 기존 로직
    if (!fries || !drink) return;

    if (
      isStepFlow &&
      (fries !== requiredSide || drink !== requiredDrink || extra !== requiredExtra)
    ) {
      setShowErrorModal(true);
      return;
    }

    const items = [fries, drink, extra].filter(Boolean);
    const name = `${selectedBurger} 세트 (${items.join(' + ')})`;
    addToCart({ name, price: totalPrice });

    navigation.navigate('Cart', { scenario, missionItems, mode, currentStep });
  };

  const renderOption = (
    icon: any,
    label: string,
    selected: boolean,
    onPress: () => void,
    addPrice = 0,
    disabled = false
  ) => (
    <TouchableOpacity
      style={[
        styles.optionCard,
        selected && styles.optionCardSelected,
        isStepFlow &&
          !selected &&
          step <= 2 &&
          isCurrentSetStep(step, label) &&
          styles.highlighted,
        isStepFlow && step <= 2 && step !== 3 && !isCurrentSetStep(step, label) && { opacity: 0.3 },
      ]}
      onPress={() => {
        if (!disabled) onPress();
      }}
      disabled={isStepFlow && step <= 2 && !selected && !isCurrentSetStep(step, label)}
    >
      {icon && <Image source={icon} style={styles.optionIcon} />}
      <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>{label}</Text>
      {addPrice > 0 && <Text style={styles.optionPrice}>+₩{addPrice}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* ─── “처음으로” 버튼 (학습 모드) ─── */}
      {isLearn && (
        <TouchableOpacity
          style={styles.topRightButton}
          onPress={() => navigation.navigate('KioskSelect')}
        >
          <Image source={homeIcon} style={styles.homeIcon} />
          <Text style={styles.topRightText}>처음으로</Text>
        </TouchableOpacity>
      )}

      {/* ─── 로고 + 총 가격 ─── */}
      <View style={styles.header}>
        <Image source={logoImg} style={styles.logo} />
        <Text style={styles.headerTitle}>
          {selectedBurger}{' '}
          <Text style={styles.headerPrice}>₩{totalPrice.toLocaleString()}</Text>
        </Text>
      </View>

      {/* 중간 난이도라면, “사이드/음료/추가” UI를 보여주지 않고 바로 버튼만 표시 */}
      {isMedium ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.mediumNotice}>
            “{selectedBurger} 세트“ 주문 (사이드·음료·추가 없음)
          </Text>
        </View>
      ) : (
        <>
          {/* ─── 사이드 선택 ─── */}
          <View style={styles.instructionBox}>
            <View style={styles.instructionHighlight} />
            <Text style={styles.instructionText}>세트메뉴 사이드를 선택하세요</Text>
          </View>
          <View style={styles.optionsContainer}>
            {renderOption(
              friesIcon,
              '감자튀김',
              fries === '감자튀김',
              () => handleSelect(setFries, '감자튀김', 0)
            )}
            {renderOption(
              coleslawIcon,
              '코울슬로',
              fries === '코울슬로',
              () => handleSelect(setFries, '코울슬로', 0)
            )}
          </View>

          {/* ─── 음료 선택 ─── */}
          <View style={styles.instructionBox}>
            <View style={styles.instructionHighlight} />
            <Text style={styles.instructionText}>세트메뉴 음료를 선택하세요</Text>
          </View>
          <View style={styles.optionsContainer}>
            {renderOption(
              colaIcon,
              '콜라',
              drink === '콜라',
              () => handleSelect(setDrink, '콜라', 1)
            )}
            {renderOption(
              spriteIcon,
              '사이다',
              drink === '사이다',
              () => handleSelect(setDrink, '사이다', 1)
            )}
          </View>

          {/* ─── 추가 선택 ─── */}
          <View style={styles.instructionBox}>
            <View style={styles.instructionHighlight} />
            <Text style={styles.instructionText}>추가제품을 선택하세요</Text>
          </View>
          <View style={styles.optionsContainer}>
            {renderOption(
              null,
              '선택 없음',
              extra === '',
              () => handleSelect(setExtra, '', 2)
            )}
            {renderOption(
              cheeseIcon,
              '치즈 스틱',
              extra === '치즈 스틱',
              () => handleSelect(setExtra, '치즈 스틱', 2),
              3500
            )}
          </View>

          {/* ─── 말풍선(단계별 힌트) ─── */}
          {isStepFlow && step <= 3 && (
            <View style={styles.bubbleWrapper}>
              <View style={styles.bubble}>
                <Text style={styles.bubbleText}>{getBubbleText()}</Text>
              </View>
              <View style={styles.triangle} />
            </View>
          )}
        </>
      )}

      {/* ─── 세트선택완료 버튼 ─── */}
      <TouchableOpacity
        style={[
          styles.confirmBtn,
          // 중간 난이도일 때는 무조건 활성화 → !필요한 값 조건 빼버림
          (!isMedium && (!fries || !drink || (isStepFlow && step < 3))) &&
            styles.confirmBtnDisabled,
        ]}
        onPress={handleConfirm}
        // 중간 난이도는 무조건 눌림, 그 외는 기존 조건
        disabled={!isMedium && (!fries || !drink || (isStepFlow && step < 3))}
      >
        <Text style={styles.confirmText}>세트 선택 완료</Text>
      </TouchableOpacity>

      {/* ─── 미션 보기 버튼 ─── */}
      <TouchableOpacity style={styles.missionButton} onPress={() => setShowMissionModal(true)}>
        <Text style={styles.missionButtonText}>미션 보기</Text>
      </TouchableOpacity>

      {/* ─── 잘못된 선택 모달 ─── */}
      <Modal transparent animationType="fade" visible={showErrorModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>잘못된 선택입니다</Text>
            <Pressable style={styles.modalButton} onPress={() => setShowErrorModal(false)}>
              <Text style={styles.modalButtonText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* ─── 미션 보기 모달 ─── */}
      <Modal transparent animationType="slide" visible={showMissionModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{getMissionText()}</Text>
            <Pressable style={styles.modalButton} onPress={() => setShowMissionModal(false)}>
              <Text style={styles.modalButtonText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: height * 0.05,
  },
  topRightButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    zIndex: 5,
    alignItems: 'center',
  },
  homeIcon: { width: 20, height: 20, marginRight: 6 },
  topRightText: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  logo: { width: 30, height: 30, resizeMode: 'contain', marginRight: 6 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#333' },
  headerPrice: { fontSize: 20, fontWeight: '700', color: '#DA291C' },

  // 중간 난이도 텍스트
  mediumNotice: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 40,
    color: '#333',
  },

  instructionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  instructionHighlight: {
    width: 4,
    height: '100%',
    backgroundColor: '#FFC72C',
    borderRadius: 2,
    marginRight: 8,
  },
  instructionText: { fontSize: 14, color: '#333' },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  optionCard: {
    width: '45%',
    height: 100,
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
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  optionLabelSelected: { color: '#DA291C', fontWeight: '700' },
  optionPrice: { fontSize: 12, color: '#DA291C', marginTop: 4 },
  confirmBtn: {
    backgroundColor: '#FFC72C',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmBtnDisabled: { backgroundColor: '#F0E68C' },
  confirmText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  highlighted: {
    borderColor: '#FF3366',
    borderWidth: 2,
    zIndex: 5,
  },
  bubbleWrapper: {
    position: 'absolute',
    bottom: height * 0.22,
    alignSelf: 'center',
    alignItems: 'center',
  },
  bubble: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  bubbleText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
  },
  triangle: {
    width: 14,
    height: 14,
    top: '-90%',
    right: 20,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
    marginTop: -6,
  },
  missionButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#28a745',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 4,
  },
  missionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
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
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
