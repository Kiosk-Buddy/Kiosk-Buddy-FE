import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function FoodSelectScreen({ navigation }) {
  const burgers = ['불고기버거', '치즈버거', '더블비프버거'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🍔 원하는 햄버거를 선택하세요</Text>
      {burgers.map((burger) => (
        <TouchableOpacity
          key={burger}
          style={styles.button}
          onPress={() => navigation.navigate('ChooseSetOrSingle', { selectedBurger: burger })}
        >
          <Text style={styles.buttonText}>{burger}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.buttonText}>🛒 장바구니 보기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  button: {
    backgroundColor: '#ffcc00',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  cartButton: {
    backgroundColor: '#00cc66',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: { fontSize: 18, fontWeight: 'bold' },
});
