import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PaymentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 결제가 완료되었습니다!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
