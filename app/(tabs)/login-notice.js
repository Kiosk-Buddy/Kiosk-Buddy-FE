import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginNotice() {
  const router = useRouter();

  const handleYes = () => {
    router.push('/(tabs)/selectKiosk'); // ✅ 예: 키오스크 선택 화면으로
  };

  const handleNo = () => {
    router.push('/(tabs)'); // ✅ 아니요: 홈 화면으로
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        로그인을 하지 않으면{'\n'}학습 정보를 받을 수 없습니다.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.yesButton} onPress={handleYes}>
          <Text style={styles.buttonText}>예</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.noButton} onPress={handleNo}>
          <Text style={styles.buttonText}>아니요</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  yesButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  noButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
