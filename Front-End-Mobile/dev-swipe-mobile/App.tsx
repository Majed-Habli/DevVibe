import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import Hero from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import UserCard from './components/userCard/userCard';

const Stack = createStackNavigator();

function HomeStackNavigator() {
  return (
  <Stack.Navigator >
    <Stack.Screen name="Home" component={Hero} options={{headerShown: false}}/>
    <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerTitle: (props) => <UserCard label='majed' {...props} />, headerLeft: ()=> null }}/>
  {/* Add more screens as needed */}
  </Stack.Navigator>
  );
  }

export default function App() {
  return (
    <NavigationContainer>
      <HomeStackNavigator/>
      {/* <View style={styles.container}>
        <Text>Hello World</Text>
        <StatusBar style="auto" />
      </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
