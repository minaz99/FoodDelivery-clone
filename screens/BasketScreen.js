import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restuarant = useSelector(selectRestaurant);
  const basketTotal = useSelector(selectBasketTotal);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <View className="pb-136">
      <View className="bg-white pt-4 items-center">
        <View className="flex-row p-4">
          <View className="flex-col flex-1">
            <Text className="text-center font-bold text-lg">Basket</Text>
            <Text className="text-gray-300 text-sm text-center flex-1">
              {restuarant.title}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require("../src/remove.png")} className="w-7 h-7" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View className="bg-white mt-6 flex-row p-2 items-center space-x-1">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="w-7 h-7 rounded-full bg-blue-300"
          />
          <Text>Delivery in 50-75 min</Text>
        </View>
      </View>
      <ScrollView className="mt-6 bg-white p-4 divide-y divide-gray-200">
        {Object.entries(groupedItemsInBasket).map(([key, items]) => (
          <View key={key} className="flex-row items-center">
            <Text className="text-blue-500 px-1">{items.length} x</Text>
            <Image
              source={{ uri: urlFor(items[0]?.image).url() }}
              className="h-12 w-12 rounded-full"
            />
            <Text className="flex-1">{items[0]?.name}</Text>
            <View>
              <Text>
                <Currency quantity={items[0]?.price} currency="PLN"></Currency>
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                <Text className="text-green-500">Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View className="bg-white p-4 mt-5 space-y-4 ">
        <View className="flex-row">
          <Text className="text-gray-300 flex-1">Subtotal</Text>
          <Text>
            <Currency quantity={basketTotal} currency="PLN" />
          </Text>
        </View>
        <View className="flex-row">
          <Text className="text-gray-300 flex-1">Delivery Fee</Text>
          <Text>
            <Currency quantity={7.9} currency="PLN" />
          </Text>
        </View>
        <View className="flex-row">
          <Text className="flex-1">Order Total</Text>
          <Text className="font-bold">
            <Currency quantity={basketTotal + 7.9} currency="PLN" />
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("PreparingOrderScreen")}
          className="bg-blue-500 p-4 rounded m-4 items-center  "
        >
          <Text className="text-white text-lg">Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BasketScreen;
