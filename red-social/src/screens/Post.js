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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

class Post extends Component{
    constructor(props){
        super(props)
        this.state={
            cantidadDeLikes:this.props.dataPost.data.likes.length,
            myLike:false,
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
        db.collection('posts') //nombre de la coleccion a modificar
            .doc(this.props.dataPost.id) //id del documento a modificar
            .update({ //metodo asinc. que actualiza le pasamos un obj.lit
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) //propiedad a actualizar
            })
            .then(()=> this.setState({ //lo que se ejecuta dsp.
                cantidadDeLikes:this.state.cantidadDeLikes + 1, 
                myLike: true,
            }))
            .catch(error => console.log(error))

    }
    unLike(){
        //Agregar el email del user logueado en el array
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

    render(){
        return(
                <View style={styles.separator}>
                    <Text>Post de: {this.props.dataPost.data.owner}</Text>
                    <Image style={styles.image} source={{uri:this.props.dataPost.data.url}} resizeMode='contain'/>
                    <Text>Texto del Post: {this.props.dataPost.data.description}</Text>
                    <Text>Cantidad de likes: {this.state.cantidadDeLikes}</Text>
                    {
                        this.state.myLike ? //si myLike es true
                        <TouchableOpacity onPress={()=> this.unLike()}>
                            <Text>Quitar Like</Text>
                        </TouchableOpacity> : //si myLike es false
                        <TouchableOpacity onPress={()=> this.like()}>
                            <Text>Like</Text>
                        </TouchableOpacity>                
                    }
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
        flex: 1
    }, 
    image:{ 
        width:100, 
        height:100
    }
    
})

export default Post;