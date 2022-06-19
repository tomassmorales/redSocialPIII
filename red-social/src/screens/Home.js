import React, {Component} from "react"
import {db, auth} from '../firebase/config'
import {View,
		Text, 
		TouchableOpacity, 
		StyleSheet,  
		FlatList, 
		ActivityIndicator

} from 'react-native'; 

import Post from "./Post";


class Home extends Component {
	constructor(props){
		super(props);
		this.state = { 
			posts: []
		}
	}

	componentDidMount(){
        db.collection('posts').onSnapshot(
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

        
    }

	render(){
		console.log(this.props);

		return ( 
			<View style={styles.styleHome}> 
			<Text> Listado de Posteos </Text> 
			<FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id.toString()}
                        renderItem = { ({item}) => <Post dataPost={item} navegacion= {this.props.navigation}/>}
                        /> 
			</View>
		);
	}
}

const styles = StyleSheet.create({
    styleHome:{
        flex: 1
    }
})

export default Home; 

