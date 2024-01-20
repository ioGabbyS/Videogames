import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, deleteGame } from '../../actions';
import { useEffect, useState } from 'react';
import loading from '../../img/bateria.gif';
import './details.css';

export default function DetailsGames(props){
    console.log(props)
    const dispatch = useDispatch()
    

    const [detail, setDetail] = useState([]);
    const history = useHistory();

    useEffect(() => {
       dispatch(getDetail(props.match.params.id));
    }, [dispatch])
   

    function handleDetails(e) {
        e.preventDefault();
        setDetail(getDetail(detail))
        history.push('/videogames')
    }

    function handleDelete(e) {
        dispatch(deleteGame(props.match.params.id));
        history.push('/videogames');
        window.location.replace('');
    }

    const myGames = useSelector((state) => state.details)
    console.log('detalles',myGames)

    return(
        <div className="container-detail">
            {
                myGames.length > 0?
                <div className="detail">
                    <h3 className="name">{myGames[0].name}</h3>
                    <img className="img" src={myGames[0].image} alt="" height="400px" width="600px" />
                    <h3 className="released">Released at: {myGames[0].released}</h3>
                    <h3 className="rating">Rating: {myGames[0].rating}</h3>
                    <h3 className="platforms">Platforms: {myGames[0].createdInDB === true ? myGames[0].platforms : myGames[0].platforms.map(el => el)}</h3>
                    <h3 className="genres">Genres: {!myGames[0].createdInDB ?
                         myGames[0].genres + ' ':
                         myGames[0].genres.map(el => el.name).join(' - ')}</h3>
                   <label className="label-description">Description</label>
                         <li className="descrption">{myGames[0].description.replace(/<[^>]*>?/g, '')}</li>
                        
                </div> :
                <div>
                <h1 className="loading">LOADING...</h1>
                <img className="gif-loading" src={loading} alt="Loading..." />
                </div>
            
            }
            
                <button className="bt1" onClick={(e) => handleDetails(e)}>Back</button>
          
            <div className="delete">
             <button className="bt2" onClick={(e) => {
                 const confirmBox = window.confirm('Do you really want to delete this Game?');
                 if(confirmBox === true) {
                     handleDelete(e)
                 }
             }}>❌</button>
            </div>
        </div>
    )

}

// export default function DetailsGames(props) {
//     const id = props.match.params.id;
//     const games = useSelector((state) => state.details)
//     const dispatch = useDispatch();
//     const img = games.image;
//     useEffect(() => {
//         dispatch(getDetail(id));
//     }, [dispatch, id]);
    
//     return(
//         <div>
//             <div>
//                 <h2>DETALLES</h2>
//             </div>
//             <div className="img-container">
//           <img className="det_img" src={img} width={400} alt="" />
//         </div>
//             <div>
//                 <h1>{games.name}</h1>
//             </div>
//             <div>
//                 <div>
//                 <li>Released: {games.released}</li>
//           <li>Rating: {games.rating}</li>          
//           {/* <li>Platforms: {games.createdInDB === true ? games.platforms : games.platforms.map(el => el)}&nbsp;</li>           */}
//           <li>Genre: {!games[0].createdInDB ?
//                          games[0].genres + ' ':
//                          games[0].genres.map(el => el.name).join(' - ')}&nbsp;</li>
//                           <li>Description: {games.description}</li>  
//                 </div>

//             </div>

//         </div>
//     )
// }