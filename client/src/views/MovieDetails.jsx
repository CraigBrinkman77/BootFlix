import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useParams, useHistory} from "react-router-dom";
import NavBar from '../components/NavBar';
import '../style/moviedetails.css'

const MovieDetails = () => {

    const [movie, setMovie] = useState({})
    const [movieV, setMovieV] = useState([])
    const [myList, setMyList] = useState(true)
    const [myNotList, setMyNotList] = useState(false)
    const [favoriteMovieId, setFavoriteMovieId] = useState([])
    const [loggedinuser, setLoggedInUser] = useState({})
    const [refresh, setRefresh] = useState(true)
    const {id} = useParams()
    const history = useHistory()
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/getloggedinuser", { withCredentials: true })
            .then(res => {
                console.log("logged in user info", res)
                setLoggedInUser(res.data)
                let MovieId = res.data.favorites
                for(let i=0; i<MovieId.length; i++){
                    if(MovieId[i].movie_id===id){
                        setFavoriteMovieId(MovieId[i].movie_id)
                    }
                }
            }
        )
        .catch(err => {
            history.push('/')
            console.log("errorrrrrr", err)
        })
    },[refresh])
    const [object, setObject] = [{movie_id :id, moviePoster_path: movie.poster_path}]
    
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=c49e028232019660cab8e28bf4d018d9&language=en-US`)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err => {
                console.log("errorrrrrr", err)
            })
    }, [id])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=c49e028232019660cab8e28bf4d018d9&language=en-US`)
            .then(res => {
                setMovieV(res.data.results[0])
            })
            .catch(err => {
                console.log("errorrrrrr", err)
            })
    }, [id])

    const addToFavorites = () => {
        let newFavorites = [...loggedinuser.favorites]
        let object ={movie_id :id, moviePoster_path:movie.poster_path}
        let found = false
        for(let i=0; i<newFavorites.length; i++){
            if (newFavorites[i].movie_id===id){
                found = true
            }
        }
        if(found === false){
            newFavorites.push(object)
        }
            axios.put("http://localhost:8000/api/user/update/" + loggedinuser._id, {favorites:newFavorites})
                .then(res => {
                    setRefresh(!refresh)
                    console.log(res.data)
                })
                .catch(err => {
                    console.log("errorrrrrr", err)
                })
    }

    const deleteFromFavorites =() =>{
        let newFavorites = [...loggedinuser.favorites]
        for(let i=0; i<newFavorites.length; i++){
            if (newFavorites[i].movie_id===id){
                newFavorites.splice(i,1)
            }
        }
        axios.put("http://localhost:8000/api/user/update/" + loggedinuser._id, {favorites:newFavorites})
        .then(res => {
            setRefresh(!refresh)
            console.log(res.data)
            setMyList(!myList)
        })
        .catch(err => {
            console.log("errorrrrrr", err)
        })
    }

    const check =()=>{
        console.log(loggedinuser.favorites.includes(object))
        setMyList(!myList)
        if(myList === true){
            deleteFromFavorites()
            
        }else{
            addToFavorites()
        }
    }
    const hasFavorite = () => {
        console.log(loggedinuser.favorites.includes(object))
        return (loggedinuser.favorites.includes(object))
    }
    
    return (
        <div className='row'>
            <NavBar  id={loggedinuser._id} username={loggedinuser.username}/>
            {/* <iframe width="720" height="515" src={`https://www.2embed.ru/embed/tmdb/movie?id=${id}`}></iframe> */}
            <iframe width="720" height="515" className='column left' src={`https://www.youtube.com/embed/${movieV.key}`}></iframe>
                <h2 className='title'>{movie.original_title}</h2>
                <h3 className='coulmn right'>Movie Details</h3>
                <p className='coulmn right'>{movie.overview}</p>
                <h3 className='coulmn right'>Movie Popularity Score:</h3>
                <p className='coulmn right'>{movie.popularity}</p>
                <h3 className='coulmn right'>Movie Release Date:</h3>
                <p className='coulmn right'>{movie.release_date}</p>
                <h3 className='coulmn right'>Vote Average:</h3>
                <p className='coulmn right'>{movie.vote_average}/10</p>

                {/* <button className='icon' onClick={addToFavorites}><i  class="material-icons">star_border</i></button>
                <button onClick={deleteFromFavorites}>Delete from My List</button> */}
                <label>Add to My List</label>
                {
<<<<<<< HEAD
                favoriteMovieId? <input type="checkbox" checked={true} onClick = {check} />
                :<input type="checkbox" checked={hasFavorite} onClick = {check} />
=======
                favoriteMovieId===id? <input type="checkbox" checked={myList} onClick = {check} />
<<<<<<< HEAD
                :<input type="checkbox" checked={false} onClick = {check} />
=======
                :<input type="checkbox" checked={myNotList} onClick = {check} />
>>>>>>> origin/main
>>>>>>> b19d7a94ba9b11f881203610bea1b5188f6d4bbb
                }

        </div>
    )
}


export default MovieDetails
