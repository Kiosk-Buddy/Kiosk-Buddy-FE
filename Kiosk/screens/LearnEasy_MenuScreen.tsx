//LearnEasy_MenuScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { burgerMenuItems } from './burgerMenu';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LearnEasy_MenuScreen'
>;

export default function LearnEasy_MenuScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [step, setStep] = useState(0);
  const [total, setTotal] = useState(0);

  const handleStart = () => {
    if (step === 0) setStep(1);
  };

  const handleNext = () => {
    if (step >= 1 && step < 7) setStep(step + 1);
  };

  const parsePrice = (priceStr: string) => {
    const num = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
    return isNaN(num) ? 0 : num;
  };

  const handleItemPress = (item: any) => {
    const itemPrice = parsePrice(item.price);
    setTotal(prev => prev + itemPrice);
    if (step === 7 && item.name === '빅맥') {
      navigation.navigate('LearnEasy_ChooseSetOrSingleScreen');
    }
  };
  const isBright = (target: string) => {
    if (step === 2 && target === 'menubar') return true;
    if (step === 3 && target === 'menu') return true;
    if (step === 4 && target === 'scrollbar') return true;
    if (step === 5 && target === 'bottom_home') return true;
    if (step === 6 && target === 'checkout') return true;
    if (step === 7 && target === 'bigmac') return true;
    if (target === 'topright') return true; // 항상 밝게
    return false;
  };

  const overlayData = [
    null,
    {
      type: 'box',
      title: '음식 고르기',
      text: '주문할 음식을 화면에서 찾아 담습니다.',
      style: { top: height * 0.28, left: width * 0.18, width: width * 0.65 },
    },
    {
      type: 'balloon',
      title: '메뉴 바',
      text: '메뉴 바에서는 매장에서 판매중인 음식을 종류별로 분류합니다.\n현재는 버거가 선택되어 있고,\n원하는 것을 터치하면 해당 종류의 음식을 볼 수 있습니다.',
      style: { top: height * 0.18, left: 85, width: 260 },
    },
    {
      type: 'balloon',
      title: '음식 주문',
      text: '메뉴 바에서 주문할 음식의 종류를 골랐다면,\n메뉴판처럼 음식들이 화면에 보입니다.\n원하는 음식을 골라 주문할 수 있습니다.',
      style: { bottom: 100, left: 20, width: 330 },
    },
    {
      type: 'balloon',
      title: '음식 더 보기',
      text: '화면 오른쪽 버튼을 누른채로 위 아래로 \n옮겨 보이지 않는 음식도 마저 볼 수\n있습니다. 또는 화면을 위 아래로 스크롤합니다.',
      style: { top: height * 0.28, right: 60, width: 260 },
    },
    {
      type: 'balloon',
      title: '처음으로 버튼',
      text: '이 버튼을 누르면 제일 첫 화면으로 돌아가게 됩니다.',
      style: { bottom: 130, left: 100, width: 260 },
    },
    {
      type: 'balloon',
      title: '주문내역 확인 후 결제하기 버튼',
      text: '이 버튼은 누르면 장바구니 화면으로 넘어갑니다.\n장바구니 화면에서는 지금까지 담았던 음식들을\n확인 할 수 있습니다.',
      style: { bottom: 130, right: 20, width: 330 },
    },
    {
      type: 'box',
      title: '',
      text: '빅맥 버거를 터치하세요',
      style: { top: height * 0.25, left: width * 0.3, width: 220 },
    },
  ];
  const renderOverlay = () => {
    const data = overlayData[step];
    if (!data) return null;

    const balloonStyle =
      data.type === 'balloon'
        ? {
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#aaa',
            backgroundColor: '#fff',
            padding: 14,
          }
        : {
            borderRadius: 8,
            backgroundColor: '#fff',
            padding: 14,
          };

    return (
      <View style={[styles.overlayBox, data.style, balloonStyle]}>
        {data.title !== '' && <Text style={styles.overlayTitle}>{data.title}</Text>}
        <Text style={styles.overlayText}>{data.text}</Text>
        {step !== 7 && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>다음</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderItem = ({ item }: any) => {
    const isMenuStep = step === 3;
    const isBigmacStep = step === 7 && item.name === '빅맥';
    const highlight = step === 0 || isMenuStep || isBigmacStep;
    const dimmed = step > 0 && !highlight;

    return (
      <TouchableOpacity onPress={() => handleItemPress(item)} disabled={dimmed}>
        <View
          style={{
            width: width / 4.5,
            borderWidth: highlight ? 2 : 1,
            borderColor: highlight ? '#000' : '#ccc',
            borderRadius: 12,
            alignItems: 'center',
            margin: 6,
            paddingVertical: 10,
            backgroundColor: '#fff',
            opacity: isBright('menu') || step === 0 ? 1 : 0.3,
            zIndex: isBright('menu') ? 5 : 0,
          }}
        >
          <Image source={item.image} style={{ width: 60, height: 60, marginBottom: 6 }} resizeMode="contain" />
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Text>
          <Text style={{ fontSize: 12, color: '#555' }}>{item.price}</Text>
          <Text style={{ fontSize: 11, color: '#888' }}>{item.kcal}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Pressable style={{ flex: 1 }} onPress={handleStart}>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#fff' }}>
        {/* 왼쪽 메뉴바 */}
        <View style={{ paddingTop: 100, width: 60, paddingLeft: 5 }}>
          {['홈', '추천메뉴', '버거', '해피밀', '사이드', '커피', '디저트', '음료'].map((label, idx) => (
            <TouchableOpacity
              key={idx}
              style={{
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#ccc',
                paddingVertical: 5,
                marginVertical: 3,
                borderRadius: 6,
                width: 55,
                alignItems: 'center',
                opacity: isBright('menubar') || step === 0 ? 1 : 0.3,
                zIndex: isBright('menubar') ? 5 : 0,
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: '600' }}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 오른쪽 전체 영역 */}
        <View style={{ flex: 1, paddingLeft: 10, paddingRight: 20 }}>
          {/* 상단: 로고 + 처음으로 버튼 */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 40 }}>
            <Image
              source={require('../assets/images/md-logo.png')}
              style={{ width: 80, height: 50 }}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 50,
                right: 0,
                backgroundColor: '#fff',
                paddingVertical: 6,
                paddingHorizontal: 12,
                flexDirection: 'row',
                borderRadius: 8,
                zIndex: 5,
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('KioskSelect')}
            >
              <Image source={require('../assets/images/Home.png')} style={{ width: 20, height: 20, marginRight: 4 }} />
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>처음으로</Text>
            </TouchableOpacity>
          </View>

          {/* 타이틀 + 필터 */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold' }}>버거</Text>
            <Text style={{ fontSize: 13, marginTop: 4 }}>아래에서 세부 메뉴를 확인하세요</Text>
          </View>
          {/* 필터 버튼 */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, rowGap: 6 }}>
            {['전체', '치킨', '비프', '씨푸드', '불고기'].map((label, idx) => (
              <TouchableOpacity
                key={idx}
                style={{
                  borderWidth: 1,
                  borderColor: '#000',
                  borderRadius: 20,
                  paddingVertical: 5,
                  paddingHorizontal: 14,
                  marginRight: 8,
                  marginBottom: 6,
                  backgroundColor: '#fff',
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: '600' }}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList
            data={burgerMenuItems}
            renderItem={renderItem}
            keyExtractor={(_, i) => i.toString()}
            numColumns={3}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 220, paddingRight: 80 }}
          />

          <Image
            source={require('../assets/images/scrollbar.png')}
            style={{
              position: 'absolute',
              right: -30,
              top: height * 0.3,
              width: 90,
              height: 250,
              zIndex: isBright('scrollbar') ? 5 : 0,
              opacity: isBright('scrollbar') || step === 0 ? 1 : 0.3,
            }}
            resizeMode="contain"
          />
        </View>

        {/* 하단 영역 */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: '#fff',
            paddingVertical: 24,
            paddingHorizontal: 20,
            borderTopWidth: 1,
            borderColor: '#ccc',
            zIndex: 1,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../assets/images/bong.png')} style={{ width: 28, height: 28, marginRight: 8 }} />
              <View>
                <Text style={{ fontSize: 13, color: '#000' }}>담은 금액</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
                  ₩{total.toLocaleString()}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#FEBB0D',
                paddingVertical: 12,
                paddingHorizontal: 26,
                borderRadius: 10,
                opacity: isBright('checkout') ? 1 : 0.3,
                zIndex: isBright('checkout') ? 5 : 0,
              }}
            >
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>
                주문내역 확인 후 결제하기
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#000',
                paddingVertical: 10,
                paddingHorizontal: 18,
                backgroundColor: '#fff',
                opacity: isBright('bottom_home') ? 1 : 0.3,
                zIndex: isBright('bottom_home') ? 5 : 0,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: 'bold' }}>처음으로</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 16,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: 'bold' }}>도움기능</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* DIM 처리 레이어 */}
        {step > 0 && (
          <View
            pointerEvents="none"
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 2,
            }}
          />
        )}

        {renderOverlay()}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlayBox: {
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 10,
    zIndex: 50,
  },
  overlayTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 8,
  },
  overlayText: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  nextButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  nextButtonText: {
    color: '#fff',
  },
  dimmed: {
    opacity: 0.3,
  },
});
