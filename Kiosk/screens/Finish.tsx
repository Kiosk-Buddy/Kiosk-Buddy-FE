import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function Finish() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" />

      {/* 안내 텍스트 */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          주문이 완료되었습니다.{"\n"}
          영수증에 적힌 주문번호를 확인하고{"\n"}
          매장 안 '제품받는 곳' 모니터 화면에{"\n"}
          주문번호가 표시되면 영수증을 제시하고{"\n"}
          제품을 받아가세요.
        </Text>
      </View>

      {/* 버튼 묶음 */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>처음으로</Text>
        </TouchableOpacity>
      </View>
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
  messageContainer: {
    marginBottom: 200,
  },
  messageText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 28,
  },
  buttonContainer: {
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    borderColor: '#eee',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});