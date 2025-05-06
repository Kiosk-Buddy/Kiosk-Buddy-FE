import { useRouter } from 'expo-router';
import { Pressable, Text, View, Image, StyleSheet } from 'react-native';

export default function Location() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* 로고 */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/images/m.png')} // PNG 파일 경로
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            {/* 상단 텍스트 */}
            <Text style={styles.title}>식사 장소를 선택해주세요</Text>

            {/* 매장 선택 버튼 */}
            <Pressable
                onPress={() => router.push('/menu')}
                style={styles.box}>
                <Text style={styles.text}>매장</Text>
                <Image
                    source={require('../assets/images/tablex3.png')}  // 여기에 PNG 이미지 경로를 넣어주세요
                    style={styles.image}
                    resizeMode="contain"
                />
            </Pressable>

            {/* 포장 선택 버튼 */}
            <Pressable
                onPress={() => router.push('/menu')}
                style={styles.box}>
                <Text style={styles.text}>포장</Text>
                <Image
                    source={require('../assets/images/tablexx3.png')}  // 여기에 PNG 이미지 경로를 넣어주세요
                    style={styles.image}
                    resizeMode="contain"
                />
            </Pressable>

            {/* QR 코드 및 포인트 적립 안내 */}
            <View style={styles.qrBox}>
                <Text style={styles.bottomText}>포인트를 적립하세요.{'\n'}결제 전 선택 필수</Text>
                <Image
                    source={require('../assets/images/QRx3.png')} // PNG 파일 경로
                    style={styles.bottomImage}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        top: 270, // 상단에서 살짝 떨어진 위치
        left: 0,
        right: 0,
    },
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'white',
    },
    logoContainer: {
        position: 'absolute',
        top: 50, // 로고가 상단에 오도록 위치 조정
        backgroundColor: 'white',
    },
    logo: {
        width: 50,
        height: 50,
        top: 150,
    },
    box: {
        width: 137,  // 가로 137
        height: 187, // 세로 187
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: 'white',
        flexDirection: 'column',  // 텍스트가 위에, 이미지가 아래에 배치되도록 설정
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: '40%',  // 이미지 크기 설정
        height: '40%', // 이미지 크기 설정
        resizeMode: 'contain',
        aspectRatio: 1,
    },
    bottomText: {
        fontWeight: 'bold',
        position: 'absolute',
        top: 25,
        fontSize: 10,
        textAlign: 'center',
    },
    bottomImage: {
        width: 80,
        height: 80,
    },
    qrBox: {
        position: 'absolute',  // 절대 위치로 설정
        bottom: 20,            // 화면 하단에서 20px 띄우기
        left: 10,              // 화면 왼쪽에서 10px 띄우기
        width: 150,
        height: 200,
        backgroundColor: '#FEBB0D',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
