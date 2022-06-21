import React, {Component} from "react"
import {Text, 
		TouchableOpacity,
		View, 
		FlatList, 
		StyleSheet, 
	} from 'react-native';
import {auth, db} from "../firebase/config" 
import Post from './Post'


class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			email:'',
			password:'',
			posts: [],
			user:{},
			loading: true,
		}
	}

componentDidMount(){ 
	db.collection('posts').where("owner", "==", auth.currentUser.email).onSnapshot(
		docs => { 
			let posts = []; 
			docs.forEach( oneDoc => {
				posts.push({
					id: oneDoc.id, 
					data: oneDoc.data()
				})
			})

			this.setState({
				posts: posts
		})
		}
	)
	db.collection("users").where("email", "==", auth.currentUser.email).onSnapshot(
		docs=>{ 
			let user = []; 
			docs.forEach( oneDoc => {
				user.push({
					id: oneDoc.id, 
					data: oneDoc.data()
				})
			})
			this.setState({
				user: user[0], 
				loading: false
			})
		}
	)
}


	render(){
		console.log(this.state.user)
		return (
			<View style={styles.styleProfile}>
				<Text> Hola /nombre de usuario/</Text>
				<Text> {auth.currentUser.email}</Text>
		        <Text>Since: {auth.currentUser.metadata.creationTime}</Text>
				<Text>Último acceso: {auth.currentUser.metadata.lastSignInTime}</Text>
				<Text>Cantidad de posteos: {this.state.posts.length}</Text>
				<TouchableOpacity onPress= {()=> this.props.route.params.logout()}>
					<Text>LogOut</Text>
				</TouchableOpacity> 
				<View style={styles.styleProfile}>
				<FlatList 
					data={this.state.posts}
					keyExtractor={post => post.id.toString()}
					renderItem = { ({item})  => <Post dataPost={item} 
					{...this.props} />}
				
				/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    styleProfile:{
        flex: 1
    }
})

export default Profile;

