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
			<Tab.Navigator screenOptions={ { tabBarShowLabel: false } }>
				<Tab.Screen
				name= "Home" 
				component= { Home }
				options = {
			        { tabBarIcon: () => <EvilIcons name="navicon" size={24} color="black" /> }
				}
				/>
				<Tab.Screen
				name= "Buscar"
				component= { Search }
				options = {
				{ tabBarIcon: ()=> <EvilIcons name="search" size={24} color="black" />}
				}
				/>
				<Tab.Screen
				name= "Perfil"
				component= { Profile }
				options = {
				{ tabBarIcon: ()=> <EvilIcons name="user" size={24} color="black" />}
				}
				initialParams = {{logout: ()=> this.props.route.params.logout()}}
				/>
			</Tab.Navigator>
		)
	}


}

export default TabMenu;