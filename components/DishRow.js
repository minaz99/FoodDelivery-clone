import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../features/basketSlice";
const DishRow = ({ id, name, description, price, image }) => {
  const [pressed, setPressed] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };
  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <TouchableOpacity
      onPress={() => setPressed(!pressed)}
      className="bg-white border p-4 border-gray-200"
    >
      <View className="flex-row">
        <View className="flex-1">
          <Text className="text-lg mb-1">{name}</Text>
          <Text className="text-gray-300">{description}</Text>
          <Text className="text-gray-400">
            <Currency quantity={price} currency="PLN" />
          </Text>
        </View>
        <View>
          <Image
            source={{ uri: urlFor(image).url() }}
            className="h-20 w-20 bg-gray-300 p-4"
          />
        </View>
      </View>
      {pressed && (
        <View className="flex-row space-x-3 pt-2">
          <TouchableOpacity
            disabled={items.length > 0 ? false : true}
            onPress={removeItemFromBasket}
            className="flex-row"
          >
            <Image
              source={require("../src/minus-button.png")}
              className="w-5 h-5"
            />
          </TouchableOpacity>
          <Text>{items.length}</Text>
          <TouchableOpacity onPress={addItemToBasket}>
            <Image source={require("../src/plus.png")} className="w-5 h-5" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default DishRow;
