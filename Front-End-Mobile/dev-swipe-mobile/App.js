import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import Hero from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import UserCard from "./components/userCard/userCard";
import CustomImageButton from "./components/custom button/customImageButton";

const Stack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Hero}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: (props) => <UserCard label="majed" {...props} />,
          headerLeft: () => null,
          headerRight: (props) => (
            <CustomImageButton
              image_name={"Notify-button.png"}
              image_height={30}
              image_width={30}
              margin={20}
            />
          ),
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "#c7c7c7",
            // paddingHorizontal: 40,
          },
          // headerTitleContainerStyle: { paddingRight: 20 },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
