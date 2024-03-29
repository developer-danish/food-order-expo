import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  StatusBar,
  Image,
} from "react-native";
import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import { useState } from "react";
import { BottomTabNavigation } from "./navigation/BottomTabNavigation";
import { Shipping } from "./pages/Shipping";
import { Shop } from "./pages/Shop";
import { Payment } from "./pages/Payment";

const Stack = createStackNavigator();

export default function App() {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  const [currentMenu, setCurrentMenu] = useState("home");
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
        <Stack.Navigator
          initialRouteName="BottomHome"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#ffc739",
            },
            headerRight: () => (
              <Image
                style={{ width: 50, height: 50 }}
                source={require("./assets/logo.png")}
              />
            ),
          }}
        >
          <Stack.Screen
            name="BottomHome"
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Shipping" component={Shipping} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Shop" component={Shop} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
