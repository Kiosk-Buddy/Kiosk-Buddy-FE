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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { useCart } from '../contexts/CartContext';

// 네비게이션 & 라우트 타입 정의
type CartNavProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;
type CartRouteProp = RouteProp<RootStackParamList, 'Cart'>;

interface CartItem {
  name: string;
  price: number;
}

export default function CartScreen() {
  const navigation = useNavigation<CartNavProp>();
  const route = useRoute<CartRouteProp>();
  const { scenario = 'medium', missionItems = [] } = route.params ?? {};
  const { cartItems, clearCart } = useCart();

  // 모달 상태: continue(추가 필요), success(완료)
  const [showModal, setShowModal] = useState<{
    type: 'continue' | 'success';
    visible: boolean;
  }>({ type: 'continue', visible: false });

  // 현재 담긴 항목 수
  const currentCount = cartItems.length;
  // 예상 미션 아이템 수
  const targetCount = missionItems.length;

    // 총합 계산 (sum과 item에 타입 명시)
  const total = cartItems.reduce((sum: number, item: CartItem): number => sum + item.price, 0);

  // "음식 추가하기" 버튼 핸들러
  const handleAddMore = () => {
    if (currentCount < targetCount) {
      // 미션 남은 경우, 메뉴 화면으로 돌아가기
      setShowModal({ type: 'continue', visible: true });
    } else {
      // 모두 추가한 경우 성공
      setShowModal({ type: 'success', visible: true });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 장바구니</Text>

      <FlatList<CartItem>
        data={cartItems}
        keyExtractor={(_, index) => index.toString()}
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
        style={[styles.payButton, total === 0 && styles.buttonDisabled]}
        onPress={() => navigation.navigate('Payselection')}
        disabled={total === 0}
      >
        <Text style={styles.buttonText}>결제하기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={handleAddMore}>
        <Text style={styles.buttonText}>🍔 음식 추가하기</Text>
      </TouchableOpacity>

      {/* 모달 창 */}
      <Modal
        transparent
        animationType="fade"
        visible={showModal.visible}
        onRequestClose={() =>
          setShowModal(prev => ({ ...prev, visible: false }))
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {showModal.type === 'continue'
                ? `아직 ${targetCount - currentCount}개가 남았습니다!`
                : '🎉 미션 완수! 축하합니다!'}
            </Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setShowModal(prev => ({ ...prev, visible: false }));
                if (showModal.type === 'continue') {
                  navigation.navigate('Menu', { scenario, missionItems });
                } else {
                  clearCart();
                  navigation.navigate('Payselection');
                }
              }}
            >
              <Text style={styles.modalButtonText}>
                {showModal.type === 'continue' ? '추가하러 가기' : '결제하기'}
              </Text>
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
  payButton: ViewStyle;
  buttonDisabled: ViewStyle;
  addButton: ViewStyle;
  buttonText: TextStyle;
  modalOverlay: ViewStyle;
  modalContent: ViewStyle;
  modalText: TextStyle;
  modalButton: ViewStyle;
  modalButtonText: TextStyle;
}>({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 20,
  },
  payButton: {
    backgroundColor: '#ff9900',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#00cc66',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 280,
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
