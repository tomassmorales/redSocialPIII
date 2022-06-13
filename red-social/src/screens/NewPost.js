
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
            <View >
            {
                this.state.showCamera ?
                    <MyCamera onImageUpload={url => this.onImageUpload(url)}/> 
                :
                <View >
                    <Text >Nuevo Post</Text>
                    <TextInput 
                       
                        keyboardType='default'
                        placeholder='description'
                        onChangeText={text => this.setState({ description: text})}
                        multiline
                    />
                    <TouchableOpacity  onPress={()=>this.guardarPost()}>
                        <Text >Guardar Post</Text>
                    </TouchableOpacity>               
                </View>

            }
            </View>
        )
    }

}




export default NewPost;