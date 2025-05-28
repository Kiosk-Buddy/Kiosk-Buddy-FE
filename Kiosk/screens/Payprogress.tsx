import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RootStackParamList } from '../App';

export default function Payselection() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" />

      {/* 안내 텍스트 */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>결제를 진행해 주세요</Text>
      </View>

      {/* 빨간 배지 */}
      <View style={styles.badgeContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>IC신용/체크카드 사용시</Text>
        </View>
      </View>

      {/* 카드 안내 텍스트 */}
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          카드를 화살표 방향으로 투입구에 넣어주세요{"\n"}
          결제 오류 시, 카드를 긁어주세요
        </Text>
      </View>

      {/* 카드 이미지 */}
      <Image
        source={require('../assets/images/credit.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* 버튼 묶음 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>이전단계</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recipt')}>
          <Text style={styles.buttonText}>다음단계</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  messageContainer: {
    position: 'absolute',
    top: 150,
    alignItems: 'center',
    width: '100%',
  },
  messageText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  badgeContainer: {
    marginBottom: 10,
    marginTop: 250,
  },
  badge: {
    backgroundColor: '#ff3b30',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  instructionContainer: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  image: {
    width: 220,
    height: 160,
    marginBottom: 85,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 4,
    marginHorizontal: 30,
    borderColor: '#eee',
    borderWidth: 1.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});