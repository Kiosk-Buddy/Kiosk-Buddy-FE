// src/screens/LearningMethodScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';

export default function LearningMethodScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* 콘텐츠 박스 */}
      <View style={styles.box}>
        <Text style={styles.title}>학습 방법</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SimulationDifficultyScreen', { mode: 'learn' })}
        >
          <Image source={require('../assets/study.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>따라하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TestDifficultyScreen', { mode: 'test' })}
        >
          <Image source={require('../assets/test.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>시험 보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  header: {
    height: 60,
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 60 : 30,
  },
  icon: { width: 24, height: 24 },
  box: {
    backgroundColor: '#eee',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    elevation: 2,
  },
  buttonText: { fontSize: 18, marginLeft: 10 },
  buttonIcon: { width: 24, height: 24 },
});
