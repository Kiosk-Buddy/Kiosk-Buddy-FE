import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Loading() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" />

      {/* 커진 로딩 스피너 */}
      <ActivityIndicator size="large" color="red" style={styles.spinner} />

      {/* 안내 텍스트 */}
      <Text style={styles.message}>잠시만 기다려주세요...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  spinner: {
    transform: [{ scale: 2 }],
    marginBottom: 50,
  },
  message: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});