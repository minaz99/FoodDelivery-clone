import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";
const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const total = useSelector(selectBasketTotal);
  if (items.length === 0) return null;
  return (
    <View className="bottom-5 absolute z-50 p-4 w-full">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="bg-blue-300 flex-row p-4 rounded-lg"
      >
        <Text className="bg-blue-500 text-white w-5 h-7 rounded text-center pt-1">
          {items.length}
        </Text>
        <Text className=" font-bold text-white flex-1 text-center pt-1">
          View Basket
        </Text>
        <Text className=" text-white pt-1">
          <Currency quantity={total} currency="PLN" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
