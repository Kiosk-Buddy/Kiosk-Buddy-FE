// WaitingScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  Warning: undefined;
};

export default function WaitingScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')} // 로그인 화면으로 이동
      >
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Warning')} // 비회원 이용 주의 화면으로 이동
      >
        <Text style={styles.buttonText}>비회원 이용</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

// 스타일
interface Style {
  container: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  signupText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    width: 200,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});