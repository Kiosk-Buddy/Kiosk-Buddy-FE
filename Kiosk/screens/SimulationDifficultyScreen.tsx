// SimulationDifficultyScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function SimulationDifficultyScreen({ navigation }: any) {
  const handleSelect = (level: string) => {
    // TODO: 난이도별 학습 화면 이동 (예: navigation.navigate('LearnEasy'))
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>학습 난이도</Text>

        {['쉬움', '중간', '어려움'].map((label, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.difficultyButton, { backgroundColor: ['#fff', '#ccc', '#999'][index] }]}
            onPress={() => handleSelect(label)}
          >
            <Text style={styles.difficultyText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
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
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  difficultyButton: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  difficultyText: { fontSize: 18 },
});