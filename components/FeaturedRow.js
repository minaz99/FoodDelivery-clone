import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { ScrollView } from "react-native";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";
const FeaturedRow = ({ id, title, description }) => {
  const [rest, setRest] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured" && _id == $id ] {
      ..., 
    restaurants[] -> {
      ...,    
      dishes[] ->,
      type -> {
        name
      }       
    },
  }[0]`,
        { id }
      )
      .then((data) => {
        setRest(data?.restaurants);
      });
  }, []);
  //console.log(rest);
  return (
    <View>
      <View className="flex-row px-4 mt-4 items-center justify-between">
        <Text className="flex-1 font-bold text-lg">{title}</Text>
        <Image source={require("../src/right-arrow.png")} className="w-7 h-7" />
      </View>
      <Text className="text-gray-400 text-s px-4">{description}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="pt-2"
      >
        {rest?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
