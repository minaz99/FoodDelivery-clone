import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 3000);
  }, []);

  return (
    <View className="flex-1 bg-blue-400 items-center">
      <Animatable.Image
        source={require("../src/delivery-gif.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      ></Animatable.Image>
      <Animatable.Text className="text-white font-bold text-lg text-center p-2">
        Waiting for restaurant to accept your order!
      </Animatable.Text>
    </View>
  );
};

export default PreparingOrderScreen;
