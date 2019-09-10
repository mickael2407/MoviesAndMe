// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux';
import FilmList from './FilmList';
class Favorites extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <View>
                <FilmList
                    navigation={this.props.navigation}
                    loadFilms={this.loadFilms}
                    films={this.props.favoritesFilms}
                    totalPage={this.props.favoritesFilms.length}
                />
            </View>
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