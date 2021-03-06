import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity, 
         StyleSheet, 
         ActivityIndicator,
         FlatList, 
         Image } from 'react-native';
import Post from './Post';

class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[],
            email:'',
            whoIs:'',
            cantidadDeResultados: 'hace tu busqueda'
        }
    }
    
    search(email){ 
        db.collection('posts').where('owner', '==', email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts,
                    email:'',
                    whoIs: email,
                    cantidadDeResultados: posts.length
                })
            }
        )
    }

    render(){
        return(
                <View styles ={styles.lista}>
                    <Text>Busqueda de posteo: {this.state.whoIs}</Text>
                    <View style={styles.form}>
                        <TextInput 
                            style={styles.field}
                            keyboardType='default'
                            placeholder='posteo a buscar...'
                            value={this.state.email}
                            onChangeText={text => this.setState({ email: text})} //guardo lo que escribe en el estado
                        />  
                        <TouchableOpacity
                            style={styles.button} 
                            onPress={()=>this.search(this.state.email)}
                            disabled= {this.state.email == '' ? true : false }
                            
                        >
                        <Text style={ styles.buttonText}>Buscar</Text>
                        </TouchableOpacity> 
                        <ActivityIndicator size='large' color="red" animating={false}> </ActivityIndicator>                        
                    </View>
                    {this.state.cantidadDeResultados == 0 ?
                    <Text> Aun no hay posteos de "{this.state.whoIs}" </Text>
                    :
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={users => users.id}
                        renderItem = { ({item}) => <Post dataPost={item} navegacion={this.props.navigation} />}
                    />
                    }
                    
                </View>

        )
    }
}

const styles = StyleSheet.create({
    lista:{
        flex:1

    },
    container:{
        flex:1,
        padding:10
    },
    form:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal:20,
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding:3,
        marginBottom:8,
        width:'70%',
        marginBottom: 0,
        lineHeight:40,
    },
    button: {
        borderRadius: 2,
        padding:3,
        backgroundColor: 'green',
        width:'29%',
        textAlign: 'center',
    },
    buttonText:{
        color: '#fff'
    }
})

export default Search;