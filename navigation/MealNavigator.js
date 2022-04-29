import React from "react";
import { Platform } from "react-native";
import { createStackNavigator} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors'


const defaultStackNavOptions = {
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Colors.primaryColor
        },
        headerTitleStyle:{
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle:{
            fontFamily: 'open-sans'
        },
        headerTintColor: 'white'
    }

}

const MealsNavigator = createStackNavigator({
    //property name "pointer" and comp
    Categories : CategoriesScreen, //de shortcut
    CategoryMeals: {
        screen: CategoryMealsScreen,
        
    },
    MealDetail: MealDetailScreen

}, {
    //mode:'modal',
    defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen

},{
    defaultNavigationOptions:defaultStackNavOptions
});

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions:{
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size = {25} color={tabInfo.tintColor}/>
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel:'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions:{ 
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size = {25} color={tabInfo.tintColor}/>
            },
            tabBarColor: Colors.accentColor
        }
    }
}




const MealsFavTabNavigator =
    Platform.OS=== 'android'? createMaterialBottomTabNavigator(tabScreenConfig,{
        activeTintColor:'white',
        shifting: true
    })
    :createBottomTabNavigator({
        tabScreenConfig,
        tabBarOptions:
        {
            labelStyle: {
                fontFamily: 'open-sans'
            }
        }
},{
    tabBarOptions:{
        activeTintColor: Colors.accentColor
    }
});

const FiltersNavigator =createStackNavigator({
    Filters: FiltersScreen
},{
    // navigationOptions: {
    //     drawerLabel: 'the filters'
    // },
    defaultNavigationOptions:defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator(
    {
        MealsFavs:{
            screen:MealsFavTabNavigator,
            navigationOptions:{
                drawerLabel: 'Menu',
                
            }
            
        } ,
        Filters: FiltersNavigator
    },{
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold',
                padding:25
            }
        }
    }
);

export default createAppContainer(MainNavigator);
