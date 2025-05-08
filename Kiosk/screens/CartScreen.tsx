// src/screens/CartScreen.tsx

import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useCart } from '../contexts/CartContext';

// App.tsx에 정의된 ParamList와 매치
type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

interface CartItem {
  name: string;
  price: number;
}

export default function CartScreen({ navigation }: Props) {
  const { cartItems, clearCart } = useCart();
  const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.price, 0);

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
        ListEmptyComponent={<Text style={styles.emptyText}>장바구니가 비어 있습니다.</Text>}
      />

      <Text style={styles.total}>총 합계: {total.toLocaleString()}원</Text>

      <TouchableOpacity
        style={[styles.button, total === 0 && styles.buttonDisabled]}
        onPress={() => navigation.navigate('Payment')}
        disabled={total === 0}
      >
        <Text style={styles.buttonText}>결제하기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('menu')}
      >
        <Text style={styles.buttonText}>🍔 음식 추가하기</Text>
      </TouchableOpacity>
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
  button: {
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
});
