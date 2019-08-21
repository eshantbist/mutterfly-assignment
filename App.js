import React,{Component} from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ImageList from './src/components/ImageList'
import ImageItem from './src/components/ImageItem'

const AppNavigator = createStackNavigator({
  Home: {
    screen: ImageList,
  },
  ImageItem: {
    screen: ImageItem,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.user.name}'s Photos`,
    }),
  }
});

const AppStackNavigator =  createAppContainer(AppNavigator);

export default class App extends Component{
  render(){
    return(
      <AppStackNavigator/>
    )
  }
}