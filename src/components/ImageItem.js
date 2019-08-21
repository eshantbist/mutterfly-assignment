import React,{Component} from "react";
import {
    Platform,
    Dimensions,
    StyleSheet,
    View,
    ActivityIndicator
} from "react-native";

import MasonryList from "react-native-masonry-list";

export default class ImageItem extends Component{
    
    constructor(props){
       super(props);
       this.state={
            searchTerm:'',
            columns: 2,
            images:[]
        }
    }

    componentDidMount=async()=>{
        const { navigation } = this.props;
        const user = navigation.getParam('user', 'NO-ID');
        try{
        const client_id = '7b7ed088d764a6e87ae4bf23279fdfbc69fb53092da81bad98f167d69ba22fa7';
        const response = await fetch(`https://api.unsplash.com/users/${user.username}/photos/?client_id=${client_id}&query=${this.state.searchTerm}&per_page=20`);
        const json = await response.json();
        console.log(json);
        json.map(item=>{
            this.setState(prevState => ({
            images: [...prevState.images, {uri:item.urls.thumb,id:item.id,title: "www.luehangs.site",user:item.user}]
            }))
        })
        }
        catch(err){
        console.log(err);
        alert("some error occured")
        }
    }

    onLayoutChange = (ev) => {
        const { width, height } = ev.nativeEvent.layout;
        let maxComp = Math.max(width, height);

        if (width >= maxComp) {
            this.setState({
                columns: 3,
            });
        } else if (width < maxComp) {
            this.setState({
                columns: 2,
            });
        }
    }

    render(){
        if(this.state.images.length==0){
            return(
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator size="large" color="#ff4d4d" />
                </View>
            )
        }
        return(
            <View
                onLayout={(ev) => this.onLayoutChange(ev)}
                style={styles.container}
            >
                <MasonryList
                    images={this.state.images}
                    columns={this.state.columns}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#368FFA"
    },
    activityIndicatorContainer: {
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    }
});