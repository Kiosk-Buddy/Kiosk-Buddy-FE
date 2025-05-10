import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';
import { RootStackParamList } from '../App';

// RootStackParamList의 'ChooseSetOrSingle'와 매핑
type ChooseSetOrSingleNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ChooseSetOrSingle'
>;

type ChooseSetOrSingleRouteProp = RouteProp<
  RootStackParamList,
  'ChooseSetOrSingle'
>;

interface Props {
  navigation: ChooseSetOrSingleNavigationProp;
  route: ChooseSetOrSingleRouteProp;
}

// 이미지 경로 (파일명에 맞춰 조정)
const logoImg: ImageSourcePropType = require('../assets/images/md-logo.png');
const burgerOnlyImg: ImageSourcePropType = require('../assets/images/burger.png');
const burgerSetImg: ImageSourcePropType = require('../assets/images/meal.png');

export default function ChooseSetOrSingleScreen({ navigation, route }: Props) {
  const { selectedBurger = "햄버거", singlePrice = 9500 } = route.params || {};
  const { addToCart } = useCart();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image source={logoImg} style={styles.logo} />
        <Text style={styles.burgerName}>{selectedBurger}</Text>
      </View>

      {/* PROMPT */}
      <Text style={styles.prompt}>세트로 드시겠습니까?</Text>

      {/* CARD ROW */}
      <View style={styles.cardRow}>
        {/* 세트 카드 */}
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('SelectSetDetails', {
              selectedBurger,
              setPrice: singlePrice * 1.5, // 세트 가격은 기본 단품의 1.5배
            })
          }
        >
          <Image source={burgerSetImg} style={styles.cardImage} />
          <Text style={styles.cardLabel}>세트 선택</Text>
        </TouchableOpacity>

        {/* 단품 카드 */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            addToCart({ name: `${selectedBurger} 단품`, price: singlePrice });
            navigation.navigate('Cart');
          }}
        >
          <Image source={burgerOnlyImg} style={styles.cardImage} />
          <Text style={styles.cardLabel}>단품 선택</Text>
        </TouchableOpacity>
      </View>

      {/* CANCEL BUTTON */}
      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>취소</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create<{
  container: ViewStyle;
  header: ViewStyle;
  logo: ImageStyle;
  burgerName: TextStyle;
  prompt: TextStyle;
  cardRow: ViewStyle;
  card: ViewStyle;
  cardImage: ImageStyle;
  cardLabel: TextStyle;
  cancelBtn: ViewStyle;
  cancelText: TextStyle;
}>({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  burgerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  prompt: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 8,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
  },
  cardImage: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  cancelBtn: {
    width: '100%',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#333',
  },
});
