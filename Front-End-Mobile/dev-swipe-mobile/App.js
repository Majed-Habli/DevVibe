import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Image } from "react-native";
import Hero from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import UserCard from "./components/userCard/userCard";
// import CustomImageButton from "./components/custom button/customImageButton";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Matches from "./pages/matches/matches";
import Profile from "./pages/profile/profile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Hero}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Dashboard" component={TabNavigator} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: (props) => <UserCard label="majed" {...props} />,
          headerLeft: () => null,
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "#c7c7c7",
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.icon_container}>
              <Image
                source={require("./assets/Home2.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text>Home</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Messaging"
        component={Matches}
        options={{
          headerTitleStyle: {
            paddingLeft: "45%",
          },
          title: "Matches",
          headerRight: (props) => (
            <Image
              style={{ width: 30, height: 30, margin: 20 }}
              source={require("./assets/Notify-button.png")}
            />
          ),
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "#c7c7c7",
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.icon_container}>
              <Image
                source={require("./assets/Messages.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text>Chats</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: (props) => (
            <Text style={{ fontSize: 20, marginLeft: "40%" }}>Majed</Text>
          ),
          headerLeft: (props) => (
            <Image
              style={{ width: 30, height: 30, margin: 20 }}
              source={require("./assets/backArrow.png")}
            />
          ),
          headerRight: (props) => (
            // <CustomImageButton
            //   image_name={"Notify-button.png"}
            //   image_height={30}
            //   image_width={30}
            //   margin={20}
            // />
            <Image
              style={{ width: 30, height: 30, margin: 20 }}
              source={require("./assets/Notify-button.png")}
            />
          ),
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "#c7c7c7",
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.icon_container}>
              <Image
                source={require("./assets/Profile.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
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
  icon_container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
