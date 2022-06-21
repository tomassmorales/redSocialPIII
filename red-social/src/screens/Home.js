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
        db.collection('posts').orderBy("createdAt", "desc").onSnapshot(
            docs => {
                let posts = []; //creamos array
                docs.forEach( oneDoc => {
                    posts.push({ //le colocamos al array una nueva estructura de obj.lit
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
                        data={this.state.posts} //array a recorrer
                        keyExtractor={post => post.id.toString()} //clave unica
                        renderItem = { ({item}) => <Post dataPost={item} navegacion= {this.props.navigation}/>} //le pasamos las props de navegacion al componente posteo
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

