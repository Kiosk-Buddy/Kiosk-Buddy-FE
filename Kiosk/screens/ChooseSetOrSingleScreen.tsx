
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
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { useCart } from '../contexts/CartContext';

// 네비게이션 & 라우트 타입
type NavProp = NativeStackNavigationProp<RootStackParamList, 'ChooseSetOrSingle'>;
type RouteP = RouteProp<RootStackParamList, 'ChooseSetOrSingle'>;

export default function ChooseSetOrSingleScreen() {
  const navigation = useNavigation<NavProp>();
  const { selectedBurger, singlePrice, scenario, missionItems, requiredType } = useRoute<RouteP>().params;
  const { addToCart, cartItems } = useCart();

  const [showErrorModal, setShowErrorModal] = useState(false);

  // 단품 선택 처리
const handleSingle = () => {
  // medium 난이도에서 같은 버거 세트+단품 미션인 경우
  if (scenario === 'medium' && missionItems[0] === missionItems[1]) {
    // 이미 세트를 담았을 때만 단품 허용
    const setExists = cartItems.some(item => item.name.includes('세트'));
    if (!setExists) {
      setShowErrorModal(true);
      return;
    }
  }
  // 일반 미션에서는 requiredType이 'single'인지 확인
  else if (requiredType !== 'single') {
    setShowErrorModal(true);
    return;
  }

  addToCart({ name: `${selectedBurger} 단품`, price: singlePrice! });
  navigation.navigate('Cart', { scenario, missionItems });
};


  // 세트 선택 처리
  const handleSet = () => {
    // medium 난이도에서 같은 버거 세트 미션일 때
    if (scenario === 'medium' && missionItems[0] === missionItems[1]) {
      // 세트가 이미 담겼다면 중복 금지
      const setExists = cartItems.some(i => i.name.includes('세트'));
      if (setExists) {
        setShowErrorModal(true);
        return;
      }
    } else if (requiredType !== 'set') {
      // 일반 미션일 땐 requiredType 검사
      setShowErrorModal(true);
      return;
    }
navigation.navigate('SelectSetDetails', {
  selectedBurger,
  setPrice: singlePrice! * 1.5,
  scenario,
  missionItems,
  requiredSide: missionItems[2],   // 사이드 미션 (감자튀김 or 코울슬로)
  requiredDrink: missionItems[3],  // 음료 미션 (콜라 or 사이다)
  requiredExtra: missionItems[4],  // 추가미션 (치즈 스틱)
});
};

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>{selectedBurger}</Text>
        <Text style={styles.prompt}>세트로 드시겠습니까?</Text>

        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.card} onPress={handleSet}>
            <Image source={require('../assets/images/meal.png')} style={styles.cardImage} />
            <Text style={styles.cardLabel}>세트 선택</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleSingle}>
            <Image source={require('../assets/images/burger.png')} style={styles.cardImage} />
            <Text style={styles.cardLabel}>단품 선택</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>취소</Text>
        </TouchableOpacity>
      </View>

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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  prompt: {
    fontSize: 18,
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
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
    marginTop: 10,
  },
  cancelText: {
    fontSize: 16,
    color: '#007bff',
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
