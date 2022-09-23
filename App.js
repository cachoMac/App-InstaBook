import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import feeds from "./resources/feeds.json";


const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode={"none"}>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} />
          <Stack.Screen
            name="Tab" 
            component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.email = "";
    this.pass = "";
    this.state = { invalid: false };
  }
  render() {
    return (
      <View style={{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: "#f2f2f2",
      }}>
        {
          this.state.invalid 
          ? <View style={{
              width: "100%", 
              height: "5%", 
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "pink", 
            }}>
              <Text style={{ color: "red" }}>Invalid Credentials</Text>
            </View>
          : null
        }
        <Image source={require('./resources/instabook.png')} style={{ width: "35%", resizeMode: "contain", }}/>
        <TextInput 
          onChangeText={(email => {this.email = email})}
          placeholder="Email"
          style={{
            width: "80%",
            height: 40,
            margin: 5,
            paddingLeft: 20,
            borderRadius: 7,
            borderWidth: 1,
            borderColor: "#e0e0e0",
          }} />
        <TextInput 
          onChangeText={(pass => {this.pass = pass})}
          placeholder="Password"
          secureTextEntry={true}
          style={{
            width: "80%",
            height: 40,
            margin: 5,
            paddingLeft: 20,
            borderRadius: 7,
            borderWidth: 1,
            borderColor: "#e0e0e0",
          }} />
        <View 
          style={[{width:"80%", marginTop: 5}]}>
          <Button
            onPress={() => {
              if (this.email === "mac@gmail.com" && this.pass === "1234") {
                this.setState({ invalid: false });
                this.props.navigation.navigate("Tab")
              } 
              else {
                this.setState({ invalid: true });
              }
            }}
            title="Log In"
            color="#5294eb" />
        </View>
        <View style={{
          width: "100%",
          height: "8%", 
          position: "absolute",
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0" 
        }}>
          <Text style={{ color: "#989898" }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => {
            Alert.alert(
              "Alert",
              "Sorry registration is not available at the moment.",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
           );
          }}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const Tab = createBottomTabNavigator();
class TabNavigator extends React.Component {
  render() {
    return (
      <Tab.Navigator initialRouteName="Feeds">
        <Tab.Screen
          name="Feeds"
          component={FeedsScreen} 
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="ios-home" size={24} color={color} />,
          }} />
        <Tab.Screen 
          name="Account"
          component={AccountScreen} 
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={24} color={color} />,
          }} />
      </Tab.Navigator>
    );
  }
}


class FeedsScreen extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#f2f2f2"
      }}>
        <View style={{
          top: getStatusBarHeight(),
          marginBottom: 25,
          width: "100%", 
          height: 55, 
          alignItems: "center", 
          justifyContent: "center", 
          backgroundColor: "#ffffff" 
        }}>
          <Image
            style={{ height: 35, resizeMode: "contain", }}
            source={require('./resources/instabook.png')}
          />
        </View>
        <FlatList
          data={feeds}
          renderItem={({ item }) => {
            return (
              <View style={{
                alignItems: "center",
                margin: 10,
                borderTopWidth: 1,
                borderColor: "#e0e0e0",
                backgroundColor: "transparent", 
              }}>
                <View style={{
                  flex: 1,
                  width: "100%",
                  alignItems: "center",
                  flexDirection: "row",
                  backgroundColor: "transparent", 
                }}>
                  <Image source={{ uri: item.profile }} 
                    style={{
                      width: 30,
                      height: 30,
                      margin: 10,
                      borderRadius: 60,
                      resizeMode: "contain",
                    }} />
                  <Text style={{ fontSize: 12, }}>{item.name}</Text>
                </View>
                <View style={{ flex: 1, width: "100%", backgroundColor: "transparent", }}>
                  <Text style={{ marginLeft: 10, fontSize: 12,}}>
                    {item.post}
                  </Text>
                </View>
                <Image source={{uri: item.image}}
                  style={{
                    width: 280,
                    height: 280,
                    margin: 15,
                    resizeMode: "contain",
                  }} />
              </View>
            );
          }} 
        />
      </View>
    );
  }
}

class AccountScreen extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        padding: 20,
        paddingTop: getStatusBarHeight() + 20,
        alignItems: 'center',
        backgroundColor: "#f2f2f2",
      }}>
        <Image source={require('./resources/profile.jpg')} 
          style={{ 
            width: 100, 
            height: 100, 
            borderRadius: 100, 
            marginBottom: 10,
            resizeMode: "contain", 
          }} />
        <View style={{
          flexDirection: "row",
          width: "100%",
          paddingVertical: 10,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#e0e0e0", 
          backgroundColor: "#f2f2f2",
        }}>
          <View style={{ flex: 0.5, backgroundColor: "transparent" }}>
            <Text style={{ paddingTop: 10, paddingBottom: 10, }}>
              Name
            </Text>
            <Text style={{ paddingTop: 10, paddingBottom: 10, }}>
              Username
            </Text>
            <Text style={{ paddingTop: 10, paddingBottom: 10, }}>
              Website
            </Text>
            <Text style={{ paddingTop: 10, paddingBottom: 10, }}>
              Bio
            </Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "transparent" }}>
            <Text style={{ paddingTop: 10, paddingBottom: 10, }}>
              Mac Cacho
            </Text>
            <Text style={{ paddingTop: 10, paddingBottom: 10, }}>
              Mac
            </Text>
            <Text style={{ paddingTop: 10, paddingBottom: 10, }}>
              https://mac.com
            </Text>
            <Text style={{ paddingTop: 10, paddingBottom: 10, }}>
              "Hello World!"
            </Text>
          </View>
        </View>
        <View style={[{ width: 120, height: 40, marginTop: "15%" }]}>
          <Button
            onPress={() => this.props.navigation.navigate("Login")}
            title="Log Out"
            color="#ca444a" />
        </View> 
      </View>
    );
  }
}