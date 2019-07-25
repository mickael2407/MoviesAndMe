const initialState = {
    favoritesFilms: []
};


export function toggleFavorite(state = initialState, action) {
    let nexState;
    nexState = Object.assign({}, state);
    switch(action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilms.findIndex(_elt => _elt.id === action.value.id);
            if (favoriteFilmIndex !== -1) {
                console.log(favoriteFilmIndex);
                // supression
                nexState.favoritesFilms = state.favoritesFilms.filter((_elt, index) => index !== favoriteFilmIndex);
            } else {
                // add
                nexState.favoritesFilms = state.favoritesFilms.concat(action.value);
            }
            return nexState  || state;
        default:
            return nexState;
    }
}