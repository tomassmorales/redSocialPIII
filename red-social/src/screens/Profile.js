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
			username:"",
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
	db.collection("users").where("userEmail", "==", auth.currentUser.email).onSnapshot(
		docs=>{ 
			let user = []; 
			docs.forEach( oneDoc => {
				user.push({
					id: oneDoc.id, 
					data: oneDoc.data()
				})
			})
			console.log(user);
			this.setState({
				username: user[0].data.username, 
				loading: false
			})
		}
	)
}


	render(){
		return (
			<View style={styles.styleProfile}>
				<Text> Hola {this.state.username}</Text>
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

