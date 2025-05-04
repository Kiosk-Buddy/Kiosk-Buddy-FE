import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function Recipt() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" />

      {/* 안내 텍스트 */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          주문이 접수되었습니다{'\n'}영수증을 받아가세요
        </Text>
      </View>

      {/* 영수증 이미지 */}
      <Image
        source={require('../assets/images/recipt.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* 버튼 묶음 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>처음으로</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Counter')}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    position: 'absolute',
    top: 150,
    alignItems: 'center',
    width: '100%'
  },
  messageText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 100,
    marginBottom: 100,
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
    color: 'black',
    fontWeight: '500',
  },
});
