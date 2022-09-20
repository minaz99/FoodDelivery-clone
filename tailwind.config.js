/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/HomeScreen.{js,jsx,ts,tsx}",
    "./screens/RestaurantScreen.{js,jsx,ts,tsx}",
    "./screens/BasketScreen.{js,jsx,ts,tsx}",
    "./screens/PreparingOrderScreen.{js,jsx,ts,tsx}",
    "./screens/DeliveryScreen.{js,jsx,ts,tsx}",
    "./components/Categories.{js,jsx,ts,tsx}",
    "./components/CategoryCard.{js,jsx,ts,tsx}",
    "./components/FeaturedRow.{js,jsx,ts,tsx}",
    "./components/RestaurantCard.{js,jsx,ts,tsx}",
    "./components/DishRow.{js,jsx,ts,tsx}",
    "./components/BasketIcon.{js,jsx,ts,tsx}",
    "./components/BasketView.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
