import React, {Component} from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {auth} from "../firebase/config" 


let Stack = createNativeStackNavigator();

import Login from "../screens/Login";
import Register from "../screens/Register";
import TabMenu from "./TabMenu";


class MainNav extends Component {
	constructor(props){
		super(props);
		this.state = {
			loggedIn: false
		}
	}

	componentDidMount(){
		auth.onAuthStateChanged (user => {
			if(auth.currentUser != null){
				this.setState({
					loggedIn:true,
					logError: "",
					regError: ""
				})
			}
		})
	}

	logout(){
		auth.signOut()
		.then((response) => {
			this.setState({
				loggedIn: false
			})
		})
	}

	logIn(email,password){
		auth.signInWithEmailAndPassword(email,password)
		.then((response)=> {
			this.setState({
				loggedIn: true,
			})
		})
		.catch((error)=>{
			this.setState({
				logError: error.message
			})
		})
	}

	register(email,password){
		auth.createUserWithEmailAndPassword(email,password)
		.then( (response) => {
			auth.signInWithEmailAndPassword(email,password)
			.then((resp) => {
				this.setState({
					loggedIn:true
				})
			})
			.catch((error) => {
				this.setState({
					logError: error.message
				})
			})
		})
		.catch((error) => {
			this.setState({
				regError: error.message
			})
		})
	}

	render(){
		return(
			<NavigationContainer>
				<Stack.Navigator>
				{
					this.state.loggedIn != false ? 
					<Stack.Group>
						<Stack.Screen
						name= "Menu"
						component= {TabMenu}
						options={{headerShown:false}}
						initialParams = {{ logout: ()=> this.logout()}}
						/>
					</Stack.Group>
					:
					<Stack.Group>
						<Stack.Screen
						name = "Login"
						// component = {Login}
						options= {{headerShown: false}}
						initialParams = {{login: (email,password)=> this.logIn(email,password)}}
						children= { (props) => <Login error= {this.state.logError} {...props} /> }
						/>
						<Stack.Screen
						name= "Register"
						// component = {Register}
						options = {{headerShown: false}}
						initialParams = {{register: (email,password)=> this.register(email, password)}}
						children={ (props) => <Register error= {this.state.regError} {...props} /> }
						/>
					</Stack.Group>
				}
				</Stack.Navigator>
			</NavigationContainer>
		);

	}
}

export default MainNav;