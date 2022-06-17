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
                <View style={styles.separator}>
                    <Text>Post de: {this.props.dataPost.data.owner}</Text>
                    <Text>Texto del Post: {this.props.dataPost.data.description}</Text>
                </View>
        )
    }

}

const styles = StyleSheet.create({
    separator:{
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingHorizontal:20
    },
    
})

export default Post;