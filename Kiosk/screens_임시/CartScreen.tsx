// src/screens/CartScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { useCart, CartItem } from '../contexts/CartContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

export default function CartScreen({ route, navigation }: Props) {
  const { scenario, missionItems } = route.params;
  const 난이도한글 = { easy: '쉬움', medium: '중간', hard: '어려움' }[scenario];

  const { cartItems, clearCart } = useCart();
  const [showErrorModal, setShowErrorModal] = useState(false);

  const total = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price,
    0
  );
const handlePay = () => {
  if (scenario === 'medium') {
    const hasSet = cartItems.some(
      item => item.name.includes(missionItems[0]) && item.name.includes('세트')
    );
    const hasSingle = cartItems.some(
      item => item.name.includes(missionItems[1]) && item.name.includes('단품')
    );

    if (hasSet && hasSingle) {
      navigation.navigate('Payselection');
    } else {
      setShowErrorModal(true);
    }

  } else if (scenario === 'hard') {
    const [setBurger, singleBurger, requiredDrink, requiredExtra] = missionItems;
    const hasSetHard = cartItems.some(item =>
      item.name.includes(setBurger) &&
      item.name.includes('세트') &&
      item.name.includes(requiredDrink) &&
      item.name.includes(requiredExtra)
    );
    const hasSingleHard = cartItems.some(item =>
      item.name.includes(singleBurger) &&
      item.name.includes('단품')
    );

    if (hasSetHard && hasSingleHard) {
      navigation.navigate('Payselection');
    } else {
      setShowErrorModal(true);
    }

  } else {
    navigation.navigate('Payselection');
  }
};



  // ─── “음식 추가하기” 버튼을 눌렀을 때 호출되는 함수 ───

  // ─── “음식 추가하기” 버튼을 눌렀을 때 호출되는 함수 ───
  const handleAddFood = () => {
    // 1) EASY 난이도: 미션 버거(단품)만 있으면 추가 불가
    if (scenario === 'easy') {
      const onlyMission = missionItems[0]; // 미션 단품 이름
      const containsOnlyMission = cartItems.some(item =>
        item.name.includes(onlyMission)
      );
      if (containsOnlyMission) {
        // 이미 미션 버거가 있으면 에러
        setShowErrorModal(true);
        return;
      }
      // 아직 미션 버거가 없으면 메뉴로 돌아가서 담을 수 있음
      navigation.navigate('Menu', { scenario, missionItems });
      return;
    }

    // 2) MEDIUM 난이도: 세트+단품이 모두 있으면 추가 불가
    if (scenario === 'medium') {
      const setName = missionItems[0];    // 미션 세트 이름
      const singleName = missionItems[1]; // 미션 단품 이름

      const hasSet = cartItems.some(item =>
        item.name.includes(setName) && item.name.includes('세트')
      );
      const hasSingle = cartItems.some(item =>
        item.name.includes(singleName) && item.name.includes('단품')
      );

      if (hasSet && hasSingle) {
        // 세트+단품 모두 이미 있으면 에러
        setShowErrorModal(true);
        return;
      }
      // 미션을 완성하지 않은 상태라면 메뉴로 돌아가서 담도록
      navigation.navigate('Menu', { scenario, missionItems });
      return;
    }

    // 3) HARD 난이도: “세트 버거(사이드+음료+추가) + 단품”이 모두 있으면 추가 불가
    if (scenario === 'hard') {
      const [setBurger, singleBurger, requiredSide, requiredDrink, requiredExtra] =
        missionItems;

      // “세트(버거+세트)”가 Cart에 들어있는지 확인
      const hasSetHard = cartItems.some(item =>
        item.name.includes(setBurger) &&
        item.name.includes('세트') &&
        item.name.includes(requiredSide) &&
        item.name.includes(requiredDrink) &&
        item.name.includes(requiredExtra)
      );
      // “단품(버거+단품)”이 Cart에 들어있는지 확인
      const hasSingleHard = cartItems.some(item =>
        item.name.includes(singleBurger) && item.name.includes('단품')
      );

      if (hasSetHard && hasSingleHard) {
        // 이미 세트+단품이 모두 있다면 에러
        setShowErrorModal(true);
        return;
      }
      // 미션을 완성하지 않은 상태라면 메뉴로 돌아가서 담도록
      navigation.navigate('Menu', { scenario, missionItems });
      return;
    }

    // 그 외 (기본) 경우 에러 표시
    setShowErrorModal(true);
  };


  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>🛒 장바구니 ({난이도한글})</Text>

      <FlatList<CartItem>
        data={cartItems}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price.toLocaleString()}원</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>장바구니가 비어 있습니다.</Text>
        }
      />

      <Text style={styles.total}>총 합계: {total.toLocaleString()}원</Text>

      <TouchableOpacity
      style={[styles.button, total === 0 && styles.buttonDisabled]}
      disabled={total === 0}
      onPress={handlePay}
      >
        <Text style={styles.buttonText}>결제하기</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
        <Text style={styles.buttonText}>🍔 음식 추가하기</Text>
      </TouchableOpacity>

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
  title: TextStyle;
  itemBox: ViewStyle;
  itemText: TextStyle;
  itemPrice: TextStyle;
  emptyText: TextStyle;
  total: TextStyle;
  button: ViewStyle;
  buttonDisabled: ViewStyle;
  addButton: ViewStyle;
  buttonText: TextStyle;
  modalOverlay: ViewStyle;
  modalContent: ViewStyle;
  modalText: TextStyle;
  modalButton: ViewStyle;
  modalButtonText: TextStyle;
}>({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText: { fontSize: 16 },
  itemPrice: { fontSize: 16, fontWeight: '600' },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
  total: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginTop: 20 },
  button: {
    backgroundColor: '#ff9900',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: { backgroundColor: '#ccc' },
  addButton: {
    backgroundColor: '#00cc66',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
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
});
