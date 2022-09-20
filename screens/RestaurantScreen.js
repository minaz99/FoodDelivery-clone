import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { urlFor } from "../sanity";
import RestaurantCard from "../components/RestaurantCard";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();

  const {
    params: {
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
    },
  } = useRoute();
  //console.log(urlFor(imgUrl).url());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const img = urlFor(imgUrl).url();
  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image source={{ uri: img }} className="w-full h-56" />
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            className="absolute mt-8 ml-3"
          >
            <Image
              source={require("../src/back-button.png")}
              className="w-8 h-8"
            />
          </TouchableOpacity>
          <View className="bg-white p-4 space-y-2 items-center">
            <Text className="font-bold text-xl">{title}</Text>
            <View className="flex-row items-center">
              <Image
                source={require("../src/star.png")}
                className="w-4 h-4"
              ></Image>
              <Text className="text-gray-300  text-xs left-1 py-1 italic ">
                <Text className="text-green-400">{rating}</Text> - {genre}
                {"  "}
              </Text>
            </View>
            <View className="flex-row  ">
              <Image
                source={require("../src/location.png")}
                className="w-4 h-4"
              ></Image>
              <Text className="text-gray-300 text-xs">
                <Text className=" text-red-700 left-1"> Nearby</Text> -{" "}
                {address}
              </Text>
            </View>
            <View className="flex-row space-x-1">
              <Image
                source={require("../src/info.png")}
                className="w-4 h-4"
              ></Image>
              <Text className="text-gray-300 text-xs">{short_description}</Text>
            </View>
            <TouchableOpacity className="flex-row border-y border-gray-300 p-4">
              <Image
                source={require("../src/question-mark.png")}
                className="h-4 w-4"
              />
              <Text className="pl-2 font-bold flex-1">
                Have a food allergy ?
              </Text>
              <Image
                source={require("../src/right-arrow.png")}
                className="h-4 w-4"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="pb-36">
          <Text className="font-bold text-xl p-4">Menu</Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
