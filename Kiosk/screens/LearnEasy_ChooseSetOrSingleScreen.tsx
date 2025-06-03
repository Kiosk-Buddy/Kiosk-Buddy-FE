import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LearnEasy_ChooseSetOrSingleScreen'
>;

export default function LearnEasy_ChooseSetOrSingleScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [step, setStep] = useState(0);

  const handleInitialTouch = () => {
    if (step === 0) setStep(1);
  };

  const handleNextStep = () => {
    if (step === 1) setStep(2);
  };

  const handleSetSelect = () => {
    if (step === 2) {
      navigation.navigate('LearnEasy_SelectSetDetailsScreen');
    }
  };

  return (
    <Pressable style={styles.container} onPress={handleInitialTouch}>
      {(step === 1 || step === 2) && <View style={styles.dimLayer} pointerEvents="none" />}

      <View style={styles.homeWrapper} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.navigate('KioskSelect')}
        >
          <Image source={require('../assets/images/Home.png')} style={styles.homeIcon} />
          <Text style={styles.homeText}>처음으로</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centerContent}>
        <Text style={styles.header}>빅맥</Text>
        <Text style={styles.prompt}>세트로 드시겠습니까?</Text>

        <View style={styles.cardRow}>
          <TouchableOpacity
            style={[
              styles.card,
              step === 1 ? styles.dimmed : null,
            ]}
            onPress={handleSetSelect}
            disabled={step !== 2}
          >
            <Image source={require('../assets/images/meal.png')} style={styles.cardImage} />
            <Text style={styles.cardLabel}>세트 선택</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.card,
              step !== 0 ? styles.dimmed : null,
            ]}
            disabled
          >
            <Image source={require('../assets/images/burger.png')} style={styles.cardImage} />
            <Text style={styles.cardLabel}>단품 선택</Text>
          </TouchableOpacity>
        </View>
      </View>

      {step === 1 && (
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>단품/세트 선택</Text>
            <Text style={styles.popupText}>
              단품과 세트 중{'\n'}골라서 주문하는 화면입니다.
            </Text>
            <TouchableOpacity onPress={handleNextStep} style={styles.nextBtn}>
              <Text style={styles.nextBtnText}>다음</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {step === 2 && (
        <View style={[styles.overlay, { pointerEvents: 'box-none' }]}>
          <View style={styles.balloonBelowSetBtn}>
            <View style={styles.balloon}>
              <Text style={styles.balloonText}>세트를 선택해주세요!</Text>
              <View style={styles.balloonArrowDown} />
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  dimLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  homeWrapper: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 99,
  },
  homeBtn: {
    backgroundColor: '#fff',
    right: 0,
    top: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
  },
  homeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
    opacity: 1.0,
  },
  centerContent: {
    alignItems: 'center',
    marginTop: -60,
    zIndex: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  prompt: {
    fontSize: 20,
    marginBottom: 25,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 20,
  },
  card: {
    width: '42%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    opacity: 1.0,
  },
  dimmed: {
    opacity: 0.3,
  },
  cardImage: {
    width: '60%',
    height: '60%',
    marginBottom: 10,
    resizeMode: 'contain',
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    width,
    height,
    zIndex: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    zIndex: 40,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  popupText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  nextBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  balloonBelowSetBtn: {
    position: 'absolute',
    top: height * 0.62,
    left: width * 0.16,
    zIndex: 50,
  },
  balloon: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    borderWidth: 0,
    alignItems: 'center',
    position: 'relative',
  },
  balloonText: {
    fontSize: 16,
  },
  balloonArrowDown: {
    position: 'absolute',
    top: -12,
    left: 30,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
  },
});
