import styled from "styled-components/native";
import { SafeAreaView } from "react-native";
import { TextPretendard as Text } from "../static/CustomText";
import { useState, useEffect, useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import FastImage from 'react-native-fast-image';

const Stack = createStackNavigator();
const CardView = require("../assets/CardView.gif");

const CardScreen = ({ navigation, route }) => {
  const { hours, resetStatus } = route.params;
  const [text, setText] = useState('알바 끝\n카드 뽑는 중!');
  useFocusEffect(useCallback(() => {
    setTimeout(() => {
      setText('카드 뽑기 완료!')
      navigation.navigate("CardPick", { hours: hours, resetStatus });
    }, 5000);
  }, []));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <FastImage source={CardView} resizeMode="contain" style={{width: '100%', height: '70%'}} />
      <Text style={{textAlign: 'center', color: '#1C1C1C', fontSize: 24, fontWeight: '600'}}>{text}</Text>
    </SafeAreaView>
  );
};

export default CardScreen;
