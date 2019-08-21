import React,{Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";

export default class SearchBar extends Component{

    constructor(props){
        super(props);
        this.state={
            searchTerm:''
        }
    }

    onChange=(val)=>{
        this.setState({searchTerm:val})
    }

    searchPressed=()=>{
        this.props.onSearchPress(this.state.searchTerm);
        this.setState({searchTerm:''});
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput
                value={this.state.searchTerm} 
                onChangeText={(val)=>this.onChange(val)} 
                placeholder="Search for cats"
                style={styles.textInput}
                placeholderStyle={{marginLeft:10}}
                onSubmitEditing={()=>this.searchPressed()}
                />
                <TouchableOpacity onPress={()=>{this.searchPressed()}} style={styles.searchButtonContainer}>
                    <Text style={styles.searchText}> Search</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ff4d4d',
        padding:8,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    textInput:{
        backgroundColor:'white',
        width:'80%',
        height:40,
        borderTopLeftRadius:3,
        borderBottomLeftRadius:3,
        fontSize:15
    },
    searchButtonContainer:{
        width:'20%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:'#ffe6e6'
    },
    searchText:{
        fontSize:18,
        color:'black',
        paddingHorizontal:5
    }
})