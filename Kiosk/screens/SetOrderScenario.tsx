// src/screens/SetOrderScenario.tsx

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
type NavProp = NativeStackNavigationProp<RootStackParamList, 'SetOrderScenario'>;
type RouteP = RouteProp<RootStackParamList, 'SetOrderScenario'>;

export default function SetOrderScenario() {
  const navigation = useNavigation<NavProp>();
  // missionItems 배열과 scenario 파라미터 받기
  const { scenario = 'medium', missionItems = ['불고기 버거', '슈비버거'] } = useRoute<RouteP>().params;
  const [setItem, singleItem] = missionItems;

  // 시작 시 Menu 화면으로 missionItems 배열 전체를 전달합니다
  const handleStart = () => {
    navigation.navigate('Menu', { scenario, missionItems });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>미션</Text>
      <Text style={styles.subtitle}>
        {setItem} 세트 1개,{"\n"}
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
    marginBottom: 32,
    color: '#333',
    textAlign: 'center',
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
