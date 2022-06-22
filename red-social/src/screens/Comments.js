import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';


class Comments extends Component{
    constructor(props){
        super(props)
        this.state={
            comments:[],
            cantidadDeComentarios: 0,
            commentText:''
        }
    }

    componentDidMount(){
        db.collection('posts')
        .doc(this.props.route.params.id) //usamos el id que recibimos por parámetro.
        .onSnapshot( doc => { //callback para actualizar el estado
                this.setState({
                    comments:doc.data().comments,
                    cantidadDeComentarios: doc.data().comments.length
                })
            }
        )
    }

    agregarComentarios(){
        db.collection('posts')
        .doc(this.props.route.params.id) //Cual es el posteo en donde voy a poner un nuevo comentario.
        .update({ //actualizamos la colleción.
            comments:firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                text:this.state.commentText,
                createdAt: Date.now()
            })
        })
        .then( () => {
            this.setState({
                commentText: '', 
            })
        })
    }

    render(){
        // console.log(this.props);
        return(
                <View>
                    <Text> Comentarios</Text>
                    {this.state.cantidadDeComentarios == 0 ?
                        <Text>No hay comentarios aun</Text>
                    : 
                        <Text> Total de comentarios: {this.state.cantidadDeComentarios} </Text>
                    }

                    <FlatList 
                        data={this.state.comments} //array con info
                        keyExtractor={ comentario => comentario.createdAt}
                        renderItem = { ({item}) => <Text> {item.owner} ha comentado:      {item.text}</Text> }
                    />
                    
                    <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Agregar un comentario'
                    onChangeText={text => this.setState({ commentText: text})}
                    value={this.state.commentText}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>this.agregarComentarios()}>
                        <Text style={ styles.buttonText}>Comentar</Text>
                    </TouchableOpacity>   
                </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginTop: 10
    },
    title:{
        marginBottom:20
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding:3,
        marginBottom:8

    },
    button: {
        borderRadius: 2,
        padding:3,
        backgroundColor: 'green',
    },
    buttonText:{
        color: '#fff'
    }
})

export default Comments;