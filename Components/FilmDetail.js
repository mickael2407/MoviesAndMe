import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView, Button, TouchableOpacity } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../api/TMDB_API';
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux';

class FilmDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: true
    };
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

  componentDidMount() {
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
    });
  }

  toggleFavorite() {
    const action = {type: 'TOGGLE_FAVORITE', value: this.state.film };
    this.props.dispatch(action);
  }

  componentDidUpdate() {
    console.log(this.props.favoritesFilms);
  }

  displayFavoriteImage() {
    let sourceImage = require('../assets/ic_favorite_border.png');
    if (this.props.favoritesFilms.findIndex(_elt => _elt.id === this.state.film.id) !== -1) {
      sourceImage = require('../assets/ic_favorite.png');
    }
    return (
      <Image
        source={sourceImage}
        style={styles.favorite_image}
      />
    )
  }

  displayFilm() {
    const film = this.state.film;
    if (film != undefined) {
      console.log(film.backdrop_path);
      return (
        <ScrollView style={styles.scrollView_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.backdrop_path) }}
          />
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity style={styles.favorite_container} onPress={() => this.toggleFavorite()}>
            {this.displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre: { film.genres.map(_elt => _elt.name).join(' / ') }</Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(_elt =>{
              return _elt.name;
            }).join(" / ")}
          </Text>

        </ScrollView>
      )
    }
  }

  render() {
    return (
    <View style={styles.main_container}>
      {this.displayFilm()}
      {this.diaplayLoading()}
    </View>
    )
  }
}


const styles = StyleSheet.create({
  main_container: {
      flex: 1
  },
  scrollView_container: {
    flex: 1
  },
  load_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  description_text: {
    textAlign: 'justify',
    padding: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  favorite_container: {
    alignItems: 'center'
  },
  favorite_image: {
    width: 40,
    height: 40
  }
})
const mapStateToProps = (state) => {
  return {
    favoritesFilms: state.favoritesFilms
  };
}
export default connect(mapStateToProps)(FilmDetail);