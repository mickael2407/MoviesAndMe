// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { connect } from 'react-redux';
import FilmList from './FilmList';
class Favorites extends React.Component {

    constructor(props) {
        super(props);
        // console.log(props.favoritesFilms);
    }
    render() {
        return (
            <FilmList
            navigation={this.props.navigation}
            films={this.props.favoritesFilms}
            favoriteList={true}
        />
        )
    }
}

const styles = StyleSheet.create({
})

const mapStateToProps = (state) => {
    return {
      favoritesFilms: state.favoritesFilms
    };
}
export default connect(mapStateToProps)(Favorites);