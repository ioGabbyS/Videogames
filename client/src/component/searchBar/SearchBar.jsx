import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameGames } from '../../actions';
import { Link } from 'react-router-dom';
import pacman from '../../img/pacman.png';
import { BsController } from "react-icons/bs";
import './Search.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState();

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameGames(name))
    }

    return (
        <div className="container-search">
              <div className="Logo"> 
                    <Link to="/"> <img className="Logo" alt="Not found" id="" src={pacman} width="15px" /> </Link>
                </div> 
            <input
            className="input-search"
            type='text'
            placeholder='Search...'
            onChange= {(e) => handleInputChange(e)}
            />
            <BsController className="icon" size={35} type='submit' 
            onClick= {(e) => handleSubmit(e)} />
            <div className="create">
                    <Link to="/creategames"><p className="create-nav">CREATE GAME</p></Link>
                </div>
        </div>
    )
}