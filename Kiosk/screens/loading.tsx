// loading.tsx
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RootStackParamList } from '../App';

type LoadingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Loading'>;

export default function Loading() {
  const navigation = useNavigation<LoadingScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Waiting');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <ActivityIndicator size="large" color="red" style={styles.spinner} />
      <Text style={styles.message}>잠시만 기다려주세요...</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  spinner: {
    transform: [{ scale: 2 }],
    marginBottom: 50,
  },
  message: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});
