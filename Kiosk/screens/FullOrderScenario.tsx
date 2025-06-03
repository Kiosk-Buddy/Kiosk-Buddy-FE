
// src/screens/FullOrderScenario.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

// 네비게이션 & 라우트 타입 정의
type NavProp = NativeStackNavigationProp<RootStackParamList, 'FullOrderScenario'>;
type RouteP = RouteProp<RootStackParamList, 'FullOrderScenario'>;

// src/screens/FullOrderScenario.tsx

export default function FullOrderScenario() {
  const navigation = useNavigation<NavProp>();
  const { scenario = 'hard', missionItems = ['빅맥', '슈비버거'] } =
    useRoute<RouteP>().params;

  // missionItems가 2개면 뒤에 사이드/음료/추가 품목을 붙여 주고,
  // 5개짜리가 들어오면 그대로 쓰도록 분기
 const [setBurger, singleBurger] = missionItems;
  const fullMissions =
    missionItems.length === 2
      ? [
          setBurger,
          singleBurger,
          '감자튀김',   // 혹은 '코울슬로'
          '콜라',       // 혹은 '사이다'
          '치즈 스틱',  // 추가 미션
        ]
      : missionItems;
const [setItem, singleItem, sideItem, drinkItem, extraItem] = fullMissions;

  const handleStart = () => {
    navigation.navigate('Menu', {
      scenario,
      missionItems: fullMissions,  // 이렇게 5개짜리 넘겨 줌
      mode: 'test',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>어려움 난이도 미션</Text>
      <Text style={styles.subtitle}>
        {setItem} 세트 1개 ({sideItem} + {drinkItem} + {extraItem}) 주문하기{'\n'}
        {singleItem} 단품 1개 주문하기
      </Text>
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 32,
    lineHeight: 24,
  },
  startButton: {
    width: '60%',
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

