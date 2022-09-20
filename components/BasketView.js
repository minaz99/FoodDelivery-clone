import { View, Text, ScrollView } from "react-native";
import React from "react";

const BasketView = (props) => {
  return (
    <ScrollView>
      <View className="bg-white">
        <View>
          <Text>BasketView</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default BasketView;
