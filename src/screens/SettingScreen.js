import React from "react";
import styled from "styled-components/native";
import { TextPretendard as Text } from "../static/CustomText";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Button,
  Keyboard,
  SafeAreaView,
  Pressable,
  Linking,
} from "react-native";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
//import useKeyboardHeight from "react-native-use-keyboard-height";
import {
  getItemFromAsync,
  removeItemFromAsync,
  clearItemsFromAsync,
} from "../api/storage";
import { Request } from "../api/request";

const Stack = createStackNavigator();
const backIcon = require("../assets/tch_btnBack.png");

export default function SettingScreen({ navigation, route }) {
  //const keyboardHeight = useKeyboardHeight();
  const request = new Request();
  const [accessToken, setAccessToken] = useState(
    getItemFromAsync("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState(
    getItemFromAsync("refreshToken")
  );
  const {running1, resetStatus} = route.params;

  const policyService = () => {
    Linking.openURL(
      "https://cracker-policy-1.notion.site/f660b546fe964802865a87782771f36c"
    );
  };

  const policyPrivacy = () => {
    Linking.openURL(
      "https://cracker-policy-1.notion.site/e1c340d117774e67a03a07a6b3c53b6e"
    );
  };

  const logoutConfirmAlert = () => {
    if (running1) {
      Alert.alert(
        "알림",
        "로그아웃하시면 현재 시급 계산이 멈춥니다.\n로그아웃하시겠습니까?",
        [
          {
            text: "예",
            onPress: logout,
            style: "destructive",
          },
          {
            text: "아니오",
            style: "cancel",
          },
        ],
        { cancelable: false }
      )
    } else {
      logout()
    }
  }

  const logout = async () => {
    const response = await request.post("/accounts/logout", {
      accessToken: await getItemFromAsync("accessToken"),
      refreshToken: await getItemFromAsync("refreshToken"),
    });
    if (response.status == 200) {
      resetStatus();
      removeItemFromAsync("accessToken");
      removeItemFromAsync("refreshToken");
      navigation.navigate("Home");
    } else {
      Alert.alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <Wrapper>
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: "#f5f5f5",
          borderBottomWidth: 1,
          height: 70,
          alignItems: "flex-end",
        }}
      >
        <BackToHome onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={{width: 40, height: 40}} />
        </BackToHome>
        <Text style={styles.title}>설정</Text>
      </View>
      <Text style={styles.menu}
        onPress={() => {
          navigation.navigate("AdjNickname");
        }}
      >
        닉네임 수정하기
      </Text>
      <Text style={styles.menu} onPress={policyPrivacy}>개인정보처리방침</Text>
      <Text style={styles.menu} onPress={policyService}>서비스 이용약관</Text>
      {/* <Text style={styles.menu} onPress={() => {}}>오픈 소스 라이선스</Text> */}
      <Text style={styles.menu} onPress={() => navigation.navigate("Withdraw", { resetStatus })}>회원 탈퇴하기</Text>
      <Text style={styles.menu} onPress={logoutConfirmAlert}>로그아웃</Text>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    marginVertical: 20,
  },
  menu: {
    width: '100%',
    padding: 15,
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    fontSize: 16,
    lineHeight: 19,
    alignItems: 'center',
    color: '#1c1c1c'
  }
})

const Wrapper = styled.SafeAreaView`
  background-color: white;
  flex: 1;
  align-items: center;
`;

const BackToHome = styled.TouchableOpacity`
  position: absolute;
  width: 60px;
  height: 60px;
  margin: 10px 0px;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Title = styled.Text`
  font-family: "PretendardVariable";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  flex: 1;
  margin: 20px 0px;
`;

const Menu = styled.Text`
  width: 100%;
  padding: 10px;
  border-bottom-width: 1px;
  border-color: #f5f5f5;
  font-family: "PretendardVariable";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  padding: 15px;
  align-items: center;
  color: #1c1c1c;
`;
