import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const CategoryCard = ({ url, title }) => {
  return (
    <TouchableOpacity className="relative items-center pr-2">
      <Image source={{ uri: url }} className="w-12 h-12 p-10 rounded" />
      <Text className="absolute bottom-0  text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
