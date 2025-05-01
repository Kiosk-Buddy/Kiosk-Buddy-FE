import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../contexts/CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, clearCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 장바구니</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price.toLocaleString()}원</Text>
          </View>
        )}
      />

      <Text style={styles.total}>총 합계: {total.toLocaleString()}원</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Payment')}>
        <Text style={styles.buttonText}>결제하기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('FoodSelect')}>
        <Text style={styles.buttonText}>🍔 음식 추가하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  total: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginTop: 20 },
  button: {
    backgroundColor: '#ff9900',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#00cc66',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
});
