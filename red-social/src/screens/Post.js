import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet, 
    FlatList,
    Image
} from 'react-native';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';
import Comments from './Comments';
import { EvilIcons } from '@expo/vector-icons';  
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

class Post extends Component{
    constructor(props){
        super(props)
        this.state={
            cantidadDeLikes: this.props.dataPost.data.likes.length,
            myLike:false, //de base pensamos que no likeo aun
            cantidadDeComentarios: this.props.dataPost.data.comments.length
        }
    }

    componentDidMount(){ //chequeamos si el mail esta dentro del array
        if(this.props.dataPost.data.likes.includes(auth.currentUser.email)){
            this.setState({
                myLike: true,
            })
        }
    }

    like(){
        db.collection('posts') 
            .doc(this.props.dataPost.id) //id del documento a modificar
            .update({ 
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) //o.l
            })
            .then(()=> this.setState({ //lo que se ejecuta dsp.
                cantidadDeLikes:this.state.cantidadDeLikes + 1, 
                myLike: true,
            }))
            .catch(error => console.log(error))

    }
    unLike(){
        //sacar el email del user logueado en el array
        db.collection('posts')
            .doc(this.props.dataPost.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(()=> this.setState({
                cantidadDeLikes:this.state.cantidadDeLikes - 1, 
                myLike: false
            }))
            .catch(error => console.log(error))
    }

    borrarPost(id){
        db.collection("posts").doc(id).delete()
    }

    render(){
        return(
                <View style={styles.separator}>
                    <Text style={styles.text}>{this.props.dataPost.data.owner}</Text>
                    {this.props.dataPost.data.owner == auth.currentUser.email ? <TouchableOpacity onPress = {(id)=> this.borrarPost(this.props.dataPost.id)}></TouchableOpacity> : <Text></Text>}
                    <Image style={styles.image} source={{uri:this.props.dataPost.data.url}} resizeMode='contain'/>
                    <Text style={styles.text}> {this.props.dataPost.data.description}</Text>
                    <Text> <EvilIcons name="heart" size={20} color="red"> </EvilIcons>{this.state.cantidadDeLikes}</Text>
                    {
                        this.state.myLike ? //si myLike es true
                        <TouchableOpacity onPress={()=> this.unLike()}>
                            <Text>Quitar Like</Text>
                        </TouchableOpacity> : //si myLike es false
                        <TouchableOpacity onPress={()=> this.like()}>
                            <Text>Like</Text>
                        </TouchableOpacity>                
                    }
                    <Text>Cantidad de comentarios: {this.state.cantidadDeComentarios}</Text>
                    <TouchableOpacity onPress={ () => this.props.navegacion.navigate('Comments', { id: this.props.dataPost.id})} > 
                        <Text>Ver comentarios</Text>
                    </TouchableOpacity>
                </View>
        )
    }

}

const styles = StyleSheet.create({
    separator:{
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingHorizontal:20, 
        flex: 1,
        alignItems: 'center',
        
    }, 
    image:{ 
        width:260, 
        height:260, 
    }, 
    text:{ 
        fontWeight: 'bold'
    }
    
})

export default Post;