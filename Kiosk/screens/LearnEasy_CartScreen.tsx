//LearnEasy_CartScreen
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { useCart } from '../contexts/CartContext';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const { width, height } = Dimensions.get('window');

const homeIcon = require('../assets/images/Home.png');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LearnEasy_CartScreen'>;

export default function LearnEasy_CartScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { cartItems, clearCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const [step, setStep] = useState(0);
  useFocusEffect(
  useCallback(() => {
    return () => {
      clearCart();
    };
  }, [clearCart])
);
  const handleInitialTouch = () => {
    if (step === 0) setStep(1);
  };

  const handleNextStep = () => {
    if (step < 5) setStep(prev => prev + 1);
  };

  const handleGoHome = () => {
    navigation.navigate('KioskSelect');
  };

  const handlePayment = () => {
    if (step === 5) {
      navigation.navigate('LearnEasy_PayselectionScreen');
    }
  };

  const renderItem = ({ item, index }: any) => (
    <View
      style={[
        styles.itemBox,
        step === 2 ? (index === 0 ? styles.highlight : styles.dimmed) : null,
      ]}
    >
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.price.toLocaleString()}원</Text>
    </View>
  );

  return (
    <Pressable style={styles.container} onPress={handleInitialTouch}>
      {/* dim 처리 - 맨 아래 배치 */}
      {step >= 1 && <View style={styles.dimView} pointerEvents="none" />}
      <View style={styles.header} pointerEvents="box-none">
        <Text style={styles.title}>🛒 장바구니</Text>
        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Image source={homeIcon} style={styles.homeIcon} />
          <Text style={styles.homeText}>처음으로</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentArea}>
        <FlatList
          data={cartItems}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />

        <Text style={styles.total}>총 합계: {total.toLocaleString()}원</Text>

        <View style={styles.buttonBoxColumn}>
          <TouchableOpacity
            style={[
              styles.payButton,
              step >= 1 && step !== 4 && step !== 5 && styles.dimmed,
              (step === 4 || step === 5) && styles.highlight,
            ]}
            onPress={handlePayment}
          >
            <Text style={styles.buttonText}>결제하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.addButton,
              step >= 1 && step !== 3 && styles.dimmed,
              step === 3 && styles.highlight,
            ]}
            //onPress={() => navigation.navigate('LearnEasy_MenuScreen')}
          >
            <Text style={styles.buttonText}>🍔 음식 추가하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 안내창 및 말풍선 */}
      {step === 1 && (
        <View style={styles.guideBox}>
          <Text style={styles.guideTitle}>장바구니 화면</Text>
          <Text style={styles.guideDesc}>주문하기 위해 담았던 메뉴들을 확인하고 가격을 보는 화면입니다.</Text>
          <TouchableOpacity style={styles.nextBtn} onPress={handleNextStep}>
            <Text style={styles.nextBtnText}>다음</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={[styles.balloon, { top: height * 0.26, left: width * 0.25 }]}>
          <Text style={styles.balloonTitle}>메뉴 확인</Text>
          <Text style={styles.balloonDesc}>주문한 음식과 음식의 가격을 확인합니다.</Text>
          <TouchableOpacity style={styles.nextBtn} onPress={handleNextStep}>
            <Text style={styles.nextBtnText}>다음</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <View style={[styles.balloon, { bottom: height * 0.24, left: width * 0.13 }]}>
          <Text style={styles.balloonTitle}>음식 추가</Text>
          <Text style={styles.balloonDesc}>더 주문하고 싶은 음식을 추가하러 갈 수 있습니다.</Text>
          <TouchableOpacity style={styles.nextBtn} onPress={handleNextStep}>
            <Text style={styles.nextBtnText}>다음</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 4 && (
        <View style={[styles.balloon, { bottom: height * 0.24, left: width * 0.25 }]}>
          <Text style={styles.balloonTitle}>결제하기</Text>
          <Text style={styles.balloonDesc}>음식을 다 골랐다면 결제를 할 수 있습니다.</Text>
          <TouchableOpacity style={styles.nextBtn} onPress={handleNextStep}>
            <Text style={styles.nextBtnText}>다음</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 5 && (
        <View style={[styles.balloon, { bottom: height * 0.24, left: width * 0.25 }]}>
          <Text style={styles.balloonDesc}>결제하기 버튼을 터치해보세요</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dimView: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    zIndex: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 1.0,
    zIndex: 3,
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  homeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  list: {
    paddingBottom: 12,
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 20,
  },
  buttonBoxColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 40,
  },
  payButton: {
    backgroundColor: '#FFD233',
    padding: 14,
    borderRadius: 8,
    width: width * 0.8,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 10,
    width: width * 0.8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  guideBox: {
    position: 'absolute',
    top: height * 0.3,
    left: width * 0.1,
    width: width * 0.8,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    zIndex: 2,
    elevation: 5,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  guideDesc: {
    fontSize: 14,
    marginBottom: 12,
  },
  nextBtn: {
    backgroundColor: '#222',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  nextBtnText: {
    color: 'white',
    fontSize: 14,
  },
  balloon: {
    position: 'absolute',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 12,
    padding: 14,
    width: width * 0.7,
    zIndex: 2,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  balloonTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  balloonDesc: {
    fontSize: 14,
    alignItems: 'center',
  },
  dimmed: {
    opacity: 0.3,
  },
  highlight: {
    opacity: 1.0,
    zIndex: 3,
    borderColor: '#FFD700',
    borderWidth: 2,
    elevation: 6,
  },
});
