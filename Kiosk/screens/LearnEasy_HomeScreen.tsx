//LearnEasy_HomeScreen
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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LearnEasy_HomeScreen'>;

export default function LearnEasy_HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [showGuide, setShowGuide] = useState(false);

  const handleTouch = () => setShowGuide(true);
  const handleOrder = () => {
    if (showGuide) navigation.navigate('LearnEasy_LocationScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundFill} />

      <ImageBackground
        source={require('../assets/images/home-ad.png')}
        style={styles.background}
        resizeMode="contain"
      >
        {/* 처음으로 버튼 */}
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
          style={[
            styles.orderButton,
            showGuide && styles.highlightedButton
          ]}
          onPress={handleOrder}
          activeOpacity={1}
        >
          <Text style={styles.orderButtonText}>주문하기</Text>
          <Text style={styles.orderSubText}>(Star Order)</Text>
        </TouchableOpacity>

        {/* 오버레이 */}
        {showGuide && (
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

        {/* 설명 문구 */}
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

        <Pressable style={StyleSheet.absoluteFillObject} onPress={handleTouch} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEBB0D',
  },
  backgroundFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FEBB0D',
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  topRightButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    zIndex: 15,
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  topRightText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  qrBox: {
    position: 'absolute',
    left: 20,
    bottom: 190,
    backgroundColor: '#FEBB0D',
    borderRadius: 18,
    padding: 14,
    width: 160,
    alignItems: 'center',
    zIndex: 5,
  },
  qrText: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  qrImage: {
    width: 50,
    height: 50,
  },
  orderButton: {
    position: 'absolute',
    bottom: 190,
    right: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 10,
    minWidth: 170,
    alignItems: 'center',
    zIndex: 20, // dim 위에 오도록
  },
  highlightedButton: {
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 12,
    backgroundColor: '#ffffff',
    borderColor: '#222',
    borderWidth: 3,
  },
  orderButtonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000',
  },
  orderSubText: {
    fontSize: 11,
    color: '#000',
    marginTop: 4,
  },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 8,
  },
  speechWrapper: {
    position: 'absolute',
    bottom: 310,
    right: 30,
    alignItems: 'flex-end',
    zIndex: 9,
  },
  speechBubble: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    maxWidth: width * 0.8,
    elevation: 5,
  },
  triangle: {
    width: 14,
    height: 12,
    right: 15,
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
    marginTop: -6,
    marginRight: 12,
  },
  bubbleText: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
  },
  infoText: {
    position: 'absolute',
    bottom: 130,
    right: 20,
    fontSize: 11,
    color: '#000',
    width: width - 180,
    textAlign: 'right',
    lineHeight: 16,
    zIndex: 5,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    flexDirection: 'row',
    zIndex: 5,
    gap: 12,
  },
  bottomBtn: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
    minWidth: 110,
    alignItems: 'center',
  },
  bottomBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});
