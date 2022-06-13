
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {auth, db} from '../firebase/config';

class NewPost extends Component{
    constructor(props){
        super(props)
        this.state={
            description:'',
            showCamera: true,
            url:''
        }
    }

    guardarPost(){
         db.collection('posts').add({
                createdAt: Date.now(),
                owner: auth.currentUser.email,
                description: this.state.description,
                url: this.state.url
            })
            .then( response => this.setState({
                description:'',
            },
            ()=>this.props.navigation.navigate('Home')))
            .catch(error => console.log(error) )
    }

    onImageUpload(url){
        this.setState({
            url: url,
            showCamera: false,
        })
    }


    render(){
        return(
            <View style={styles.container}>
            {
                this.state.showCamera ?
                    <MyCamera onImageUpload={url => this.onImageUpload(url)}/> 
                :
                <View style={styles.container}>
                    <Text style={styles.title}>Nuevo Post</Text>
                    <TextInput 
                        style={styles.field}
                        keyboardType='default'
                        placeholder='description'
                        onChangeText={text => this.setState({ description: text})}
                        multiline
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>this.guardarPost()}>
                        <Text >Guardar Post</Text>
                    </TouchableOpacity>               
                </View>

            }
            </View>
        )
    }

}




export default NewPost;