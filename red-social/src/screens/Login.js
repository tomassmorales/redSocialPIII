import React, {Component} from "react"
import {Text, TouchableOpacity, View, StyleSheet, TextInput} from 'react-native';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: "",
			password: ""
		}
	}
	render(){
		return (
			<View style={styles.container}>
				<View style={styles.formContainer}>
				<Text style={styles.logo}>LOGO</Text>
		                {this.props.error != "" ? <Text style= {styles.error}>{this.props.error}</Text>: <Text>LogIn</Text> }
				<TextInput style={styles.field}
				keyboardType= "email-adress"
				placeholder= "Tu Email"
				onChangeText = {text => this.setState({email:text})}
				/>
				<TextInput style={styles.field}
				keyboardType= "default"
				placeholder= "Contraseña"
				secureTextEntry = {true}
				onChangeText = {text => this.setState({password:text})}
				/>
				<TouchableOpacity style={styles.boton} onPress = { ()=> this.props.route.params.login(this.state.email, this.state.password) }>
					<Text style={styles.botonText} >LogIn</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.botonDos} onPress={ ()=> this.props.navigation.navigate("Register") }>
					<Text>No tengo cuenta</Text>
				</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create(
	{
		container: {
			paddingHorizontal: 10,
			marginTop: 20,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100%",
			width: "100%"
		},
		formContainer: {
			width: "100%"
		},
		logo:{
			textAlign: "center",
			fontSize: 50
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
			backgroundColor: "#D632C9",
			paddingHorizontal: 10,
			paddingVertical: 6,
			textAlign: "center",
			borderRadius: 4,
			borderWidth: 1,
			borderStyle: "solid",
			borderColor: "#D632C9"
		},
		botonDos: {
			backgroundColor: "#CCCCCC",
			paddingHorizontal: 10,
			paddingVertical: 6,
			textAlign: "center",
			borderRadius: 4,
			borderWidth: 1,
			borderStyle: "solid",
			borderColor: "#CCCCCC",
			marginTop: 5
		},
		botonText: {
			color: "#fff"
		},
		error: {
			color: "red"
		}
	}
)

export default Login;


