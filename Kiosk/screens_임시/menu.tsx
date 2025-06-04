// src/screens/menu.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Pressable,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { burgerMenuItems } from './burgerMenu'; // 경로 수정
import { useCart } from '../contexts/CartContext'; // CartContext 불러오기

// Navigation 타입
type MenuNav = NativeStackNavigationProp<RootStackParamList, 'Menu'>;
type MenuRoute = RouteProp<RootStackParamList, 'Menu'>;

interface MenuItem {
  name: string;
}

interface BurgerItem {
  name: string;
  price: string;
  kcal?: string;
  image: ImageSourcePropType;
}

// 사이드 메뉴 아이템
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

export default function MenuScreen() {
  const navigation = useNavigation<MenuNav>();
  const { scenario = 'easy', missionItems = [] } = useRoute<MenuRoute>().params;
  // CartContext에서 현재 cartItems 가져오기
  const { cartItems } = useCart();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showMissionModal, setShowMissionModal] = useState(false);

  // 난이도·미션에 맞는 텍스트 생성 함수
  const getMissionText = () => {
    // easy: 단품 1개
    if (scenario === 'easy' && missionItems.length === 1) {
      return `미션: ${missionItems[0]} 단품 1개 주문하기`;
    }
    // medium: 세트 + 단품
    if (scenario === 'medium' && missionItems.length === 2) {
      return `미션:\n1) ${missionItems[0]} 세트 1개 주문하기\n2) ${missionItems[1]} 단품 1개 주문하기`;
    }
    // hard: 세트 + 단품 + 사이드 + 음료 + 추가
    if (scenario === 'hard' && missionItems.length === 5) {
      const [setBurger, singleBurger, sideItem, drinkItem, extraItem] = missionItems;
      return `미션:\n1) ${setBurger} 세트 1개 주문하기\n   - 포함 항목: ${sideItem}, ${drinkItem}, ${extraItem}\n2) ${singleBurger} 단품 1개 주문하기`;
    }
    return '미션 정보가 없습니다.';
  };

  const renderSideMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity style={styles.sideMenuItem}>
      <Text style={styles.sideMenuText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderBurgerItem = ({ item }: { item: BurgerItem }) => {
    const priceNumber = Number(item.price.replace(/\D/g, ''));
    const isWrongEasy =
      scenario === 'easy' &&
      missionItems.length === 1 &&
      item.name !== missionItems[0];
    const isWrongMedium =
      scenario === 'medium' &&
      missionItems.length === 2 &&
      !missionItems.includes(item.name);
    const isWrongHard =
      scenario === 'hard' &&
      missionItems.length === 5 &&
      !missionItems.includes(item.name);
    const isWrong = isWrongEasy || isWrongMedium || isWrongHard;
    let isAlreadyInCart = false;

    if (scenario === 'easy') {
      // easy: missionItems[0] 단품이 이미 카트에 있는지
      const onlyMission = missionItems[0];
      isAlreadyInCart = cartItems.some(ci =>
        ci.name.includes(onlyMission) && ci.name.includes('단품')      
      );
    }
    else if (scenario === 'medium') {
      // medium: missionItems[0]=세트, missionItems[1]=단품
      const setName = missionItems[0];
      const singleName = missionItems[1];

      // “아이템이 setName(세트) 일 때” 이미 같은 세트가 카트에 있는지
      if (item.name === setName) {
        isAlreadyInCart = cartItems.some(ci =>
          ci.name.includes(setName) && ci.name.includes('세트')
        );
      }
      // “아이템이 singleName(단품) 일 때” 이미 같은 단품이 카트에 있는지
      if (item.name === singleName) {
        isAlreadyInCart = cartItems.some(ci =>
          ci.name.includes(singleName) && ci.name.includes('단품')
        );
      }
    }
    else if (scenario === 'hard') {
      // hard: missionItems = [setBurger, singleBurger, side, drink, extra]
      const [setBurger, singleBurger, requiredSide, requiredDrink, requiredExtra] = missionItems;

      // “아이템이 setBurger(세트) 일 때” 이미 같은 구성의 세트가 카트에 있는지
      if (item.name === setBurger) {
        isAlreadyInCart = cartItems.some(ci =>
          ci.name.includes(setBurger) &&
          ci.name.includes('세트') &&
          ci.name.includes(requiredSide) &&
          ci.name.includes(requiredDrink) &&
          ci.name.includes(requiredExtra)
        );
      }
      // “아이템이 singleBurger(단품) 일 때” 이미 같은 단품이 카트에 있는지
      if (item.name === singleBurger) {
        isAlreadyInCart = cartItems.some(ci =>
          ci.name.includes(singleBurger) && ci.name.includes('단품')
        );
      }
    }

    const handlePress = () => {
      // 1. 미션과 관계없는 잘못된 아이템 선택
      if (isWrong) {
        setShowErrorModal(true);
        return;
      }
      // 2. 이미 카트에 담긴 미션 아이템을 다시 누른 경우
      if (isAlreadyInCart) {
        setShowErrorModal(true);
        return;
      }
      let requiredType: 'set' | 'single';
      if (scenario === 'easy') {
        requiredType = 'single';
      } else {
        requiredType =
          item.name === missionItems[0] ? 'set' : 'single';
      }
      navigation.navigate('ChooseSetOrSingle', {
        selectedBurger: item.name,
        singlePrice: priceNumber,
        scenario,
        missionItems,
        requiredType,
      });
    };

    return (
      <TouchableOpacity style={styles.burgerItem} onPress={handlePress}>
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
      {/* 상단 로고 헤더 */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/md-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* 페이지 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>버거</Text>
        <Text style={styles.pageSubtitle}>
          아래에서 세부내용을 확인하세요.
        </Text>
      </View>

      {/* 사이드바＋버거리스트 래퍼 */}
      <View style={styles.content}>
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

      {/* 잘못된 선택 모달 */}
      <Modal
        transparent
        animationType="fade"
        visible={showErrorModal}
        onRequestClose={() => setShowErrorModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>잘못된 선택입니다</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setShowErrorModal(false)}
            >
              <Text style={styles.modalButtonText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* 미션 보기 모달 */}
      <Modal
        transparent
        animationType="slide"
        visible={showMissionModal}
        onRequestClose={() => setShowMissionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{getMissionText()}</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setShowMissionModal(false)}
            >
              <Text style={styles.modalButtonText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* 오른쪽 하단 미션 보기 버튼 */}
      <TouchableOpacity
        style={styles.missionButton}
        onPress={() => setShowMissionModal(true)}
      >
        <Text style={styles.missionButtonText}>미션 보기</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  modalOverlay: ViewStyle;
  modalContent: ViewStyle;
  modalText: TextStyle;
  modalButton: ViewStyle;
  modalButtonText: TextStyle;
  header: ViewStyle;
  logo: ImageStyle;
  titleContainer: ViewStyle;
  pageTitle: TextStyle;
  pageSubtitle: TextStyle;
  content: ViewStyle;
  missionButton: ViewStyle;
  missionButtonText: TextStyle;
}>({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 80,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  logo: {
    width: 140,
    height: 80,
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sideMenu: {
    width: 100,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 8,
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 16,
    justifyContent: 'flex-start',
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
  },
  burgerPrice: {
    fontSize: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
   	alignItems: 'center',
  },
  modalContent: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  missionButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#28a745',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 4,
  },
  missionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
