import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';

class Post extends Component{
    constructor(props){
        super(props)
        this.state={
           
        }
    }

   

  

   


    render(){
        return(
                <View >
                    <Text> Posteos </Text>
                                    
                </View>
        )
    }

}

export default Post;