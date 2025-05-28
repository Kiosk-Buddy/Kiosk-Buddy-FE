// login.tsx

import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function Login() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" />

      {/* 상단 네비게이션 바 (뒤로가기 화살표) */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>

      {/* 로고 */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>로고</Text>
      </View>

      {/* 입력 필드 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="아이디를 입력해 주세요."
          placeholderTextColor="#A3A3A3"
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력해 주세요."
          placeholderTextColor="#A3A3A3"
          secureTextEntry
        />
      </View>

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  navBar: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 159,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});