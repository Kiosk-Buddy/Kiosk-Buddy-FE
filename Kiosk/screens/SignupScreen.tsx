import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Image, ImageStyle } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
};

export default function SignupScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // DropDownPicker 상태 설정
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: '장애인', value: 'disabled' },
    { label: '노약자', value: 'elderly' },
    { label: '어린이', value: 'child' },
    { label: '기타', value: 'other' },
  ]);

  return (
    <View style={styles.container}>
      {/* 상단 네비게이션 바 */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.navIcon} />
        </TouchableOpacity>

        {/* 오른쪽 화살표로 로그인 화면 이동 */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Image
            source={require('../assets/back.png')}
            style={[styles.navIcon, styles.rightArrow]}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>회원가입</Text>

      <TextInput style={styles.input} placeholder="이름" placeholderTextColor="#999" />
      <TextInput style={styles.input} placeholder="나이" placeholderTextColor="#999" keyboardType="numeric" />

      {/* DropDownPicker 사용 */}
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedValue}
        setItems={setItems}
        placeholder="해당사항"
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        textStyle={{ fontSize: 16 }}
        placeholderStyle={{ color: '#999' }}
        dropDownDirection="AUTO"
      />

      <TextInput style={styles.input} placeholder="전화번호" placeholderTextColor="#999" keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="비밀번호" placeholderTextColor="#999" secureTextEntry />
    </View>
  );
}

// 스타일 타입 인터페이스
interface Styles {
  container: ViewStyle;
  navBar: ViewStyle;
  navIcon: ImageStyle; 
  rightArrow: ImageStyle;
  title: TextStyle;
  input: TextStyle;
  dropdownContainer: ViewStyle;
  dropdown: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  rightArrow: {
    transform: [{ scaleX: -1 }],
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  dropdownContainer: {
    marginBottom: 10,
    zIndex: 1000,
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 50,
  },
});
