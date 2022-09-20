import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { textDecorationStyle } from "react-native-wind/dist/styles/typography/text-decoration-style";
import sanityClient from "../sanity";
import { urlFor } from "../sanity";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    sanityClient.fetch(`*[_type=="category"]`).then((data) => {
      setCategories(data);
    });
  }, []);
  // console.log(categories);
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          url={urlFor(category.image).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
