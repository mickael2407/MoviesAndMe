import React from 'react';
import {StyleSheet , ActivityIndicator, View, Button, TextInput, FlatList, Text } from 'react-native';
import { YellowBox } from 'react-native';
import FilmItem from './FilmItems';
YellowBox.ignoreWarnings(['Remote debugger']);
import { getFilmFromApi } from '../api/TMDB_API';
import FilmList from './FilmList';


export class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            films: [],
            isLoading: false
        };

        this.searchedText = '';
        this.page = 0;
        this.totalPage = 0;

        this.loadFilms = this.loadFilms.bind(this);
    }

    setSearchedText(text) {
        this.searchedText = text;
    }

    searchFilms() {
        this.page = 0;
        this.totalPage = 0;
        this.setState({
            films: []
        }, () => {
            console.log(this.page + '/' + this.totalPage + '/' + this.state.films.length);
            this.loadFilms();
        });

    }

    diaplayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.load_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }
    displayDetailForFilm = (idFilm) => {
        console.log('NAV');
        this.props.navigation.navigate("FilmDetail", {idFilm: idFilm});
    }
    loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({isLoading: true});
            getFilmFromApi(this.searchedText, this.page + 1).then(data =>{
                this.page = data.page;
                this.totalPage = data.total_pages;
                this.setState({ 
                    films: this.state.films.concat(data.results),
                    isLoading: false
                });
                this
            });
        }
    }
    render() {
        console.log('RENDERS');
        console.log(this.state.isLoading);
        return ( //jsx
             <View style={ styles.main_container }>
                 <TextInput onChangeText={(text) => this.setSearchedText(text)} onSubmitEditing={() =>this.searchFilms()} style={ styles.textinputs } placeholder="Titre du film"/>
                 <Button style={{ height: 50 }} title="Rechercher" onPress={() => this.searchFilms()}/>
                 <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this.loadFilms}
                    page={this.page}
                    totalPage={this.totalPage}
                 />
                 {this.diaplayLoading()}
             </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    textinputs: {
        marginLeft: 5, 
        marginRight: 5, 
        height: 50, 
        borderColor: '#000000', 
        borderWidth: 1, 
        paddingLeft: 5
    },
    load_container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default Search