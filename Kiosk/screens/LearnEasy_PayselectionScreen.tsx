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
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

const { width, height } = Dimensions.get('window');

export default function LearnEasy_PayselectionScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [step, setStep] = useState(0);

  const goNext = () => setStep((prev) => prev + 1);
  const goHome = () => navigation.navigate('KioskSelect');

  const handleCardPress = () => {
    if (step !== 3) return; 
      navigation.navigate('LearnEasy_PayprogressScreen');
  };

  const getDimStyle = (target: string) => {
    if (target === 'home') return { opacity: 1 };
    if (target === 'back' && (step===1 ||step === 2 || step === 3)) return { opacity: 0.3 };
    if (step === 1) {
      return { opacity: 0.3 };
    }
    if (step === 2) {
      if (['gift', 'card', 'simple'].includes(target)) return { opacity: 1 };
      return { opacity: 0.3 };
    }
    if (step === 3) {
      if (target === 'card') return { opacity: 1 };
      return { opacity: 0.3 };
    }

    return {};
  };

  return (
    <Pressable style={styles.container} onPress={step === 0 ? goNext : undefined}>
      {/* dim layer */}
      {(step === 1 || step === 2 || step === 3) && <View style={styles.dimOverlay} pointerEvents="none" />}

      {/* 안내 문구 */}
      <Text style={styles.title}>결제 방법을 선택해 주세요</Text>
      <Text style={styles.subtitle}>포인트 적립은 “이전단계” 선택</Text>

      {/* 결제 수단 버튼 */}
      <View style={styles.paymentOptions}>
        <TouchableOpacity style={[styles.paymentButton, getDimStyle('gift')]}>
          <Image source={require('../assets/images/mobile.png')} style={styles.icon} />
          <Text style={styles.optionText}>모바일 상품권</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentButton,
            getDimStyle('card'),
            step === 3 && styles.highlightBorder,
          ]}
          onPress={handleCardPress}
          disabled={step !== 3} 
          >
          <Image source={require('../assets/images/creditcard.png')} style={styles.icon} />
          <Text style={styles.optionText}>카드 결제</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.paymentButton, getDimStyle('simple')]}>
          <Image source={require('../assets/images/kakao.png')} style={styles.icon} resizeMode="contain" />
          <Text style={styles.optionText}>간편 결제</Text>
        </TouchableOpacity>
      </View>

      {/* 처음으로 버튼 (항상 밝게, dim 영향 없음) */}
      <View style={[styles.topRight, getDimStyle('home')]}>
        <TouchableOpacity onPress={goHome} style={styles.homeButton}>
          <Image source={require('../assets/images/Home.png')} style={styles.homeIcon} />
          <Text style={styles.homeText}>처음으로</Text>
        </TouchableOpacity>
      </View>

      {/* 하단 이전단계 버튼 */}
      <View style={[styles.bottomButtons, getDimStyle('back')]}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>이전단계</Text>
        </TouchableOpacity>
      </View>

      {/* step1: 안내창 */}
      {step === 1 && (
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>결제 화면</Text>
          <Text style={styles.popupText}>
            결제 수단을 선택하여 앞에서 고른 음식의 값을 결제합니다.
          </Text>
          <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
            <Text style={styles.nextBtnText}>다음</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* step2: 말풍선 */}
      {step === 2 && (
        <View style={styles.speechBubble}>
          <View style={styles.tailUp} />
          <Text style={styles.bubbleTitle}>결제 방법 고르기</Text>
          <Text style={styles.bubbleText}>
            모바일 상품권, 카드 결제, 간편 결제 등등{'\n'}편한 결제 방법을 고릅니다.
          </Text>
          <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
            <Text style={styles.nextBtnText}>다음</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* step3: 말풍선 */}
      {step === 3 && (
        <View style={styles.speechBubbleCard}>
          <View style={styles.tailUp} />
          <Text style={styles.bubbleText}>카드 결제를 터치하세요</Text>
        </View>
      )}

    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  dimOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 5,
  },
  topRight: {
     position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    borderRadius: 8,
    zIndex: 5,
    alignItems: 'center',
  },
  homeButton: { flexDirection: 'row', alignItems: 'center' },
  homeIcon: { width: 20, height: 20, marginRight: 4 },
  homeText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 100, color: '#333' },
  subtitle: { fontSize: 15, marginVertical: 12 },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    marginBottom: 30,
    zIndex: 10,
  },
  paymentButton: {
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ccc',
    width: 100,
    height: 100,
    justifyContent: 'center',
    backgroundColor: '#fff',
    zIndex: 15,
  },
  icon: { width: 60, height: 60, marginBottom: 10 },
  optionText: { fontSize: 14, color: '#000', textAlign: 'center' },
  bottomButtons: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    zIndex: 20,
  },
  bottomButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  bottomButtonText: { fontSize: 16, fontWeight: '500', color: '#000' },
  highlightBorder: {
    borderColor: '#FFD700',
    borderWidth: 3,
    backgroundColor: '#fff',
    zIndex: 16,
  },
  popup: {
    position: 'absolute',
    top: height * 0.35,
    backgroundColor: '#fff',
    padding: 28,
    borderRadius: 12,
    borderWidth: 0,
    zIndex: 25,
    width: 300,
  },
  popupTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 12,
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
  nextBtnText: { color: '#fff', fontWeight: 'bold' },
  speechBubble: {
    position: 'absolute',
    top: 390,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    zIndex: 30,
    width: 300,
    alignItems: 'center',
  },
  speechBubbleCard: {
    position: 'absolute',
    top: 390,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    zIndex: 30,
    width: 260,
    alignItems: 'center',
  },
  bubbleTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  bubbleText: { fontSize: 15, textAlign: 'center' },
  tailUp: {
    position: 'absolute',
    top: -12,
    left: '50%',
    marginLeft: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 12,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
  },
});
