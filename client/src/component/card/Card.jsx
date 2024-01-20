import React from 'react';
import './card.css';

export default function Card({ name, image, genres, rating }) {
    return (
        <div className="container-cards">
        <div className="cards-name">
        <img className="card-img"src={image} alt="img Not Found" width="150px" height="130px" />
            <h3 className="name-card">{name}</h3>
            <h5 className="card-genre">{genres}</h5>
            <p>{rating}⭐</p>
            </div>
        </div>
    );
}