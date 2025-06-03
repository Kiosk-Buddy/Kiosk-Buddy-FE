// src/screens/ChooseSetOrSingleScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { useCart } from '../contexts/CartContext';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<RootStackParamList, 'ChooseSetOrSingle'>;
type RouteP = RouteProp<RootStackParamList, 'ChooseSetOrSingle'>;

export default function ChooseSetOrSingleScreen() {
  const navigation = useNavigation<NavProp>();
  const {
    selectedBurger,
    singlePrice,
    scenario,
    missionItems = [],
    requiredType,
    mode = 'test',
    currentStep = 0,
  } = useRoute<RouteP>().params;
  const { addToCart, cartItems } = useCart();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showMissionModal, setShowMissionModal] = useState(false);

  const handleSingle = () => {
    if (mode === 'learn') {
      if (scenario === 'medium' && requiredType !== 'single') {
        setShowErrorModal(true);
        return;
      }
      if (scenario === 'hard') {
        if (currentStep !== 1) {
          setShowErrorModal(true);
          return;
        }
      }
    } else if (requiredType !== 'single') {
      setShowErrorModal(true);
      return;
    }

    addToCart({ name: `${selectedBurger} 단품`, price: singlePrice! });
    navigation.navigate('Cart', {
      scenario,
      missionItems,
      mode,
      currentStep,
    });
  };

  const handleSet = () => {
    if (mode === 'learn') {
      if (scenario === 'medium' && requiredType !== 'set') {
        setShowErrorModal(true);
        return;
      }
      if (scenario === 'hard') {
        if (currentStep !== 0 && currentStep !== 2) {
          setShowErrorModal(true);
          return;
        }
      }
    } else if (requiredType !== 'set') {
      setShowErrorModal(true);
      return;
    }

    navigation.navigate('SelectSetDetails', {
      selectedBurger,
      setPrice: singlePrice! * 1.5,
      scenario,
      missionItems,
      requiredSide: missionItems[2],
      requiredDrink: missionItems[3],
      requiredExtra: missionItems[4],
      mode,
      currentStep,
    });
  };

  const getBubbleText = () => {
    if (mode !== 'learn') return '';
    if (scenario === 'medium') return '세트를 선택해주세요!';
    if (scenario === 'hard') {
      if (currentStep === 0) return '세트를 선택해주세요!';
      if (currentStep === 1) return '단품을 선택해주세요!';
      if (currentStep === 2) return '세트를 선택해주세요!';
    }
    return '';
  };

  const shouldShowBubble = () => {
    return mode === 'learn' && (scenario === 'medium' || currentStep <= 2);
  };

  const getMissionText = () => {
    if (mode === 'learn') {
      return scenario === 'medium'
        ? '미션:\n빅맥 세트(감자튀김, 콜라) 1개 포장 주문'
        : '미션:\n1) 빅맥 세트(감자튀김, 콜라)\n2) 빅맥 단품\n3) 빅맥 세트(코울슬로, 사이다, 치즈스틱)\n각각 1개 포장 주문';
    }

    if (scenario === 'easy' && missionItems.length === 1) {
      return `미션: ${missionItems[0]} 단품 1개 주문하기`;
    }
    if (scenario === 'medium' && missionItems.length === 2) {
      return `미션:\n1) ${missionItems[0]} 세트 1개 주문하기\n2) ${missionItems[1]} 단품 1개 주문하기`;
    }
    if (scenario === 'hard' && missionItems.length === 5) {
      const [setBurger, singleBurger, sideItem, drinkItem, extraItem] = missionItems;
      return `미션:\n1) ${setBurger} 세트 1개 주문하기\n   - 포함 항목: ${sideItem}, ${drinkItem}, ${extraItem}\n2) ${singleBurger} 단품 1개 주문하기`;
    }
    return '미션 정보가 없습니다.';
  };

  return (
    <>
      <View style={styles.container}>
        {/* 처음으로 버튼 */}
        {mode === 'learn' && (
          <TouchableOpacity
            style={styles.topRightButton}
            onPress={() => navigation.navigate('KioskSelect')}
          >
            <Image source={require('../assets/images/Home.png')} style={styles.homeIcon} />
            <Text style={styles.topRightText}>처음으로</Text>
          </TouchableOpacity>
        )}

        {/* 미션 헤더 */}
        <Text style={styles.header}>{selectedBurger}</Text>
        <Text style={styles.prompt}>세트로 드시겠습니까?</Text>

        <View style={styles.cardRow}>
          <TouchableOpacity
            style={[
              styles.card,
              (mode === 'learn' &&
                ((scenario === 'medium' && requiredType === 'set') ||
                  (scenario === 'hard' && (currentStep === 0 || currentStep === 2)))) && styles.highlighted,
            ]}
            onPress={handleSet}
          >
            <Image source={require('../assets/images/meal.png')} style={styles.cardImage} />
            <Text style={styles.cardLabel}>세트 선택</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.card,
              (mode === 'learn' &&
                scenario === 'hard' &&
                currentStep === 1) && styles.highlighted,
            ]}
            onPress={handleSingle}
          >
            <Image source={require('../assets/images/burger.png')} style={styles.cardImage} />
            <Text style={styles.cardLabel}>단품 선택</Text>
          </TouchableOpacity>
        </View>

        {/* 말풍선 */}
        {shouldShowBubble() && (
          <View style={styles.bubbleWrapper}>
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>{getBubbleText()}</Text>
            </View>
            <View style={styles.triangle} />
          </View>
        )}

        {/* 미션 보기 버튼 */}
        <TouchableOpacity
          style={styles.missionButton}
          onPress={() => setShowMissionModal(true)}
        >
          <Text style={styles.missionButtonText}>미션 보기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>취소</Text>
        </TouchableOpacity>
      </View>

      {/* 모달: 잘못된 선택 */}
      <Modal
        transparent
        animationType="fade"
        visible={showErrorModal}
        onRequestClose={() => setShowErrorModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>잘못된 선택입니다</Text>
            <Pressable style={styles.modalButton} onPress={() => setShowErrorModal(false)}>
              <Text style={styles.modalButtonText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* 모달: 미션 보기 */}
      <Modal
        transparent
        animationType="slide"
        visible={showMissionModal}
        onRequestClose={() => setShowMissionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{getMissionText()}</Text>
            <Pressable style={styles.modalButton} onPress={() => setShowMissionModal(false)}>
              <Text style={styles.modalButtonText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: height * 0.1,
    alignItems: 'center',
  },
  topRightButton: {
    position: 'absolute',
    top: 60,
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
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  prompt: {
    fontSize: 17,
    marginBottom: 30,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 30,
  },
  card: {
    width: '40%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  highlighted: {
    borderColor: '#FF3366',
    borderWidth: 2,
  },
  cardImage: {
    width: '60%',
    height: '60%',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelBtn: {
    marginTop: 8,
  },
  cancelText: {
    fontSize: 16,
    color: '#007bff',
  },
  missionButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
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
  bubbleWrapper: {
    position: 'absolute',
    bottom: height * 0.55,
    right: 190,
    zIndex: 5,
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
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
    marginTop: -6,
    top: '-90%',
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: '#000',
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
