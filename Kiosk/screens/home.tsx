import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Location'>;

export type RootStackParamList = {
    Menu: undefined;        // menu 화면 추가
    Location: undefined;
};

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/home-ad.png')} // 로컬 이미지
                style={styles.topImage}
                resizeMode="cover"
            />

            <Pressable
                onPress={() =>  navigation.navigate('Location')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>주문하기</Text>
            </Pressable>

            <Text style={styles.infoText}>
                일반적인 영양 권장량은 일일 2,000 칼로리지만 필요한 칼로리는 다를 수 있습니다. 요청 시 추가 영양정보를 제공해 드립니다.
            </Text>

            <View style={styles.container1}>
                <View style={styles.boxOne}>
                    <Text style={styles.boxText}>언어 선택</Text>
                </View>
                <View style={styles.boxTwo}>
                    <Text style={styles.boxText}>도움기능</Text>
                </View>
            </View>

            <View style={styles.qrBox}>
                <Text style={styles.bottomText}>포인트를 적립하세요.{'\n'}결제 전 선택 필수</Text>
                <Image
                    source={require('../assets/images/QR.png')} // PNG 파일 경로
                    style={styles.bottomImage}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row', // 가로로 배치
        justifyContent: 'space-between', // 두 박스 간의 공간을 균등하게 배분
        width: 180, // 부모 뷰의 가로 크기 100%로 설정
        position: 'absolute',
        bottom: 75, // 화면 하단으로 배치
        right : 20,
        paddingHorizontal: 10, // 양옆에 간격 추가
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    button: {
        width: 170,
        height: 67,
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'black',
        right: 20,
        bottom: 120,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        position: 'absolute',
    },
    buttonText: {
        fontSize: 20,
    },
    topImage: {
        position: 'absolute',
        top: 0,
    },
    infoText: {
        fontSize: 10, // 폰트 크기 조정
        width: 180,
        color: '#000',
        paddingHorizontal: 10, // 텍스트 양옆 여백 추가
        marginBottom: 10,
        right: 15,
        position: 'absolute',
        bottom: 10, // 하단에 위치
        textAlign: 'justify', // 오른쪽 정렬
    },
    boxOne: {
        borderWidth: 1,
        borderColor: 'black',
        width: 85,
        height: 35,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10, // 가로 간격을 추가하여 텍스트가 여유롭게 보이도록 설정
    },
    boxTwo: {
        borderWidth: 1,
        borderColor: 'black',
        width: 85,
        height: 35,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    boxText: {
        fontSize: 14,
        color: '#000',
    },
    qrBox: {
        position: 'absolute',  // 절대 위치로 설정
        bottom: 0,            // 화면 하단에서 20px 띄우기
        left: 10,              // 화면 왼쪽에서 10px 띄우기
        width: 150,
        height: 200,
        backgroundColor: '#FEBB0D',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomImage: {
        width: 80,
        height: 80,
    },
    bottomText: {
        fontWeight: 'bold',
        position: 'absolute',
        top: 25,
        fontSize: 10,
        textAlign: 'center',
    },
});
