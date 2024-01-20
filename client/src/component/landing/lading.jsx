import React from 'react';
import { Link } from 'react-router-dom';
import gif from '../../img/gameOver.gif';
import './landing.css';

const landing = () => {
    return (
        <div className="container-landing">
             <header className="landing-header">
            <Link to ='/videogames'>
                    <button className="buton-landing">START</button>
            </Link>
            </header>
            <img className="gif-landing" src={gif} alt="Game Over..." />
        </div>
    )
}

export default landing;