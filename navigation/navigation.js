import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Search } from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';
import Test from '../Components/Test';

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
});


const MoviesTabNavigator = createBottomTabNavigator({
/*     Test: {
        screen: Test
      }, */
    Search: {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                    source={require('../assets/ic_search.png')}
                    style={styles.icon} />
            }
        }
    },
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: 'Favorites',
            tabBarIcon: () => {
                return <Image
                    source={require('../assets/ic_favorite.png')}
                    style={styles.icon} />
            }
        }
    }
},
    {
        tabBarOptions: {
            showLabel: false,
            showIcon: true,
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF'
        }
    });

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})
export default createAppContainer(MoviesTabNavigator);