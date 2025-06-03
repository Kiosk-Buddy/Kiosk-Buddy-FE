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
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { burgerMenuItems } from './burgerMenu';

const { width, height } = Dimensions.get('window');

type MenuNav = NativeStackNavigationProp<RootStackParamList, 'Menu'>;
type MenuRoute = RouteProp<RootStackParamList, 'Menu'>;

interface MenuItem {
  name: string;
}

const sideMenuItems: MenuItem[] = [
  { name: '홈' }, { name: '추천 메뉴' }, { name: '버거' },
  { name: '해피밀' }, { name: '사이드' }, { name: '커피' },
  { name: '디저트' }, { name: '음료' }, { name: '해피 스낵' },
];

export default function MenuScreen() {
  const navigation = useNavigation<MenuNav>();
  const {
    scenario = 'easy',
    missionItems = [],
    mode = 'test',
    currentStep = 0, // learn-hard
  } = useRoute<MenuRoute>().params;

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showMissionModal, setShowMissionModal] = useState(false);

  const getMissionText = () => {
    if (mode === 'learn') {
      return scenario === 'medium'
        ? '미션:\n빅맥 세트(감자튀김, 콜라) 1개 포장 주문'
        : '미션:\n1) 빅맥 세트(감자튀김, 콜라)\n2) 빅맥 단품\n3) 빅맥 세트(코울슬로, 사이다, 치즈스틱)\n각각 1개 포장 주문';
    }
    if (scenario === 'easy' && missionItems.length === 1) {
      return `미션: ${missionItems[0]} 단품 1개 주문하기`;
    }
    if (scenario === 'medium' && missionItems.length === 2) {
      return `미션:\n1) ${missionItems[0]} 세트 1개 주문하기\n2) ${missionItems[1]} 단품 1개 주문하기`;
    }
    if (scenario === 'hard' && missionItems.length === 5) {
      const [setBurger, singleBurger, sideItem, drinkItem, extraItem] = missionItems;
      return `미션:\n1) ${setBurger} 세트 1개 주문하기\n   - 포함 항목: ${sideItem}, ${drinkItem}, ${extraItem}\n2) ${singleBurger} 단품 1개 주문하기`;
    }
    return '미션 정보가 없습니다.';
  };

  const isHighlight = (itemName: string) => {
    if (mode !== 'learn') return false;
    if (scenario === 'medium') {
      return itemName === '빅맥';
    }
    if (scenario === 'hard') {
      if (currentStep === 0 || currentStep === 2) return itemName === '빅맥';
      if (currentStep === 1) return itemName === '빅맥'; // 단품이지만 이름 같음
    }
    return false;
  };

  const shouldShowBubble = () => {
    if (mode !== 'learn') return false;
    if (scenario === 'medium') return true;
    if (scenario === 'hard') return currentStep <= 2;
    return false;
  };

  const renderBurgerItem = ({ item }: any) => {
    const priceNumber = Number(item.price.replace(/\D/g, ''));
    const isWrong =
      mode === 'test' &&
      ((scenario === 'easy' && item.name !== missionItems[0]) ||
        (scenario === 'medium' && !missionItems.includes(item.name)) ||
        (scenario === 'hard' && !missionItems.includes(item.name)));

    const handlePress = () => {
  if (mode === 'learn') {
    if (scenario === 'medium' && item.name !== '빅맥') return;
    if (scenario === 'hard') {
      if ((currentStep === 0 || currentStep === 2) && item.name !== '빅맥') return;
      if (currentStep === 1 && item.name !== '빅맥') return; // 단품도 이름은 빅맥
    }
  }

  if (isWrong) {
    setShowErrorModal(true);
    return;
  }

  const requiredType: 'set' | 'single' = (() => {
    if (mode === 'learn') {
      if (scenario === 'medium') return 'set';
      if (scenario === 'hard') {
        if (currentStep === 0 || currentStep === 2) return 'set';
        if (currentStep === 1) return 'single';
      }
    }
    return scenario === 'easy'
      ? 'single'
      : item.name === missionItems[0]
      ? 'set'
      : 'single';
  })();

  const nextStep = mode === 'learn' && scenario === 'hard' && currentStep < 2
    ? currentStep + 1
    : undefined;

  navigation.navigate('ChooseSetOrSingle', {
    selectedBurger: item.name,
    singlePrice: priceNumber,
    scenario,
    missionItems,
    requiredType,
    mode,
    currentStep,
  });
};
    return (
      <TouchableOpacity onPress={handlePress}>
        <View
          style={[
            styles.burgerItem,
            isHighlight(item.name) && styles.highlightedItem,
          ]}
        >
          <Image source={item.image} style={styles.burgerImage} resizeMode="contain" />
          <Text style={styles.burgerName}>{item.name}</Text>
          <Text style={styles.burgerPrice}>
            {item.price} {item.kcal ? `(${item.kcal})` : ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {mode === 'learn' && (
        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('KioskSelect')}>
          <Image source={require('../assets/images/Home.png')} style={styles.homeIcon} />
          <Text style={styles.homeText}>처음으로</Text>
        </TouchableOpacity>
      )}

      <View style={styles.header}>
        <Image source={require('../assets/images/md-logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.titleWrapper}>
        <Text style={styles.pageTitle}>버거</Text>
        <Text style={styles.pageSubTitle}>아래에서 세부 메뉴를 확인하세요</Text>
      </View>

      <View style={styles.filterWrapper}>
        {['전체', '치킨', '비프', '씨푸드', '불고기'].map((label, idx) => (
          <TouchableOpacity key={idx} style={styles.filterBtn}>
            <Text style={styles.filterText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.sideMenu}>
          {sideMenuItems.map((item, i) => (
            <TouchableOpacity key={i} style={styles.sideMenuItem}>
              <Text style={styles.sideMenuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          key={'2cols'}
          numColumns={2}
          data={burgerMenuItems}
          renderItem={renderBurgerItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>

      <Image
        source={require('../assets/images/scrollbar.png')}
        style={styles.scrollBar}
        resizeMode="contain"
      />

      {shouldShowBubble() && (
        <View style={styles.bubbleWrapper}>
          <View style={styles.speechBubble}>
            <Text style={styles.bubbleText}>빅맥 버거를 터치하세요</Text>
          </View>
          <View style={styles.triangleUp} />
        </View>
      )}

      <TouchableOpacity style={styles.missionButton} onPress={() => setShowMissionModal(true)}>
        <Text style={styles.missionButtonText}>미션 보기</Text>
      </TouchableOpacity>

      <Modal transparent animationType="fade" visible={showErrorModal} onRequestClose={() => setShowErrorModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>잘못된 선택입니다</Text>
            <Pressable style={styles.modalButton} onPress={() => setShowErrorModal(false)}>
              <Text style={styles.modalButtonText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal transparent animationType="slide" visible={showMissionModal} onRequestClose={() => setShowMissionModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{getMissionText()}</Text>
            <Pressable style={styles.modalButton} onPress={() => setShowMissionModal(false)}>
              <Text style={styles.modalButtonText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 80, paddingHorizontal: 16, justifyContent: 'center' },
  logo: { width: 140, height: 80 },
  homeBtn: {
    position: 'absolute', top: 60, right: 20, backgroundColor: '#fff',
    paddingVertical: 6, paddingHorizontal: 12, flexDirection: 'row',
    borderRadius: 8, borderWidth: 1, zIndex: 5, alignItems: 'center',
  },
  homeIcon: { width: 20, height: 20, marginRight: 6 },
  homeText: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  titleWrapper: { paddingHorizontal: 16, marginBottom: 12 },
  pageTitle: { fontSize: 26, fontWeight: 'bold' },
  pageSubTitle: { fontSize: 13, marginTop: 4 },
  filterWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    rowGap: 8,
    columnGap: 8,
    marginBottom: 12,
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  filterText: { fontSize: 13, fontWeight: '600' },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  sideMenu: {
    width: 80,
    paddingTop: 8,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sideMenuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sideMenuText: { fontSize: 12, textAlign: 'center' },
  burgerItem: {
    width: width / 3.5,
    margin: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  highlightedItem: {
    borderColor: '#FF3366',
    borderWidth: 2,
  },
  burgerImage: { width: 60, height: 60, marginBottom: 6 },
  burgerName: { fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  burgerPrice: { fontSize: 11, color: '#666' },
  scrollBar: {
    position: 'absolute',
    right: -15,
    top: height * 0.28,
    width: 90,
    height: 250,
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
  modalText: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  modalButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  modalButtonText: { color: '#fff', fontSize: 14 },

  
  bubbleWrapper: {
    position: 'absolute',
    top: height * 0.4,
    left: width * 0.25,
    alignItems: 'center',
    zIndex: 10,
  },
  speechBubble: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    maxWidth: width * 0.5,
  },
  bubbleText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
  },
  triangleUp: {
    width: 12,
    height: 12,
    top: '-90%',
    right: '10%', 
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
    marginTop: -6,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: '#000',
  },
});
