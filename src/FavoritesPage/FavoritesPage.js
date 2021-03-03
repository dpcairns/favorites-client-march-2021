import React, { Component } from 'react'
import { getFavorites } from '../api-utils.js'

export default class FavoritesPage extends Component {
    state = {
        favorites: []
    }

    componentDidMount = async() => {
        const favorites = await getFavorites(this.props.token);

        this.setState({ favorites })
    }
    render() {
        return (
            <div>
                <h2>Favorites!</h2>
                <div className="movies">
                    {
                        this.state.favorites.map(fave => <div className="movie">
                            <h3>{fave.title}</h3>
                            <p>{fave.year}</p>
                            <img src={`https://image.tmdb.org/t/p/original${fave.poster}`} alt={fave.title}/>
                    </div>
                            )
                    }
                </div>
            </div>
        )
    }
}
