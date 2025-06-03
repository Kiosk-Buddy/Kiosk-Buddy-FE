// src/screens/TestDifficultyScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { burgerMenuItems } from './burgerMenu';

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  'TestDifficultyScreen'
>;

export default function TestDifficultyScreen() {
  const navigation = useNavigation<NavProp>();

  const pickRandomBurger = () => {
    const idx = Math.floor(Math.random() * burgerMenuItems.length);
    return burgerMenuItems[idx].name;
  };

  const handleSelect = (label: '쉬움' | '중간' | '어려움') => {
    const scenario =
      label === '쉬움' ? 'easy' : label === '중간' ? 'medium' : 'hard';

    if (label === '쉬움') {
      navigation.navigate('SingleOrderScenario', { scenario, missionItems: [pickRandomBurger()], mode: 'test', });
    } else if (label === '중간') {
      navigation.navigate('SetOrderScenario', {
      scenario,
      missionItems: [pickRandomBurger(), pickRandomBurger()],
      mode: 'test',
    });

    } else {
      const names = burgerMenuItems.map(b => b.name);
      const shuffled = [...names].sort(() => Math.random() - 0.5);
      const [burgerA, burgerB] = shuffled.slice(0, 2);

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
      mode: 'test',
      
    });
    }
  };

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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  header: {
    height: 60,
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 60 : 30, // ✅ 상단 마진
  },
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
});
