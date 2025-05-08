// src/screens/WarningScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Warning: undefined;
  KioskSelect: undefined;
  SignUp: undefined;
};

type WarningNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Warning'
>;

interface WarningScreenProps {
  navigation: WarningNavigationProp;
}

const WarningScreen: React.FC<WarningScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/warning.png')}
        style={styles.icon}
      />
      <Text style={styles.warning}>⚠️ 주의</Text>
      <Text style={styles.text}>
        회원가입을 하지 않으면{'\n'}
        [학습 정보]를 받을 수 없습니다.{'\n'}
        진행하시겠습니까?
      </Text>
      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('KioskSelect')}
        >
          <Text style={styles.buttonText}>네</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>아니요</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WarningScreen;

const styles = StyleSheet.create<{
  container: ViewStyle;
  icon: ImageStyle;
  warning: TextStyle;
  text: TextStyle;
  buttonBox: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  warning: {
    color: 'darkred',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
