import {
  View,
  Text,
  TouchableOpacityBase,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/core";
const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      className="bg-white shadow-sm mr-3"
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="w-60 h-36 rounded-sm items-center "
      />
      <View>
        <Text className="text-center font-bold text-lg ">{title}</Text>
        <View className="flex-row items-center px-1">
          <Image
            source={require("../src/star.png")}
            className="w-4 h-4"
          ></Image>
          <Text className="text-gray-300  text-xs left-1 py-1 italic ">
            <Text className="text-green-400">{rating}</Text> - {genre}
          </Text>
        </View>
        <View className="flex-row px-1 pb-2">
          <Image
            source={require("../src/location.png")}
            className="w-4 h-4"
          ></Image>
          <Text className="text-gray-300 text-xs">
            <Text className=" text-red-700 left-1">Nearby</Text> - {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
