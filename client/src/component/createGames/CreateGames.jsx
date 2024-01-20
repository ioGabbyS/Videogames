import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postGames, getGenres } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import './CreateGames.css';

export default function CreateGames() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres)
    const history = useHistory();
    console.log('create', genres)

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        platforms:[],
        genres: []
    });

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = "Name is Required"
        }else if (!input.image) {
            errors.image = "Image is Required"
        }else if (!input.description) {
            errors.description = "Description is Required"
        }else if (!input.released) {
            errors.released = "Date of Creation is Required"
        }else if (!input.rating) {
            errors.rating = "Rating Number is Required"
        }else if (!input.platforms) {
            errors.platforms = "Plataforms is Required"
        }
            return errors;
    };

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        console.log('input',input)
    }

    function handleSelect(e) {
        if(input.genres.includes(e.target.value)){
            alert("You already selected this genres.")
        }else if(input.genres.length >= 3) {
            alert("You can selected up to 3 genres.")
        }else {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }
  };

    function handleDelete(i) {
        setInput({
            ...input,
            genres: input.genres.filter(el => el !== i)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(errors).length > 0) {
            alert('Missing Data to Send Form')
        }
        else {
            dispatch(postGames(input));
            alert('Videogame Created');
            setInput({
                name: "",
                image: "",
                description: "",
                released: "",
                rating: "",
                platforms: [],
                genres: []
            })
            history.push('/videogames')
        }
    }


    return (
        <div className="container-form">
            <h1 className="title-form">Crea tu VideoGame</h1>
            <Link to='/videogames' >
                        <button className="salida">❌</button>
                    </Link>
            <form className="form" onSubmit={(e) => handleSubmit(e)} onKeyPress={(e) => {
                if (e.key === "Enter") {
                    handleSubmit(e)
                }
            }}
                autoComplete="off">
                <div className="div">
                    <label className="label">Name:</label>
                    <input
                        className='input'
                        type='text'
                        placeholder='Name...'
                        value={input.name}
                        name='name'
                        onChange={(e) => { handleChange(e) }}
                    />
                    {errors.name && (
                        <p className="danger">{errors.name}</p>
                    )}
                </div>
                <div className="div">
                    <label className="label">Image:</label>
                    <input
                    className="input"
                        type='text'
                        placeholder='Image url...'
                        value={input.image}
                        name='image'
                        onChange={(e) => { handleChange(e) }}
                    />
                       {errors.image && (
                        <p className="danger">{errors.image}</p>
                    )}
                </div>
                <div className="div">
                    <label className="label">Description:</label>
                    <input
                        className='input'
                        type='text'
                        placeholder='Descripiton...'
                        value={input.description}
                        name='description'
                        onChange={(e) => { handleChange(e) }}
                    />
                      {errors.description && (
                        <p className="danger">{errors.description}</p>
                    )}
                </div>
                <div className="div">
                    <label className="label">Released:</label>
                    <input
                        className='input'
                        type='date'
                        placeholder='Released...'
                        value={input.released}
                        name='released'
                        onChange={(e) => { handleChange(e) }}
                    />
                     {errors.released && (
                        <p className="danger">{errors.released}</p>
                    )}
                </div>
                <div className="div">
                    <label className="label">Rating:</label>
                    <input
                        className='input'
                        type='number'
                        placeholder='Rating...'
                        value={input.rating}
                        name='rating'
                        onChange={(e) => { handleChange(e) }}
                    />
                       {errors.rating && (
                        <p className="danger">{errors.rating}</p>
                    )}
                </div>
                <div className="div">
                    <label className="label">Platforms:</label>
                    <input
                        className='input'
                        type='text'
                        placeholder='Platforms...'
                        value={input.platforms}
                        name='platforms'
                        onChange={(e) => { handleChange(e) }}
                    />
                     {errors.platforms && (
                        <p className="danger">{errors.platforms}</p>
                    )}
                </div>
                <div className="div2">
                    <label className="label">Genres:</label>
                    <select
                    className="select2"
                     onChange={(e) =>
                        handleSelect(e)}>
                        {genres.map((el) => (
                            <option className="options" key={el.id} value={el.name}>{el.name}</option>
                        ))}
                    </select>
                    <ul className="generos">
                        {input.genres.map((el, i) =>
                            {
                                return <div className="buton-div" key={i}>
                                    <li>{el}</li>
                                    <buton className="buton-form" onClick={() => { handleDelete(el); } }>❌</buton>
                                </div>;
                            }
                        )}
                    </ul>
                </div>
                <button className="type-submit" onClick={(e) => { handleSubmit(e)}}>
                    CREATE
                    </button>
            </form>
        </div>
    )
}
