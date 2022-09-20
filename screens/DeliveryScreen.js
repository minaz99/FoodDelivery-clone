import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
import { urlFor } from "../sanity";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  return (
    <>
      <View className="bg-blue-500 pt-6 pl-3 z-50">
        <SafeAreaView className="z-50">
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="flex-1"
            >
              <Image source={require("../src/clear.png")} className="w-7 h-7" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className=" font-bold pr-2 text-white text-lg ">
                Order Help
              </Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white p-4 rounded-full shadow-lg mt-5 mr-3 z-50">
            <View className="flex-row">
              <View className="items-center">
                <Text className="text-gray-400 text-lg">
                  Estimated Arrival:
                </Text>
                <Text className="font-bold text-4xl">30-40 Minutes</Text>
              </View>
              <Image
                source={require("../src/food-delivery.png")}
                className="w-16 h-16"
              />
            </View>
            <View className="items-center">
              <Progress.Bar indeterminate={true} size={30}></Progress.Bar>
              <Text className="text-gray-400 text-sm pt-2">
                Your order at {restaurant.title} is being prepared
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className=" flex-1 z-0 "
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{ latitude: restaurant.lat, longitude: restaurant.long }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#fc038c"
        ></Marker>
      </MapView>
      <SafeAreaView className="bg-white flex-row p-6 space-x-2">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="w-7 h-7 rounded-full bg-blue-500"
        />
        <View className="flex-1">
          <Text className="font-bold">Mina Hany</Text>
          <Text className="flex-1 text-xs text-gray-300">Your Deliverer</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-green-500 font-bold text-lg">Call</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default DeliveryScreen;
