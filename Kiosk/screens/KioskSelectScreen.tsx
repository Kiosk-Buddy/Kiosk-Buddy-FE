// src/screens/KioskSelectScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// 네비게이션 타입 정의
export type RootStackParamList = {
  KioskSelect: undefined;
  Menu: undefined;        // menu 화면 추가
  FoodSelect: undefined;
};

type KioskSelectScreenNavigationProp = NavigationProp<
  RootStackParamList,
  'KioskSelect'
>;

interface KioskItem {
  id: number;
  image: ImageSourcePropType;
}

const screenWidth = Dimensions.get('window').width;
const itemSize = screenWidth / 2 - 40;

const kiosks: KioskItem[] = [
  { id: 1, image: require('../assets/images/burger.png') },
  { id: 2, image: require('../assets/images/kiosk-placeholder.png') },
  { id: 3, image: require('../assets/images/kiosk-placeholder.png') },
  { id: 4, image: require('../assets/images/kiosk-placeholder.png') },
  { id: 5, image: require('../assets/images/kiosk-placeholder.png') },
  { id: 6, image: require('../assets/images/kiosk-placeholder.png') },
  { id: 7, image: require('../assets/images/kiosk-placeholder.png') },
  { id: 8, image: require('../assets/images/kiosk-placeholder.png') },
];

const KioskSelectScreen: React.FC = () => {
  const navigation = useNavigation<KioskSelectScreenNavigationProp>();

  const handleSelect = (id: number) => {
    if (id === 1) {
      navigation.navigate('Menu');  // menu 화면으로 이동
    } else {
      alert('아직 준비되지 않은 키오스크입니다.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>학습하고 싶은 키오스크를 선택하세요!</Text>
      <View style={styles.grid}>
        {kiosks.map((kiosk) => (
          <TouchableOpacity
            key={kiosk.id}
            style={styles.button}
            onPress={() => handleSelect(kiosk.id)}
          >
            <Image source={kiosk.image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default KioskSelectScreen;

const styles = StyleSheet.create<{
  scrollContainer: ViewStyle;
  title: TextStyle;
  grid: ViewStyle;
  button: ViewStyle;
  image: ImageStyle;
}>({
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: itemSize,
    height: itemSize,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 3,
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});