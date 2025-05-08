// src/screens/MenuScreen.tsx

import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type MenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'menu'>;

interface MenuItem {
  name: string;
}

interface BurgerItem {
  name: string;
  price: string;
  kcal?: string;
  image: ImageSourcePropType;
}

const sideMenuItems: MenuItem[] = [
  { name: '홈' },
  { name: '추천 메뉴' },
  { name: '버거' },
  { name: '해피밀' },
  { name: '사이드' },
  { name: '커피' },
  { name: '디저트' },
  { name: '음료' },
  { name: '해피 스낵' },
];

const burgerMenuItems: BurgerItem[] = [
  { name: '빅맥', price: 'W5800', kcal: '582kcal', image: require('../assets/images/bigmacx3.png') },
  { name: '더블 상하이 버거', price: 'W7000', kcal: '759kcal', image: require('../assets/images/doubleshangx3.png') },
  { name: '상하이 버거', price: 'W6300', kcal: '501kcal', image: require('../assets/images/shangx3.png') },
  { name: '1955 버거', price: 'W7200', kcal: '572kcal', image: require('../assets/images/1955x3.png') },
  { name: '슈슈 버거', price: 'W4200', kcal: '409kcal', image: require('../assets/images/shux3.png') },
  { name: '슈비버거', price: 'W6600', kcal: '540kcal', image: require('../assets/images/shubix3.png') },
];

const MenuScreen: React.FC = () => {
  const navigation = useNavigation<MenuScreenNavigationProp>();

  const renderSideMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity style={styles.sideMenuItem}>
      <Text style={styles.sideMenuText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderBurgerItem = ({ item }: { item: BurgerItem }) => {
    const priceNumber = Number(item.price.replace(/\D/g, ''));
    return (
      <TouchableOpacity
        style={styles.burgerItem}
        onPress={() => {
          console.log('🍔', item.name, 'pressed');
          navigation.navigate('ChooseSetOrSingle', {
            selectedBurger: item.name,
            singlePrice: priceNumber,
          });
        }}
      >
        <Image
          source={item.image}
          style={styles.burgerImage}
          resizeMode="contain"
        />
        <View style={styles.burgerInfo}>
          <Text style={styles.burgerName}>{item.name}</Text>
          <Text style={styles.burgerPrice}>
            {item.price} {item.kcal && `(${item.kcal})`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sideMenu}>
        <FlatList<MenuItem>
          data={sideMenuItems}
          renderItem={renderSideMenuItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>

      <View style={styles.burgerMenu}>
        <FlatList<BurgerItem>
          data={burgerMenuItems}
          renderItem={renderBurgerItem}
          keyExtractor={(_, index) => index.toString()}
          numColumns={3}
        />
      </View>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create<{
  container: ViewStyle;
  sideMenu: ViewStyle;
  sideMenuItem: ViewStyle;
  sideMenuText: TextStyle;
  burgerMenu: ViewStyle;
  burgerItem: ViewStyle;
  burgerImage: ImageStyle;
  burgerInfo: ViewStyle;
  burgerName: TextStyle;
  burgerPrice: TextStyle;
}>({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sideMenu: {
    marginTop: 50,
    width: 120,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  sideMenuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  sideMenuText: {
    fontSize: 12,
  },
  burgerMenu: {
    marginTop: 150,
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  burgerItem: {
    width: '30%',
    margin: '1.5%',
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
  },
  burgerImage: {
    width: 70,
    height: 70,
    marginTop: 5,
  },
  burgerInfo: {
    alignItems: 'flex-start',
  },
  burgerName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  burgerPrice: {
    fontSize: 10,
    color: 'black',
    textAlign: 'left',
  },
});
