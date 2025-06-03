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
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const creditImage = require('../assets/images/credit.png');
const homeIcon = require('../assets/images/Home.png');

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LearnEasy_PayprogressScreen'
>;

export default function LearnEasy_PayprogressScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step === 0) setStep(1);
    else if (step === 1) setStep(2);
    else if (step === 2) navigation.navigate('LearnEasy_ReciptScreen');
  };

  const goHome = () => {
    navigation.navigate('KioskSelect');
  };

  return (
    <Pressable style={styles.container} onPress={step === 0 ? handleNext : undefined}>
      <StatusBar style="dark" backgroundColor="#ffffff" />

      <TouchableOpacity onPress={goHome} style={styles.homeButton}>
        <Image source={homeIcon} style={styles.homeIcon} />
        <Text style={styles.homeText}>처음으로</Text>
      </TouchableOpacity>

      {step > 0 && <View style={styles.dim} pointerEvents="none" />}

      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>결제를 진행해 주세요</Text>
      </View>

      <View style={styles.badgeContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>IC신용/체크카드 사용시</Text>
        </View>
      </View>

      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          카드를 화살표 방향으로 투입구에 넣어주세요{'\n'}
          결제 오류 시, 카드를 긁어주세요
        </Text>
      </View>

      <Image source={creditImage} style={styles.image} resizeMode="contain" />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, (step === 1 || step === 2) && styles.dimButton]}
          disabled={step === 1 || step === 2}
        >
          <Text style={styles.buttonText}>이전단계</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, step === 1 && styles.dimButton, step === 2 && styles.highlightButton]}
          
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>다음단계</Text>
        </TouchableOpacity>
      </View>

      {step === 1 && (
        <View style={styles.guideBox}>
          <Text style={styles.guideTitle}>결제 진행 화면</Text>
          <Text style={styles.guideDesc}>
            실제 결제를 진행할 때는 키오스크에 있는{'\n'}
            카드 리더기에 카드를 꽂아야 합니다.
          </Text>
          <TouchableOpacity onPress={handleNext} style={styles.guideButton}>
            <Text style={styles.guideButtonText}>다음</Text>
          </TouchableOpacity>
        </View>
      )}

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
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
  },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  homeButton: {
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
    marginRight: 5,
  },
  homeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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
    zIndex: 2,
  },
  highlightButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#000',
    elevation: 5,
    zIndex: 3,
  },
  dimButton: {
    opacity: 0.3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  guideBox: {
    position: 'absolute',
    top: height * 0.37,
    left: width * 0.1,
    right: width * 0.1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    zIndex: 5,
    elevation: 6,
  },
  guideTitle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  guideDesc: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  guideButton: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: 8,
  },
  guideButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  speechBubble: {
    position: 'absolute',
    bottom: height * 0.3,
    right: 15,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    zIndex: 5,
    elevation: 6,
  },
  speechText: {
    fontSize: 16,
    textAlign: 'center',
  },
  tailDown: {
  position: 'absolute',
  top: 50,
  left: '70%',
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
