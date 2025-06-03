// LearnEasy_LocationScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LearnEasy_LocationScreen'
>;

export default function LearnEasy_LocationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [step, setStep] = useState(0);

  const handleAnywherePress = () => {
    if (step === 0) setStep(1);
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
  };

  const handleSelect = () => {
    if (step === 2) {
      navigation.navigate('LearnEasy_MenuScreen');
    }
  };

  return (
    <View style={styles.container}>
      {(step === 1 || step === 2) && <View style={styles.dim} />}

      {/* 처음으로 버튼 */}
      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => navigation.navigate('KioskSelect')}
      >
        <Image source={require('../assets/images/Home.png')} style={styles.homeIcon} />
        <Text style={styles.homeText}>처음으로</Text>
      </TouchableOpacity>

      {/* 로고 */}
      <Image
        source={require('../assets/images/mini-m.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* 타이틀 */}
      <Text style={styles.title}>식사 장소를 선택해 주세요</Text>

      {/* 매장/포장 선택 */}
      <View style={styles.optionContainer}>
        <View style={[styles.optionBox, step >= 1 && styles.dimmedBox]}>
          <Image
            source={require('../assets/images/table-1.png')}
            style={styles.optionImage}
            resizeMode="contain"
          />
          <Text style={styles.optionText}>매장</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.optionBox,
            step >= 1 && styles.dimmedBox,
            step === 2 && styles.highlightedBox,
          ]}
          disabled={step !== 2}
          onPress={handleSelect}
        >
          <Image
            source={require('../assets/images/bag-1.png')}
            style={styles.optionImage}
            resizeMode="contain"
          />
          <Text style={styles.optionText}>포장</Text>
        </TouchableOpacity>
      </View>

      {/* 안내 말풍선 1단계 */}
      {step === 1 && (
        <View style={styles.messageBox}>
          <Text style={styles.messageTitle}>식사 장소 선택</Text>
          <Text style={styles.messageText}>
            매장에서 식사할 시 매장,{'\n'}포장해서 가져갈 시에는 포장을 선택하면 됩니다
          </Text>
          <TouchableOpacity onPress={handleNext} style={styles.nextBtn}>
            <Text style={styles.nextBtnText}>다음</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 안내 말풍선 2단계 */}
      {step === 2 && (
        <View style={styles.bubbleWrapper}>
          <View style={styles.triangleUp} />
          <View style={styles.speechBubble}>
            <Text style={styles.bubbleText}>포장 버튼을 눌러보세요</Text>
          </View>
        </View>
      )}

      {/* 언어 선택 */}
      <Text style={styles.languageText}>언어를 선택해주세요</Text>
      <View style={styles.languageButtons}>
        <TouchableOpacity style={styles.langBtn}>
          <Text style={styles.langText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.langBtn}>
          <Text style={styles.langText}>한국어</Text>
        </TouchableOpacity>
      </View>

      {/* QR 안내 */}
      <View style={styles.bottomLeftBox}>
        <Text style={styles.qrText}>포인트를 적립하세요.{'\n'}결제 전 선택 필수</Text>
        <Image
          source={require('../assets/images/QR.png')}
          style={styles.qrImage}
          resizeMode="contain"
        />
      </View>

      {/* 도움 기능 */}
      <TouchableOpacity style={styles.helpBtn}>
        <Text style={styles.helpBtnText}>도움기능</Text>
      </TouchableOpacity>

      <Pressable style={StyleSheet.absoluteFillObject} onPress={handleAnywherePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 2,
  },
  homeBtn: {
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
    marginRight: 6,
  },
  homeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  logo: {
    width: 70,
    height: 70,
    marginTop: height * 0.1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 10,
  },
  optionBox: {
    width: 150,
    height: 170,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  highlightedBox: {
    backgroundColor: '#fff',
    zIndex: 4,
  },
  dimmedBox: {
    backgroundColor: '#aaa',
  },
  optionImage: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  messageBox: {
    position: 'absolute',
    top: height * 0.35,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 10,
    zIndex: 5,
    width: width * 0.85,
    alignItems: 'center',
    elevation: 6,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
  },
  nextBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  nextBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bubbleWrapper: {
    position: 'absolute',
    top: height * 0.53,
    right: width * 0.11,
    alignItems: 'center',
    zIndex: 6,
  },
  speechBubble: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    elevation: 4,
    maxWidth: width * 0.65,
  },
  bubbleText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  triangleUp: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
    marginBottom: -6,
  },
  languageText: {
    marginTop: 32,
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  langBtn: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  langText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  bottomLeftBox: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    backgroundColor: '#FEBB0D',
    borderRadius: 18,
    padding: 14,
    width: 180,
    alignItems: 'center',
  },
  qrText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  qrImage: {
    width: 44,
    height: 44,
  },
  helpBtn: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    borderWidth: 1.5,
    borderColor: '#000',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  helpBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
});
