// OrderCompleteScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

export default function OrderCompleteScreen({ navigation }: any) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // TODO: 메인 화면으로 이동
      // navigation.navigate('MainScreen');
    }, 7000);

    return () => clearTimeout(timeout);
  }, []);

  const handleSkip = () => {
    // TODO: 메인 화면으로 즉시 이동
    // navigation.navigate('MainScreen');
  };

  return (
    <TouchableWithoutFeedback onPress={handleSkip}>
      <View style={styles.container}>
        <Text style={styles.text}>주문이 완료되었습니다{'\n'}제품을 카운터에서 받아주세요</Text>
        <Image
          source={require('../assets/orderend.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, textAlign: 'center', marginBottom: 30 },
  image: { width: 200, height: 200 },
});
