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
  Alert,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '../App';

type KioskSelectScreenNavigationProp =
  NavigationProp<RootStackParamList, 'KioskSelect'>;

const screenWidth = Dimensions.get('window').width;
const itemSize = screenWidth / 2 - 40;

interface KioskItem {
  id: number;
  image: ImageSourcePropType;
}

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

export default function KioskSelectScreen() {
  const navigation = useNavigation<KioskSelectScreenNavigationProp>();

  const handleSelect = (id: number) => {
    if (id === 1) {
      navigation.navigate('LearningMethod');
    } else {
      Alert.alert('해당 기능은 아직 지원되지 않습니다.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>사용할 키오스크를 선택하세요</Text>
      <View style={styles.grid}>
        {kiosks.map((kiosk) => (
          <TouchableOpacity
            key={kiosk.id}
            style={styles.item}
            onPress={() => handleSelect(kiosk.id)}
          >
            <Image
              source={kiosk.image}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  } as ViewStyle,
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  } as TextStyle,
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  } as ViewStyle,
  item: {
    width: itemSize,
    height: itemSize + 30,
    alignItems: 'center',
    marginBottom: 30,
  } as ViewStyle,
  image: {
    width: '100%',
    height: itemSize,
  } as ImageStyle,
});
