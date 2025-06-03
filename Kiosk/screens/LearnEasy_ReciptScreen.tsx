import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const reciptImage = require('../assets/images/recipt.png');
const homeIcon = require('../assets/images/Home.png');

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LearnEasy_ReciptScreen'
>;

export default function LearnEasy_ReciptScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [step, setStep] = useState(0);

  const goNext = () => {
    if (step === 0) setStep(1);
    else if (step === 1) setStep(2);
    else if (step === 2) navigation.navigate('LearnEasy_CounterScreen');
  };

  const goHome = () => {
    navigation.navigate('KioskSelect');
  };

  return (
    <Pressable style={styles.container} onPress={step === 0 ? goNext : undefined}>
      <StatusBar style="dark" backgroundColor="#ffffff" />

      {/* dim 처리 */}
      {(step === 1 || step === 2) && <View style={styles.dimOverlay} pointerEvents="none" />}

      {/* 안내 문구 */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          결제 완료되었습니다.{'\n'}영수증을 받아가세요
        </Text>
      </View>

      {/* 영수증 이미지 */}
      <Image source={reciptImage} style={styles.image} resizeMode="contain" />

      {/* 하단 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, step === 1 && styles.dimButton, step === 2 && styles.highlightButton]}
          onPress={goNext}
        >
          <Text style={styles.buttonText}>다음단계</Text>
        </TouchableOpacity>
      </View>

      {/* 오른쪽 상단 처음으로 버튼 */}
      <View style={styles.homeWrapper}>
        <TouchableOpacity onPress={goHome} style={styles.homeButton}>
          <Image source={homeIcon} style={styles.homeIcon} />
          <Text style={styles.homeText}>처음으로</Text>
        </TouchableOpacity>
      </View>

      {/* 안내창 */}
      {step === 1 && (
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>결제 완료</Text>
          <Text style={styles.popupText}>
            결제가 완료되었습니다. 실제 주문시에는{'\n'}영수증을 챙기고 나오는 음식을 챙깁니다.
          </Text>
          <TouchableOpacity onPress={goNext} style={styles.nextBtn}>
            <Text style={styles.nextBtnText}>다음</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 말풍선 */}
      {step === 2 && (
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>다음단계 버튼을 터치해보세요</Text>
          <View style={styles.tailDown} />
        </View>
      )}
    </Pressable>
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
  dimOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 5,
  },
  messageContainer: {
    position: 'absolute',
    top: 150,
    alignItems: 'center',
    width: '100%',
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
    zIndex: 10,
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
  highlightButton: {
    borderColor: '#000',
    borderWidth: 2,
    elevation: 4,
  },
  dimButton: {
    opacity: 0.3,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  homeWrapper: {
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
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  homeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  popup: {
    position: 'absolute',
    top: height * 0.38,
    left: width * 0.1,
    right: width * 0.1,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    zIndex: 20,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  popupText: {
    fontSize: 16,
    marginBottom: 14,
    textAlign: 'center',
  },
  nextBtn: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: 8,
  },
  nextBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  speechBubble: {
    position: 'absolute',
    bottom: height * 0.33,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    zIndex: 30,
    elevation: 6,
  },
  speechText: {
    fontSize: 16,
    textAlign: 'center',
  },
  tailDown: {
    position: 'absolute',
    top: 50,
    left: '60%',
    marginLeft: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [{ rotate: '180deg' }],
  },
});
