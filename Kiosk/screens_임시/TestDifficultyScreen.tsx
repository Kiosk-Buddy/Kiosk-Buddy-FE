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

    if (label === '쉬움') {
      // 쉬움: 단일 버거 하나
      const missionItems = [pickRandomBurger()]
      navigation.navigate('SingleOrderScenario', { scenario, missionItems })
    }
    else if (label === '중간') {
      // 중간: 서로 다른 버거 두 개
      const firstBurger = pickRandomBurger()
      let secondBurger: string
      do {
        secondBurger = pickRandomBurger()
      } while (secondBurger === firstBurger)

      const missionItems = [firstBurger, secondBurger]
      navigation.navigate('SetOrderScenario', {
        scenario,
        missionItems,
      })
    }
    else {
      // 어려움: 버거 2개 + 사이드 + 음료 + 추가 메뉴
      // → 버거 두 개가 서로 다르게 뽑히도록 do…while 사용
      const firstBurger = pickRandomBurger()
      let secondBurger: string
      do {
        secondBurger = pickRandomBurger()
      } while (secondBurger === firstBurger)

      // 사이드, 음료, 추가 메뉴 (예시)
      const sides = ['감자튀김', '코울슬로']
      const drinks = ['콜라', '사이다']
      const extras = ['치즈 스틱']

      const side = sides[Math.floor(Math.random() * sides.length)]
      const drink = drinks[Math.floor(Math.random() * drinks.length)]
      const extra = extras[0] // 고정 1개

      const missionItemsForHard: [string, string, string, string, string] = [
        firstBurger,
        secondBurger,
        side,
        drink,
        extra,
      ]
      navigation.navigate('FullOrderScenario', {
        scenario,
        missionItems: missionItemsForHard,
      })
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.icon} />
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
