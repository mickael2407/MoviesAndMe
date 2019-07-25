
const API_TOKEN = 'ef7f822b7746f66e5f485e5190b9b4d3';

export function getFilmFromApi(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page =' + page;
    return fetch(url).then((response) => {
        return response.json();
    }).catch((error) => {
        console.log(error);
    })
}

export function getImageFromApi(name) {
    return 'https://image.tmdb.org/t/p/w300' + name; 
}

export function getFilmDetailFromApi(id) {
    const url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key='+API_TOKEN+'&language=fr-FR';
    return fetch(url).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err.message);
    })
}