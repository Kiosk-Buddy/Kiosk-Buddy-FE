// src/data/burgerMenu.ts
import type { ImageSourcePropType } from 'react-native';

export interface BurgerItem {
  name: string;
  price: string;
  kcal?: string;
  image: ImageSourcePropType;
}

export const burgerMenuItems: BurgerItem[] = [
  { name: '빅맥', price: 'W5800', kcal: '582kcal', image: require('../assets/images/bigmacx3.png') },
  { name: '더블 상하이 버거', price: 'W7000', kcal: '759kcal', image: require('../assets/images/doubleshangx3.png') },
  { name: '상하이 버거', price: 'W6300', kcal: '501kcal', image: require('../assets/images/shangx3.png') },
  { name: '1955 버거', price: 'W7200', kcal: '572kcal', image: require('../assets/images/1955x3.png') },
  { name: '슈슈 버거', price: 'W4200', kcal: '409kcal', image: require('../assets/images/shux3.png') },
  { name: '슈비버거', price: 'W6600', kcal: '540kcal', image: require('../assets/images/shubix3.png') },
];
