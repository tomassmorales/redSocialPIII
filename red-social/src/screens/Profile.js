import React, {Component} from "react"
import {Text, TouchableOpacity,View} from 'react-native';
import {auth} from "../firebase/config" 

class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			email:'',
			password:''
		}
	}
	render(){
		return (
			<View>
				<Text>{auth.currentUser.email}</Text>
		                <Text>Since: {auth.currentUser.metadata.creationTime}</Text>
				<Text>Último acceso: {auth.currentUser.metadata.lastSignInTime}</Text>
				<TouchableOpacity onPress= {()=> this.props.route.params.logout()}>
					<Text>LogOut</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Profile;

