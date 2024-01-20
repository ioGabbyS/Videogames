const initialState = {
  videogames: [],
  filter: [],
  filter2: [],
  genres: [],
  details: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        filter: action.payload,
        filter2: action.payload
      };
      case "GET_NAME_GAMES":
          return {
              ...state,
              filter: action.payload
          }
          case "GET_DETAILS":
              return{
                  ...state,
                  details: action.payload
              }
          case "POST_GAME":
              return {
                  ...state,
              }
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
      case "DELETE_GAME":
            const eliminated = state.videogames.filter(el => el.id !== action.payload.id)
            return {
                ...state,
                videogames: eliminated
            };
    case "FILTER_BY_GENRE":
      const genresGames = state.filter2;

      const genresFiltered = action.payload === "All" ? genresGames :     
      genresGames.filter((el) => 
      el.genres.includes(action.payload))

      return {
        ...state,
        filter: genresFiltered
      };
    case "FILTER_CREATE":
      const filterCreated =
        action.payload === "Created"
          ? state.filter2.filter((el) => el.createdInDB === true)
          : state.filter2.filter((el) => !el.createdInDB);
      return {
        ...state,
        filter: filterCreated,
      };
    case "ORDER_BY_RATING":
      const filterRating =
        action.payload === "max"
          ? state.filter2.sort((a, b) => {
              if (a.rating < b.rating) {
                return 1;
              }
              if (b.rating < a.rating) {
                return -1;
              } else {
                return 0;
              }
            })
          : state.filter2.sort((a, b) => {
              if (a.rating < b.rating) {
                return -1;
              }
              if (b.rating < a.rating) {
                return 1;
              } else {
                return 0;
              }
            });
      return {
        ...state,
        videogames: filterRating,
      };
    case "ORDER_BY_NAME":
      const filterName =
        action.payload === "asc"
          ? state.filter2.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              } else {
                return 0;
              }
            })
          : state.filter2.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              } else {
                return 0;
              }
            });
      return {
        ...state,
        videogames: filterName,
      };
    default:
      return state;
  }
}

export default rootReducer;
