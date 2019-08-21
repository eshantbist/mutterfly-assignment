import React from "react";
import {
    Platform,
    Dimensions,
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Modal,
    ActivityIndicator
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MasonryList from "react-native-masonry-list";
import SearchBar from './SearchBar'

export default class ImageList extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null
        } 
    }

    state = {
        columns: 2,
        images:[],
        modalView:false,
        currentImagedata:null,
        loading:false,
    }

    onSearchPress=async(val)=>{
      try{
        this.setState({image:[]})
        this.setState({loading:true})
        const client_id = '7b7ed088d764a6e87ae4bf23279fdfbc69fb53092da81bad98f167d69ba22fa7';
        const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${client_id}&query=${val}&per_page=20`);
        const json = await response.json();
        this.setState({images:[]})
        json.results.map(item=>{
          this.setState(prevState => ({
            images: [...prevState.images, {uri:item.urls.thumb,id:item.id,user:item.user}]
          }))
        })
        this.setState({loading:false})
      }
      catch(err){
        alert(err)
        this.setState({loading:false})
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

    longPressed=(item)=>{
        this.setState({currentImagedata:item})
        this.setState({modalView:true});
    }

    imagePressed=(item)=>{
        this.props.navigation.navigate('ImageItem',{
            user: item.user
        });
    }

    renderLoading=()=>{
        if(this.state.loading==true){
            return(
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator size="large" color="#ff4d4d" />
                </View>
            )
        }
        return(
            <View style={styles.activityIndicatorContainer}>
                <Text style={{fontSize:25,color:"gray"}}>No Images to show</Text>
            </View>
        )
    }

    render() {
        if(this.state.images.length==0){
            return(
                <View
                    onLayout={(ev) => this.onLayoutChange(ev)}
                    style={styles.container}
                >
                    <SearchBar onSearchPress={(val)=>this.onSearchPress(val)} />
                    {this.renderLoading()}
                </View>
            )
        }
        return (
            <View
                onLayout={(ev) => this.onLayoutChange(ev)}
                style={styles.container}
            >
                <SearchBar onSearchPress={(val)=>this.onSearchPress(val)} />
                <MasonryList
                    images={this.state.images}
                    columns={this.state.columns}
                    onLongPressImage={(item)=>this.longPressed(item)}
                    onPressImage={(item)=>this.imagePressed(item)}
                    renderIndividualHeader={(data) => {
                        return (
                            
                                <View style={[styles.masonryHeader, {
                                    width: data.masonryDimensions.width,
                                    margin: data.masonryDimensions.gutter / 2
                                }]}>
                                    <Image
                                        source={{ uri: data.user.profile_image.small }}
                                        style={styles.userPic} />
                                    <Text style={styles.userName}>{data.user.name}</Text>
                                </View>
                        );
                    }}
                />
                <Modal
                    transparent={true}
                    visible={this.state.modalView}
                    onRequestClose={() => {this.setState({modalView:false})}}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={{height:'100%',width:'100%'}}
                            activeOpacity={1}
                            onPressOut={() => {this.setState({modalView:false})}}
                        >   
                                {this.state.currentImagedata!=null && 
                                <View style={styles.modalBox}>
                                    <Image 
                                        source={{ uri: this.state.currentImagedata.user.profile_image.large }}
                                        style={styles.modalImage} 
                                    />
                                    <View style={{justifyContent:'space-between'}}>
                                        <Text style={styles.modalUserName}>{this.state.currentImagedata.user.name}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <FontAwesome name='heart' size={25} color="#FFF"/>
                                            <Text style={styles.likes}> 454</Text>
                                        </View>
                                    </View>
                                </View>}
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#368FFA"
    },
    masonryHeader: {
        position: "absolute",
        zIndex: 10,
        flexDirection: "row",
        padding: 5,
        alignItems: "center",
        backgroundColor: "rgba(150,150,150,0.4)"
    },
    userPic: {
        height: 20,
        width: 20,
        borderRadius: 10,
        marginRight: 10
    },
    userName: {
        fontSize: 15,
        color: "#fafafa",
        fontWeight: "bold"
    },
    modalContainer:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    modalBox:{
        flex:1,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:'20%'
    },
    modalImage:{
        height:100,
        width:100,
        borderRadius:50
    },
    modalUserName:{
        color:'white',
        fontWeight:'700',
        fontSize:20
    },
    likes:{
        color:'white',
        fontWeight:'700',
        fontSize:20
    },
    activityIndicatorContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    }
});