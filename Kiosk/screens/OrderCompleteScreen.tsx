// OrderCompleteScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

export default function OrderCompleteScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('KioskSelect');
    }, 7000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  const handleSkip = () => {
    navigation.navigate('KioskSelect');
  };

  return (
    <TouchableWithoutFeedback onPress={handleSkip}>
      <View style={styles.container}>
        <Text style={styles.text}>햄버거 주문 연습이 끝났습니다.</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  text: { 
    fontSize: 20, 
    textAlign: 'center', 
    marginBottom: 20 
  },
  image: { 
    width: 200, 
    height: 200 
  },
});
