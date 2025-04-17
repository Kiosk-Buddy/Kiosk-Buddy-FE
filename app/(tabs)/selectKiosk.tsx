import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, FlatList, ImageSourcePropType } from 'react-native';

const KIOSK_ITEMS: ImageSourcePropType[] = [
  require('../../assets/images/burger.png'),
  require('../../assets/images/placeholder.png'),
  require('../../assets/images/placeholder.png'),
  require('../../assets/images/placeholder.png'),
  require('../../assets/images/placeholder.png'),
  require('../../assets/images/placeholder.png'),
];

export default function SelectKiosk() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const renderItem = ({ item, index }: { item: ImageSourcePropType; index: number }) => {
    const isSelected = selectedIndex === index;
    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => setSelectedIndex(index)}
      >
        <Image source={item} style={styles.image} resizeMode="contain" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>학습하고 싶은 키오스크를 선택하세요!</Text>
      <FlatList
        data={KIOSK_ITEMS}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;
const itemSize = screenWidth / 3 - 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  grid: {
    alignItems: 'center',
  },
  item: {
    width: itemSize,
    height: itemSize,
    margin: 10,
    backgroundColor: '#ccc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    borderColor: 'green',
    borderWidth: 3,
  },
  image: {
    width: '80%',
    height: '80%',
  },
});
