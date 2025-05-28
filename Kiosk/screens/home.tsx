import React from 'react';
import { StyleSheet, View, Text, Image, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Location'>;

export type RootStackParamList = {
  Menu: undefined;
  Location: undefined;
};

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* 배경 이미지 */}
      <Image
        source={require('../assets/images/home-ad.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* QR 박스 */}
      <View style={styles.qrBox}>
        <Text style={styles.qrText}>포인트를 적립하세요.{'\n'}결제 전 선택 필수</Text>
        <Image
          source={require('../assets/images/QR.png')}
          style={styles.qrImage}
        />
      </View>

      {/* 주문하기 버튼 */}
      <Pressable style={styles.orderButton} onPress={() => navigation.navigate('Location')}>
        <Text style={styles.orderButtonText}>주문하기</Text>
      </Pressable>

      {/* 안내문구 */}
      <Text style={styles.infoText}>
        일반적인 영양 권장량은 일일 2,000 칼로리지만 필요한 칼로리는 다를 수 있습니다. 요청 시 추가 영양정보를 제공해 드립니다.
      </Text>

      {/* 하단 버튼들 */}
      <View style={styles.bottomButtons}>
        <Pressable style={styles.bottomBtn}>
          <Text style={styles.bottomBtnText}>언어 선택</Text>
        </Pressable>
        <Pressable style={styles.bottomBtn}>
          <Text style={styles.bottomBtnText}>도움기능</Text>
        </Pressable>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  qrBox: {
    position: 'absolute',
    bottom: 180,
    left: 20,
    width: 140,
    height: 180,
    backgroundColor: '#FEBB0D',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrText: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  qrImage: {
    width: 70,
    height: 70,
    marginTop: 6,
  },
  orderButton: {
    position: 'absolute',
    bottom: 130,
    right: 20,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 4,
  },
  orderButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  infoText: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    fontSize: 10,
    color: '#000',
    width: width * 0.5,
    textAlign: 'right',
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    flexDirection: 'row',
    gap: 12,
  },
  bottomBtn: {
    width: 90,
    height: 36,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBtnText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
