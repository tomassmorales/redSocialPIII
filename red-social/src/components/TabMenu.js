import React, {Component} from "react";
import { StyleSheet } from "react-native"


import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


//Import de screens del menu
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import NewPost from '../screens/NewPost';


const Tab= createBottomTabNavigator();

import { EvilIcons } from '@expo/vector-icons';  
import { FontAwesome, Foundation } from '@expo/vector-icons'


class TabMenu extends Component{

	constructor(props){
		super(props);
		this.state = {
			loggedIn: false,
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
				name= 'new Post'
				component={ NewPost }
                options={
                        { tabBarIcon: () => <FontAwesome name="photo" size={24} color="black" /> }
                    }
				> 
				</Tab.Screen>
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