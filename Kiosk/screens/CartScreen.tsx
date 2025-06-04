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
      const [setBurger, singleBurger, requiredSide, requiredDrink, requiredExtra] = missionItems;
      const hasSetHard = cartItems.some(item =>
        item.name.includes(setBurger) &&
        item.name.includes('세트') &&
        item.name.includes(requiredSide) &&
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

  // ① handleAddFood 수정: “미션 완료 시 음식추가하기 누르면 에러”
  const handleAddFood = () => {
    if (scenario === 'easy') {
      // 쉬움: 미션 아이템이 이미 장바구니에 들어 있으면 에러
      const hasSingle = cartItems.some(item =>
        item.name.includes(missionItems[0])
      );
      if (hasSingle) {
        setShowErrorModal(true);
      } else {
        navigation.navigate('Menu', { scenario, missionItems });
      }
      return;
    }

    if (scenario === 'medium') {
      // 중간: missionItems = [버거1, 버거2]
      const [setBurger, singleBurger] = missionItems;
      const hasSet = cartItems.some(
        item => item.name.includes(setBurger) && item.name.includes('세트')
      );
      const hasSingle = cartItems.some(
        item => item.name.includes(singleBurger) && item.name.includes('단품')
      );

      // 둘 다 들어있으면 에러, 아니면 메뉴로 돌아가서 추가 주문
      if (hasSet && hasSingle) {
        setShowErrorModal(true);
      } else {
        navigation.navigate('Menu', { scenario, missionItems });
      }
      return;
    }

    if (scenario === 'hard') {
      // 어려움: missionItems = [버거1, 버거2, 사이드, 음료, 추가]
      const [setBurger, singleBurger, requiredSide, requiredDrink, requiredExtra] = missionItems;

      const hasSetHard = cartItems.some(item =>
        item.name.includes(setBurger) &&
        item.name.includes('세트') &&
        item.name.includes(requiredSide) &&
        item.name.includes(requiredDrink) &&
        item.name.includes(requiredExtra)
      );
      const hasSingleHard = cartItems.some(item =>
        item.name.includes(singleBurger) &&
        item.name.includes('단품')
      );

      if (hasSetHard && hasSingleHard) {
        setShowErrorModal(true);
      } else {
        navigation.navigate('Menu', { scenario, missionItems });
      }
      return;
    }

    // 그 외(혹시 scenario가 정의되지 않은 경우)
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
