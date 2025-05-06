import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ImageSourcePropType } from 'react-native';



interface BurgerItem {
    name: string;
    price: string;
    kcal?: string;
    image: ImageSourcePropType;
}

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

const burgerMenuItems: BurgerItem[] = [
    { name: '빅맥', price: 'W5800', kcal: '582kcal', image: require('../assets/images/bigmacx3.png') }, // 실제 이미지 경로
    { name: '더블 상하이 버거', price: 'W7000', kcal: '759kcal', image: require('../assets/images/doubleshangx3.png') }, // 실제 이미지 경로
    { name: '상하이 버거', price: 'W6300', kcal: '501kcal', image: require('../assets/images/shangx3.png') }, // 실제 이미지 경로
    { name: '1955 버거', price: 'W7200', kcal: '572kcal', image: require('../assets/images/1955x3.png') }, // 실제 이미지 경로
    { name: '슈슈 버거', price: 'W4200', kcal: '409kcal', image: require('../assets/images/shux3.png') }, // 실제 이미지 경로
    { name: '슈비버거', price: 'W6600', kcal: '540kcal', image: require('../assets/images/shubix3.png') }, // 실제 이미지 경로
];

interface MenuScreenProps {}

const MenuScreen: React.FC<MenuScreenProps> = () => {
    const renderSideMenuItem = ({ item }: { item: MenuItem }) => (
        <TouchableOpacity style={styles.sideMenuItem}>
            <Text style={styles.sideMenuText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderBurgerItem = ({ item }: { item: BurgerItem }) => (
        <TouchableOpacity
            style={styles.burgerItem}
            onPress={() => {
                console.log(`${item.name} 클릭됨`);
                // 여기서 나중에 navigation 로직 넣으면 됨
            }}
        >
            <Image source={item.image} style={styles.burgerImage} resizeMode="contain" />
            <View style={styles.burgerInfo}>
                <Text style={styles.burgerName}>{item.name}</Text>
                <Text style={styles.burgerPrice}>{item.price} {item.kcal && `(${item.kcal})`}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.sideMenu}>
                <FlatList
                    data={sideMenuItems}
                    renderItem={renderSideMenuItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            {/* 버거 메뉴 리스트 */}
            <View style={styles.burgerMenu}>
                <FlatList
                    data={burgerMenuItems}
                    renderItem={renderBurgerItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    sideMenu: {
        top:50,
        width: 120,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    sideMenuItem: {
        top:50,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
    },
    sideMenuText: {
        fontSize: 12,
    },
    burgerMenu: {
        top:150,
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    burgerItem: {
        width: '30%',
        margin: '1.5%',
        backgroundColor: '#fff',
        borderRadius: 0,
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,  // 네모난 박스를 만들기 위해 테두리 추가
        borderColor: '#e0e0e0',  // 테두리 색상
        borderRadius: 10,  // 둥근 모서리가 아닌 네모난 형태로 만들기 위해 0 설정
    },
    burgerImage: {
        width: 70,
        height: 70,
        margintop: 5,
    },
    burgerInfo: {
        alignItems: 'left',
    },
    burgerName: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    burgerPrice: {
        fontSize: 10,
        color: 'black',
        textAlign: 'left',
    },
});

export default MenuScreen;
