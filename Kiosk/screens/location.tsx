// location.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Modal,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Location'>;
type RouteProps = RouteProp<RootStackParamList, 'Location'>;

export default function LocationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { scenario, mode } = route.params;

  const [showMissionModal, setShowMissionModal] = useState(false);

  const missionText =
    scenario === 'medium'
      ? '미션:\n빅맥 세트(감자튀김, 콜라) 1개 포장 주문'
      : '미션:\n1) 빅맥 세트(감자튀김, 콜라)\n2) 빅맥 단품\n3) 빅맥 세트(코울슬로, 사이다, 치즈스틱)\n각각 1개 포장 주문';

  const goNext = () => {
    navigation.navigate('Menu', route.params);
  };

  return (
    <View style={styles.container}>
      {/* 처음으로 버튼 */}
      {mode === 'learn' && (
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.navigate('KioskSelect')}
        >
          <Image source={require('../assets/images/Home.png')} style={styles.homeIcon} />
          <Text style={styles.homeText}>처음으로</Text>
        </TouchableOpacity>
      )}

      {/* 로고 */}
      <Image
        source={require('../assets/images/mini-m.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* 안내 말풍선 */}
      <View style={styles.bubbleWrapper}>
        <View style={styles.triangleDown} />
        <View style={styles.speechBubble}>
          <Text style={styles.bubbleText}>포장 버튼을 눌러보세요</Text>
        </View>
      </View>

      {/* 매장/포장 버튼 */}
      <View style={styles.optionContainer}>
        <View style={styles.optionBox}>
          <Image
            source={require('../assets/images/table-1.png')}
            style={styles.optionImage}
            resizeMode="contain"
          />
          <Text style={styles.optionText}>매장</Text>
        </View>

        <TouchableOpacity style={[styles.optionBox, styles.highlightedBox]} onPress={goNext}>
          <Image
            source={require('../assets/images/bag-1.png')}
            style={styles.optionImage}
            resizeMode="contain"
          />
          <Text style={styles.optionText}>포장</Text>
        </TouchableOpacity>
      </View>

      {/* 언어 선택 */}
      <Text style={styles.languageText}>언어를 선택해주세요</Text>
      <View style={styles.languageButtons}>
        <TouchableOpacity style={styles.langBtn}>
          <Text style={styles.langText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.langBtn}>
          <Text style={styles.langText}>한국어</Text>
        </TouchableOpacity>
      </View>

      {/* 포인트 적립 안내 */}
      <View style={styles.bottomLeftBox}>
        <Text style={styles.qrText}>포인트를 적립하세요.{'\n'}결제 전 선택 필수</Text>
        <Image
          source={require('../assets/images/QR.png')}
          style={styles.qrImage}
          resizeMode="contain"
        />
      </View>

      {/* 도움 기능 */}
      <TouchableOpacity style={styles.helpBtn}>
        <Text style={styles.helpBtnText}>도움기능</Text>
      </TouchableOpacity>

      {/* 미션 보기 버튼 */}
      {mode === 'learn' && (
        <TouchableOpacity
          style={styles.missionButton}
          onPress={() => setShowMissionModal(true)}
        >
          <Text style={styles.missionButtonText}>미션 보기</Text>
        </TouchableOpacity>
      )}

      {/* 미션 보기 모달 (시험보기와 동일) */}
      <Modal
        transparent
        animationType="slide"
        visible={showMissionModal}
        onRequestClose={() => setShowMissionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{missionText}</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setShowMissionModal(false)}
            >
              <Text style={styles.modalButtonText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },

  homeBtn: {
    position: 'absolute', top: 60, right: 20, backgroundColor: '#fff',
    paddingVertical: 6, paddingHorizontal: 12, flexDirection: 'row',
    borderRadius: 8, zIndex: 5, alignItems: 'center', borderWidth: 1,
  },
  homeIcon: { width: 20, height: 20, marginRight: 6 },
  homeText: { fontSize: 14, fontWeight: 'bold', color: '#000' },

  logo: {
    width: 70,
    height: 70,
    marginTop: height * 0.15,
  },

  bubbleWrapper: {
    marginTop: 12,
    alignItems: 'center',
  },
  triangleDown: {
  width: 18,
  height: 18,
  backgroundColor: '#fff',
  transform: [{ rotate: '45deg' }],
  position: 'absolute',
  top: '80%', 
  left: '50%',
  marginLeft: -9, 
  borderBottomWidth: 2,
  borderRightWidth: 2,
  borderColor: '#000',
  zIndex: 5
},
  speechBubble: {
    backgroundColor: '#fff',
    padding: 14,
    top: 0,
    right: -50,
    borderRadius: 8,
    borderColor: '#000',
    borderWidth: 2,
  },
  bubbleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },

  optionContainer: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 24,
  },
  optionBox: {
    width: 150,
    height: 170,
    borderWidth: 1.5,
    borderColor: '#000',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightedBox: {
    borderColor: '#FF3366',
    borderWidth: 2,
  },
  optionImage: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  languageText: {
    marginTop: 32,
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  langBtn: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  langText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },

  bottomLeftBox: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    backgroundColor: '#FEBB0D',
    borderRadius: 18,
    padding: 14,
    width: 180,
    alignItems: 'center',
  },
  qrText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  qrImage: {
    width: 44,
    height: 44,
  },

  helpBtn: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    borderWidth: 1.5,
    borderColor: '#000',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  helpBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  missionButton: {
    position: 'absolute',
    bottom: 100,
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
});
