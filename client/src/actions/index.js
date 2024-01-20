import axios from 'axios';
//Traemos los videogames
export function getVideogames()  {
    return async function(dispatch){
        let res = await axios.get(
            "http://localhost:5000/videogames",{
         });
         return dispatch({
             type: 'GET_VIDEOGAMES',
             payload: res.data
         });
    }
}

//traemos la query del back para el search
export function getNameGames(name) {
    return async function(dispatch){
        try{
            let res = await axios.get(
                'http://localhost:5000/videogames?name=' + name
            )
            return dispatch({
                type: "GET_NAME_GAMES",
                payload: res.data
            })
        }catch (error) {
            console.log(error)
        }
    }
}

//createdGames
export function postGames(payload) {
    return async function() {
        try{
        let response = await axios.post(
            "http://localhost:5000/created",payload
        );
        return response;
        } catch(err) {
           return {
               error: "Can't Create Videogame",
               originalError: err
           }
        }
    }
}

export function getDetail (id) {
    return async function(dispatch){
        try{
            const res = await axios.get(
                `http://localhost:5000/videogames/${id}`
            );
            return dispatch({
                type: "GET_DETAILS",
                payload: res.data
            })
        } catch (err) {
            return {
                error: "Can't Get Details",
                originalError: err
            }
        }
    }
}

export function deleteGame(id) {
    return async function() {
        try {
            let response = await axios.delete(`http://localhost:5000/videogames/${id}`)
            return response.data;
        } catch (err) {
            return {
                error: "Can't Delete Videogame",
                originalError: err
            }
        }
    }
};


//traemos los genres
export function getGenres() {
    return async function(dispatch) {
        try {
            const info = await axios.get(
                "http://localhost:5000/genres",{
 })
            console.log('genres', info.data)
            return dispatch({
                type: 'GET_GENRES',
                payload: info.data
                
            })
        } catch (err) {
            return {
                error: "Can't Fetch Genres",
                originalError: err
            }
        }   
    }  
};



//filtroXgeneros
export function filterXgenres(payload) {
    return {
        type: 'FILTER_BY_GENRE',
        payload
    };
};

//filtroXcreatedInDB
export function filterCreate(payload) {
    return {
        type: 'FILTER_CREATE',
        payload
    };
};

//orderXname
export function orderXname(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    };
};

//orderXrating
export function orderXrating(payload) {
    return {
        type: 'ORDER_BY_RATING',
        payload
    };
};

