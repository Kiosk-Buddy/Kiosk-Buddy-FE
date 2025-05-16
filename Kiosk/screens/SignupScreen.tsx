// screens/SignupScreen.tsx
import React, { useState } from 'react';
import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
Alert,
Image,
ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type SignupNavProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

export default function SignupScreen() {
const navigation = useNavigation<SignupNavProp>();

const [name, setName] = useState('');
const [age, setAge] = useState('');
const [type, setType] = useState<string | null>(null);
const [phone, setPhone] = useState('');
const [password, setPassword] = useState('');

const [open, setOpen] = useState(false);
const [items, setItems] = useState([
{ label: '장애인', value: 'disabled' },
{ label: '노약자', value: 'elderly' },
{ label: '어린이', value: 'child' },
{ label: '기타', value: 'other' },
]);

const handleSignup = async () => {
console.log('회원가입 요청'); // 확인용 로그

if (!name || !age || !phone || !password) {
  return Alert.alert('모든 항목을 입력해 주세요');
}

try {
  const res = await fetch('http://172.16.83.105:8080/api/member/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      age: Number(age),
      phoneNumber: phone,
      password,
      type,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return Alert.alert('회원가입 실패', data.message || '알 수 없는 오류');
  }

  Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.', [
    {
      text: '확인',
      onPress: () => navigation.replace('Login'),
    },
  ]);
} catch (err) {
  console.error(err);
  Alert.alert('네트워크 오류', '서버에 연결할 수 없습니다.');
}

};

return ( <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled"> <View style={styles.navBar}>
\<TouchableOpacity onPress={() => navigation.goBack()}>
\<Image source={require('../assets/back.png')} style={styles.navIcon} /> </TouchableOpacity>
\<TouchableOpacity onPress={() => navigation.replace('Login')}>
\<Image source={require('../assets/back.png')} style={[styles.navIcon, styles.rightArrow]} /> </TouchableOpacity> </View>


  <Text style={styles.title}>회원가입</Text>

  <TextInput
    style={styles.input}
    placeholder="이름"
    placeholderTextColor="#999"
    value={name}
    onChangeText={setName}
  />
  <TextInput
    style={styles.input}
    placeholder="나이"
    placeholderTextColor="#999"
    keyboardType="numeric"
    value={age}
    onChangeText={setAge}
  />

  <View style={{ zIndex: 1000 }}>
    <DropDownPicker
      open={open}
      value={type}
      items={items}
      setOpen={setOpen}
      setValue={setType}
      setItems={setItems}
      placeholder="해당사항"
      containerStyle={styles.dropdownContainer}
      style={styles.dropdown}
      textStyle={{ fontSize: 16 }}
      placeholderStyle={{ color: '#999' }}
      dropDownDirection="AUTO"
      zIndex={1000}
      zIndexInverse={3000}
    />
  </View>

  <TextInput
    style={styles.input}
    placeholder="전화번호"
    placeholderTextColor="#999"
    keyboardType="phone-pad"
    value={phone}
    onChangeText={setPhone}
  />
  <TextInput
    style={styles.input}
    placeholder="비밀번호"
    placeholderTextColor="#999"
    secureTextEntry
    value={password}
    onChangeText={setPassword}
  />

  <View style={{ zIndex: 1 }}>
    <TouchableOpacity style={styles.button} onPress={handleSignup}>
      <Text style={styles.buttonText}>회원가입</Text>
    </TouchableOpacity>
  </View>
</ScrollView>

);
}

const styles = StyleSheet.create({
container: {
padding: 20,
backgroundColor: '#fff',
flexGrow: 1,
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
marginVertical: 20,
},
input: {
height: 50,
borderColor: '#ccc',
borderWidth: 1,
borderRadius: 8,
marginBottom: 12,
paddingHorizontal: 12,
fontSize: 16,
color: '#000',
},
dropdownContainer: {
marginBottom: 12,
},
dropdown: {
borderColor: '#ccc',
borderWidth: 1,
borderRadius: 8,
minHeight: 50,
},
button: {
backgroundColor: '#28a745',
height: 50,
borderRadius: 8,
justifyContent: 'center',
alignItems: 'center',
marginTop: 20,
},
buttonText: {
color: '#fff',
fontSize: 18,
fontWeight: '600',
},
}); 
