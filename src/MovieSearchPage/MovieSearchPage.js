import React, { Component } from 'react'
import { searchMovies, addFavorite, getFavorites } from '../api-utils.js';
export default class MovieSearchPage extends Component {
    state = {
        movies: [],
        favorites: [],
        search: ''
    }

    componentDidMount = async() => {
        if (this.props.token) await this.doFavoritesFetch();
    }

    doFavoritesFetch = async () => {
        const favorites = await getFavorites(this.props.user.token);

        this.setState({ favorites })

    }
    doSearch = async () => {
        const movies = await searchMovies(this.state.search);

        this.setState({ movies });
    }

    handleSubmit = async e => {
        e.preventDefault();

        await this.doSearch();
    }

    handleFavoriteClick = async (rawMovie) => {
        await addFavorite({
            title: rawMovie.original_title,
            genre: 'documentary',
            director: 'martic scorsese',
            year: rawMovie.release_date.slice(0, 4),
            poster: rawMovie.poster_path || 'http://placekitten.com/300/300',
            runtime: 90,
            movie_db_id: rawMovie.id,
        }, this.props.user.token);

        await this.doFavoritesFetch();
    }

    handleSearchChange = e => this.setState({ search: e.target.value })

    isAFavorite = (movie) => {
        if (!this.props.token) return true;

        const isIsFavorites = this.state.favorites.find(favorite => favorite.movie_db_id === movie.id);

        return Boolean(isIsFavorites);
    }

    render() {   
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.search} onChange={this.handleSearchChange} />
                    <button>Search for movies</button>
                </form>
                <div className="movies">
                {
                    this.state.movies.map((movie, i) => 
                    <div key={`${movie.title}-${i}`} className="movie">
                        <h3>{movie.original_title}</h3>
                        <p>{movie.release_date}</p>
                        <p>{
                        this.isAFavorite(movie) 
                            ? '<3' 
                            :  <button onClick={() => this.handleFavoriteClick(movie)}>Make favorite</button>}
                        </p>
                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}/>
                    </div>)
                }
                </div>
            </div>)
   }
}
