import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView, Button, TouchableOpacity, Share } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../api/TMDB_API';
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux';
import { Platform } from '@unimodules/core';

class FilmDetail extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
    if (params.film != undefined && Platform.OS === 'ios') {
      return {
        // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
        headerRight: <TouchableOpacity
          style={styles.share_touchable_headerrightbutton}
          onPress={() => params.shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../assets/ic_share.png')} />
        </TouchableOpacity>
      }
    }
  }

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
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  componentDidMount() {
    const indexFilm = this.props.favoritesFilms.findIndex(_films => _films.id === this.props.navigation.state.params.idFilm);
    if (indexFilm !== -1) {
      this.setState({
        film: this.props.favoritesFilms[indexFilm],
      }, () => {
        this.updateNavgationParams();
      })
    } else {
      this.setState({ isLoading: true });
      getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
        this.setState({
          film: data,
          isLoading: false
        }, () => {
          this.updateNavgationParams();
        })
      });
    }

  }

  toggleFavorite() {
    const action = { type: 'TOGGLE_FAVORITE', value: this.state.film };
    this.props.dispatch(action);
  }

  updateNavgationParams() {
    this.props.navigation.setParams({
      shareFilm: this.shareFilm,
      film: this.state.film
    });
  }
  displayFloatingActionButton() {
    const films = this.state.film;
    if (films !== undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this.shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../assets/ic_share.png')} />
        </TouchableOpacity>
      )
    }
  }

  shareFilm = () => {
    const film = this.state.film;
    Share.share({ title: film.title, message: film.overview });
  }
  componentDidUpdate() {
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
            source={{ uri: getImageFromApi(film.backdrop_path) }}
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
          <Text style={styles.default_text}>Genre: {film.genres.map(_elt => _elt.name).join(' / ')}</Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(_elt => {
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
        {this.displayFloatingActionButton()}
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
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 30,
    height: 30
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
  default_text: {
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