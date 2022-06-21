import React, {Component} from "react"
import {Text, View, TouchableOpacity, StyleSheet, Image, ActivityIndicator, FlatList, TextInput } from 'react-native';

class Register extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: "",
			username: "",
			password: ""
		}
	}
	render(){
		return (
			<View style= {styles.container}>
			<View style= {styles.formContainer}>
			<Text style={styles.logo}>LOGO</Text>
			{this.props.error != "" ? <Text style= {styles.error}>{this.props.error}</Text>: <Text>Registro</Text> }
			<TextInput style= {styles.field}
			keyboardType= "email-address"
			placeholder= "Email"
			onChangeText = { (text) => this.setState({email: text})}
			/>
			<TextInput style= {styles.field}
			keyboardType= "default"
			placeholder= "Nombre de usuario"
			onChangeText = { (text) => this.setState({username: text})}
			/>
			<TextInput style= {styles.field}
			keyboardType= "default"
			placeholder= "Contraseña"
			secureTextEntry= {true}
			onChangeText = { (text) => this.setState({password: text})}
			/>
			<TouchableOpacity style= {styles.boton} onPress = { () => this.props.route.params.register(this.state.email,this.state.password, this.state.username) }>
				<Text style= {styles.botonText} >Registrarme e Iniciar Sesión</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.botonDos} onPress = { ()=> this.props.navigation.navigate("Login")}>
			     <Text>Iniciar Sesión</Text>
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
		logo:{
			textAlign: "center",
			fontSize: 50
		},
		formContainer: {
			width: "100%"
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

export default Register;