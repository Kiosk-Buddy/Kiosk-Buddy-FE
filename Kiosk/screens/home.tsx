// src/screens/home.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Location'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const { scenario, mode } = route.params || {};
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    if (step === 0) setStep(1);
  };

  const handleOrder = () => {
    if (step === 1) navigation.navigate('Location', route.params);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundFill} />

      <ImageBackground
        source={require('../assets/images/home-ad.png')}
        style={styles.background}
        resizeMode="contain"
      >
        {/* 처음으로 버튼: 연습하기 모드일 때만 노출 */}
        {mode === 'learn' && (
        <TouchableOpacity
          style={styles.topRightButton}
          onPress={() => navigation.navigate('KioskSelect')}
        >
        <Image
          source={require('../assets/images/Home.png')}
          style={styles.homeIcon}
          resizeMode="contain"
        />
        <Text style={styles.topRightText}>처음으로</Text>
        </TouchableOpacity>
)}


        {/* QR 박스 */}
        <View style={styles.qrBox}>
          <Text style={styles.qrText}>포인트를 적립하세요.{'\n'}결제 전 선택 필수</Text>
          <Image
            source={require('../assets/images/QR.png')}
            style={styles.qrImage}
            resizeMode="contain"
          />
        </View>

        {/* 주문하기 버튼 */}
        <TouchableOpacity
          style={[styles.orderButton, 
            step === 1 && styles.highlightedButton,
            step === 0 && styles.dimmedButton
          ]}
          onPress={handleOrder}
          activeOpacity={1}
        >
          <Text style={styles.orderButtonText}>주문하기</Text>
        </TouchableOpacity>

        {/* 안내창 (중단계/상단계) */}
        {mode === 'learn' && step === 0 && (
          <>
            <View style={styles.dim} pointerEvents="none" />
            <View style={styles.guideBox}>
              <Text style={styles.guideTitle}>햄버거 주문 연습</Text>
              <Text style={styles.guideDesc}>
                {scenario === 'medium' && (
                  <>빅맥 세트(사이드-감자튀김, 콜라){'\n'}한 개를 포장 주문해봅시다.</>
                )}
                {scenario === 'hard' && (
                  <>
                    빅맥 세트(사이드-감자튀김, 콜라){'\n'}
                    빅맥 단품,{'\n'}
                    빅맥 세트(사이드-코울슬로, 사이다,{'\n'}
                    추가제품-치즈스틱){'\n'}
                    각각 한 개를 포장 주문해봅시다.
                  </>
                )}
              </Text>
              <TouchableOpacity style={styles.guideButton} onPress={handleNextStep}>
                <Text style={styles.guideButtonText}>다음</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* 말풍선 공통 */}
        {mode === 'learn' && step === 1 && (
          <>
            <View style={styles.dim} pointerEvents="none" />
            <View style={styles.speechWrapper}>
              <View style={styles.speechBubble}>
                <Text style={styles.bubbleText}>
                  주문을 시작하려면{'\n'}주문하기 버튼을 눌러주세요!
                </Text>
              </View>
              <View style={styles.triangle} />
            </View>
          </>
        )}

        {/* 영양정보 */}
        <Text style={styles.infoText}>
          일반적인 영양 권장량은 일일 2,000 칼로리지만{'\n'}
          필요한 칼로리는 다를 수 있습니다. 요청 시 추가 영양정보를 제공해 드립니다.
        </Text>

        {/* 하단 버튼 */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.bottomBtn}>
            <Text style={styles.bottomBtnText}>언어 선택</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBtn}>
            <Text style={styles.bottomBtnText}>도움기능</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FEBB0D' },
  backgroundFill: { ...StyleSheet.absoluteFillObject, backgroundColor: '#FEBB0D' },
  background: { width: '100%', height: '100%', justifyContent: 'flex-end' },
  topRightButton: {
    position: 'absolute', top: 60, right: 20, backgroundColor: '#fff',
    paddingVertical: 8, paddingHorizontal: 14, flexDirection: 'row',
    alignItems: 'center', borderRadius: 8, zIndex: 15,
  },
  homeIcon: { width: 20, height: 20, marginRight: 6 },
  topRightText: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  qrBox: {
    position: 'absolute', left: 20, bottom: 190, backgroundColor: '#FEBB0D',
    borderRadius: 18, padding: 14, width: 160, alignItems: 'center', zIndex: 5,
  },
  qrText: { fontSize: 13, fontWeight: 'bold', textAlign: 'center', color: '#000', marginBottom: 10 },
  qrImage: { width: 50, height: 50 },
  orderButton: {
    position: 'absolute', bottom: 190, right: 20, backgroundColor: '#fff',
    borderWidth: 2, borderColor: '#000', paddingVertical: 18, paddingHorizontal: 32,
    borderRadius: 10, minWidth: 170, alignItems: 'center', zIndex: 20,
  },
  highlightedButton: {
    borderColor: '#FF3366', borderWidth: 2,
  },
  orderButtonText: { fontSize: 19, fontWeight: 'bold', color: '#000' },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 8,
  },
  guideBox: {
    position: 'absolute', bottom: 350, left: 20, right: 20,
    backgroundColor: '#fff', borderRadius: 12, padding: 20, zIndex: 9,
  },
  guideTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#000' },
  guideDesc: { fontSize: 15, color: '#000', lineHeight: 22 },
  guideButton: {
    alignSelf: 'flex-end', marginTop: 18,
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#000',
    paddingVertical: 6, paddingHorizontal: 18, borderRadius: 6,
  },
  guideButtonText: { fontSize: 15, fontWeight: 'bold', color: '#000' },
  speechWrapper: {
    position: 'absolute', bottom: 310, right: 30,
    alignItems: 'flex-end', zIndex: 9,
  },
  speechBubble: {
    backgroundColor: '#fff', padding: 20,
    borderRadius: 12, maxWidth: width * 0.8, elevation: 5,
  },
  triangle: {
    width: 11, height: 10, backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
    marginTop: -6, marginRight: 12,
  },
  bubbleText: { fontSize: 15, color: '#000', textAlign: 'center' },
  infoText: {
    position: 'absolute', bottom: 130, right: 20,
    fontSize: 11, color: '#000', width: width - 180, textAlign: 'right', lineHeight: 16, zIndex: 5,
  },
  bottomButtons: {
    position: 'absolute', bottom: 40, right: 20, flexDirection: 'row', zIndex: 5, gap: 12,
  },
  bottomBtn: {
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#000',
    paddingHorizontal: 24, paddingVertical: 10, borderRadius: 6, minWidth: 110, alignItems: 'center',
  },
  bottomBtnText: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  dimmedButton: {
  opacity: 0.4,
  },
});
