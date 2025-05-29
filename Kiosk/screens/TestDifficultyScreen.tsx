// src/screens/TestDifficultyScreen.tsx
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../App'
import { burgerMenuItems } from './burgerMenu'

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  'TestDifficulty'
>

export default function TestDifficultyScreen() {
  const navigation = useNavigation<NavProp>()

  const pickRandomBurger = () => {
    const idx = Math.floor(Math.random() * burgerMenuItems.length)
    return burgerMenuItems[idx].name
  }

  const handleSelect = (label: '쉬움' | '중간' | '어려움') => {
    const scenario =
      label === '쉬움' ? 'easy' : label === '중간' ? 'medium' : 'hard'
    // 랜덤으로 미션 버거 하나 뽑기
    const missionItems = [pickRandomBurger()]

    // 쉬움은 SingleOrderScenario, 그 외는 Set/Full 시나리오로
    if (label === '쉬움') {
      navigation.navigate('SingleOrderScenario', { scenario, missionItems })
    } else if (label === '중간') {
      // 예시로 두 가지 버거 미션
      navigation.navigate('SetOrderScenario', {
        scenario,
        missionItems: [pickRandomBurger(), pickRandomBurger()],
      })
    } else {
    // hard: 버거 2개 + 음료 1개 + 추가메뉴 1개
    const names = burgerMenuItems.map(b => b.name);
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    const [burgerA, burgerB] = shuffled.slice(0, 2);

    // 음료와 추가 메뉴 (필요하면 랜덤 또는 고정)
    const sides = ['감자튀김', '코울슬로'];
    
    const drinks = ['콜라', '사이다'];
    const extras = ['치즈 스틱'];
    const side = sides[Math.floor(Math.random() * sides.length)];
    const drink = drinks[Math.floor(Math.random() * drinks.length)];
    const extra = extras[0];

    const missionItemsForHard = [burgerA, burgerB, side, drink, extra];
    navigation.navigate('FullOrderScenario', {
      scenario,
      missionItems: missionItemsForHard,
    });
  }
};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>시험 난이도</Text>
        {(['쉬움', '중간', '어려움'] as const).map((l, i) => (
          <TouchableOpacity
            key={l}
            style={[styles.btn, { backgroundColor: ['#fff', '#ccc', '#999'][i] }]}
            onPress={() => handleSelect(l)}
          >
            <Text style={styles.btnText}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  header: { height: 60, justifyContent: 'center' },
  icon: { width: 24, height: 24 },
  box: {
    backgroundColor: '#eee',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  btn: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  btnText: { fontSize: 18 },
})
