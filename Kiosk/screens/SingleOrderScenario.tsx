// src/screens/SingleOrderScenario.tsx

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

// 네비게이션 및 라우트 타입 정의
type NavProp = NativeStackNavigationProp<RootStackParamList, 'SingleOrderScenario'>;
type RouteP = RouteProp<RootStackParamList, 'SingleOrderScenario'>;

export default function SingleOrderScenario() {
  const navigation = useNavigation<NavProp>();

  // missionItems 배열과 시나리오 파라미터 받기
  const { scenario = 'easy', missionItems = [] } = useRoute<RouteP>().params;

  // missionItems 첫번째 항목을 미션으로 사용
  const missionItem = missionItems[0] || '불고기 버거';

  const handleStart = () => {
    // Menu 스크린으로 missionItems와 scenario 함께 전달
    navigation.navigate('Menu', {
      scenario,
      missionItems,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>미션</Text>
      <Text style={styles.subtitle}>{missionItem} 단품 주문하기</Text>

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
