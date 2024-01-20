import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { BsChevronDoubleRight } from "react-icons/bs";
import loading from '../../img/bateria.gif';
import './pages.css';

export default function Pages() {
    const games = useSelector((state) => state.filter);
    const [ currentPage, setCurrentPage ] = useState(0);

    const nextPage = () => {
        if(games.length <= currentPage + 15) {
            setCurrentPage(currentPage);
        } else setCurrentPage(currentPage + 15);
    };

    const prevPage = () => {
        if(currentPage < 16){
            setCurrentPage(0);
        } else {
            setCurrentPage(currentPage - 15);
        }
    }

    const FirstPage = () => {
        setCurrentPage(0);
    };

    const lastPage = () => {
        setCurrentPage(games.length - 15);
    }

    useEffect(() => {
        FirstPage();
    }, [games]);

    const list = games.slice(currentPage, currentPage + 15);
    return (
        <div className="container-page">
            <div className="page-container">
               <BsChevronDoubleLeft className="start" onClick={FirstPage} />
               &nbsp;
               <BsChevronLeft size={25} className="back" onClick={prevPage} />
               &nbsp;
               <BsChevronRight size={25} className="back" onClick={nextPage} />
               &nbsp;
               <BsChevronDoubleRight className="end" onClick={lastPage} />
            </div>
            <div>
            {
            list.length === 0 ? 
            (<div>
                <h1 className="loading">Not Found Loading...</h1>
                <img className="gif-loading" src={loading} alt="Loading..." />
                </div>) : list.map((el) => (
          <Link key={el.id} to={`/videogames/${el.id}`} style={{ textDecoration: 'none' }}>
            <Card className="card-pagination" 
            name={el.name}
            image={el.image} 
            genres={el.createdInDB? el.genres.map((e) => e.name).join(' ')
             : el.genres.join(' - ')} 
             rating={el.rating}
             />
          </Link>
        ))}  
            </div>
        </div>
    )
}