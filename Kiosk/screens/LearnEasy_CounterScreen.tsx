// src/screens/LearnEasy_CounterScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

const { width, height } = Dimensions.get('window');
const counterImg = require('../assets/images/table.png');
const homeIcon = require('../assets/images/Home.png');

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LearnEasy_CounterScreen'
>;

export default function LearnEasy_CounterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [step, setStep] = useState(0);

  const handleTouchAnywhere = () => {
    if (step === 0) setStep(1);
  };

  const goHome = () => {
    navigation.navigate('KioskSelect');
  };

  return (
    <Pressable
      style={styles.container}
      onPress={handleTouchAnywhere}
      disabled={step !== 0} // step이 0일 때만 화면 터치 허용
    >
      {/* dim 처리 */}
      {step === 1 && <View style={styles.dimOverlay} />}

      {/* 상단 '처음으로' 버튼 */}
      <View style={styles.topRightButton}>
        <TouchableOpacity onPress={goHome} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={homeIcon} style={styles.homeIcon} />
          <Text style={styles.homeText}>처음으로</Text>
        </TouchableOpacity>
      </View>

      {/* 안내 텍스트 */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          주문하신 제품을 카운터에서{'\n'}받아주세요
        </Text>
      </View>

      {/* 카운터 이미지 */}
      <Image source={counterImg} style={styles.image} resizeMode="contain" />

      {/* 처음으로 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { zIndex: 2 }]}
          onPress={() => {
            console.log('눌림');
            navigation.navigate('OrderComplete', {mode: 'learn'});
          }}
        >
          <Text style={styles.buttonText}>처음으로</Text>
        </TouchableOpacity>
      </View>

      {/* 말풍선 */}
      {step === 1 && (
        <View style={styles.speechBubbleWrapper}>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>처음으로 버튼을 터치해보세요</Text>
          </View>
          <View style={styles.speechTail} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dimOverlay: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  topRightButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    borderRadius: 8,
    zIndex: 5,
    alignItems: 'center',
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  homeText: {
    fontSize: 14,
    color: 'black',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 30,
    zIndex: 2,
  },
  messageText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 40,
    zIndex: 0,
  },
  buttonContainer: {
    alignItems: 'center',
    zIndex: 5,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#eee',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  speechBubbleWrapper: {
    position: 'absolute',
    bottom: 110,
    zIndex: 3,
    alignItems: 'center',
  },
  speechBubble: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  speechText: {
    fontSize: 15,
    color: 'black',
  },
  speechTail: {
    width: 0,
    height: 210,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    marginTop: -1,
  },
});
