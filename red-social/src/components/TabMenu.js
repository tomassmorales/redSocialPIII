import React, {Component} from "react";
import { StyleSheet } from "react-native"


import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


//Import de screens del menu
import Home from "../screens/Home";
import Profile from "../screens/Profile";

const Tab= createBottomTabNavigator();

import { EvilIcons } from '@expo/vector-icons'; 

class TabMenu extends Component{

	constructor(props){
		super(props);
		this.state = {

		}
	}

	render(){
		return(
			// sacar navigation container una vez hacemos la main navigation
			<NavigationContainer> 
			<Tab.Navigator screenOptions={ { tabBarShowLabel: false } }>
				<Tab.Screen
				name= "Home" 
				component= { Home }
				options = {
			        { tabBarIcon: () => <EvilIcons name="navicon" size={24} color="black" /> }
				}
				/>
				<Tab.Screen
				name= "Perfil"
				component= { Profile }
				options = {
				{ tabBarIcon: ()=> <EvilIcons name="user" size={24} color="black" />}
				}
				/>
			</Tab.Navigator>
			</NavigationContainer>
		)
	}


}

export default TabMenu;