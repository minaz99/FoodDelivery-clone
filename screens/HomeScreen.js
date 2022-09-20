import {
  createNavigatorFactory,
  useNavigation,
} from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";
import { useTailwind } from "nativewind";
import { ChevronDownIcon, UserIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import CategoryCard from "../components/CategoryCard";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
const HomeScreen = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"] {
        ..., 
      restaurants[]-> {
        ...,    
        dishes[]->       
      }
    }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView>
      <View className="bg-white ">
        <View className="flex-row mt-8 ml-3 items-center">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="w-7 h-7 p-5 bg-blue-400 rounded-full"
          />
          <View className="ml-2 flex-1">
            <Text className="font-bold text-green-500">Deliver Now!</Text>
            <Text className="font-bold">
              Current Location{" "}
              <Image
                source={require("../src/arrow-down-sign-to-navigate.png")}
                className="w-3 h-3"
              />
            </Text>
          </View>
          <Image
            source={require("../src/user.png")}
            className="h-3 w-2 p-4 mr-2"
          />
        </View>
        <View className="flex-row items-center px-4">
          <View className="mt-3 p-2 flex-row flex-1 px-2 bg-gray-200 mb-2 items-center">
            <Image
              source={require("../src/search.png")}
              className="w-4 h-4 mx-2"
            />
            <TextInput
              placeholder="Restaurants and cuisines"
              keyboardType="default"
            />
          </View>
          <Image
            source={require("../src/volume-bars.png")}
            className="w-5 h-5 ml-2"
          />
        </View>
      </View>
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: "40%",
        }}
      >
        <Categories />
        {featuredCategories?.map((cat) => (
          <FeaturedRow
            key={cat._id}
            id={cat._id}
            title={cat.name}
            description={cat.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
