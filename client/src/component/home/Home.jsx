import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    filterCreate, filterXgenres, 
    getGenres, getVideogames, 
    orderXname, orderXrating
}from '../../actions/index';
import SearchBar from '../searchBar/SearchBar';
import Pages from '../pages/Pages'; 
import { BsArrowRepeat } from "react-icons/bs";
import './home.css';

export default function Home() {

    const dispatch = useDispatch();
   
    const genres = useSelector((state) => state.genres);

    //estado para orderXname
    const[,setOrderName] = useState('');
    
    //estado para orderXrating
    const[,setOrderRating] = useState('')

   

    useEffect(() => {
       dispatch(getVideogames());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);
    
    //resetea los games
    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
    }
    
    function handleFilterGenres(e) {
        dispatch(filterXgenres(e.target.value));
    }

    function handleFilterCreate(e) {
        dispatch(filterCreate(e.target.value));
    }

    function handleOrderName(e) {
        e.preventDefault(e);
        dispatch(orderXname(e.target.value));
        // setCurrentPage(1);
        setOrderName(`Ordenado ${e.target.value}`)
    }

    function handleOrderRating(e) {
        dispatch(orderXrating(e.target.value));
        setOrderRating(`Ordenado ${e.target.value}`);
    }

    return (
        <div>
            <SearchBar />
             <div className="todo">
                 <div className="selects">
                 <BsArrowRepeat size={25} className="refresh" onClick={e => {handleClick(e)}} />
                 <select className="selected-home" onChange={e => handleOrderName(e)}>
                   <option>Order Alphabetically</option>
                    <option value='asc'>Ascendenet</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select className="selected-home"  onChange={(e) => {handleOrderRating(e)}}>
                    <option>Rating</option>
                 <option value='min'>Min Rating</option>
                 <option value='max'>Max Rating</option>
                </select>
                <select className="selected-home"  onChange={(e) => {handleFilterGenres(e)}}>
            <option value="All">Genres</option>
             {genres && genres.map((el) => {
               return <option key={el.id} value={el.name}>{el.name}</option>
              })}
         </select>
                 <select className="selected-home"  onChange={(e) => {handleFilterCreate(e)}}>
                     <option>Filter Games</option>
                    <option value="All">All Games</option>
                     <option value="Created">Created Games</option>
                    <option value="From Api">Api Games</option>
                 </select>
                 </div>
                <Pages/>
            </div>
         </div>
    )
}
