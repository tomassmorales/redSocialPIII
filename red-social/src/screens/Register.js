import React, {Component} from "react"
import {Text, View, TouchableOpacity, StyleSheet, Image, ActivityIndicator, FlatList, TextInput } from 'react-native';

class Register extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: "",
			user: "",
			password: ""
		}
	}
	render(){
		return (
			<View style= {styles.container}>
			<Text>Register</Text>
			<TextInput style= {styles.field}
			keyboardType= "email-address"
			placeholder= "Email"
			onChangeText = { (text) => this.setState({email: text})}
			/>
			<TextInput style= {styles.field}
			keyboardType= "default"
			placeholder= "Nombre de usuario"
			onChangeText = { (text) => this.setState({user: text})}
			/>
			<TextInput style= {styles.field}
			keyboardType= "default"
			placeholder= "Contraseña"
			secureTextEntry= {true}
			onChangeText = { (text) => this.setState({password: text})}
			/>
			<TouchableOpacity style= {styles.boton} onPress = { () => this.props.route.params.register(this.state.email,this.state.password) }>
				<Text style= {styles.botonText} >Registrarme e Iniciar Sesión</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress = { ()=> this.props.navigation.navigate("Login")}>
			     <Text>Iniciar Sesión</Text>
		        </TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create(
	{
		container: {
			paddingHorizontal: 10,
			marginTop: 20
		},
		field: {
			height: 20,
			paddingVertical: 15,
			paddingHorizontal: 10,
			borderWidth: 1,
			borderColor: "#ccc",
			borderStyle: "solid",
			borderRadius: 6,
			marginVertical: 10,
			// width: "80%"
		},
		boton: {
			backgroundColor: "#28a745",
			paddingHorizontal: 10,
			paddingVertical: 6,
			textAlign: "center",
			borderRadius: 4,
			borderWidth: 1,
			borderStyle: "solid",
			borderColor: "#28a745"
		},
		botonText: {
			color: "#fff"
		},
		error: {
			color: "red"
		}
	}
)

export default Register;