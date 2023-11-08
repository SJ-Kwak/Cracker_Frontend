import React, { Component } from "react";
import styled from "styled-components/native";

import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import FastImage from 'react-native-fast-image';

const Stack = createStackNavigator();
const CardView = require("../assets/CardView.gif");

const CardScreen = ({ navigation, route }) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate("CardPick", { hours: route.params.hours });
  //   }, 5000);
  // }, []);
  useFocusEffect(useCallback(() => {
    setTimeout(() => {
      navigation.navigate("CardPick", { hours: route.params.hours });
    }, 5000);
  }, []));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FastImage source={CardView} style={{alignSelf: "center", width: '100%', height: '100%'}} />
    </SafeAreaView>
  );
};

export default CardScreen;
