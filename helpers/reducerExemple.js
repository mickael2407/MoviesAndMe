function reducerProfil(state, action) {
    let nexState;
    nexState = Object.assign({}, state);
    switch(action.type) {
        case 'ADD_PROFIL':
            nexState.profil = action.value;
            return nexState;
        case 'UPDATE_PROFIL':
            return nexState;
        case 'DELETE_PROFIL':
            return nexState;
        default:
            return nexState;
    }
    return nexState;
}