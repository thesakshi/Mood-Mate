import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const customFonts = {
  LemonRegular: require('/Users/sakshi/Desktop/Mood-Mate/Mood-Mate/client/Font/Lemon-Regular.ttf'),
};

export const fontStyles = StyleSheet.create({
  createAccount: {
    fontFamily: 'LemonRegular',
    fontSize: 24,
    color: '#E1B62F',
    marginBottom: 30,
  },
});

export const loadFonts = async () => {
  await Font.loadAsync(customFonts);
};
