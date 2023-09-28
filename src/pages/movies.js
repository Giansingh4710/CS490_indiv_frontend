import React, { useState } from 'react'
import Navbar from '../comps/navbar.js'

export default function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [searchType, setSearchType] = useState('filmSearch')
  return (
    <div className='App'>
      <Navbar />
      <h1>Movies</h1>
      <select
        value={searchType}
        onChange={(i) => setSearchType(i.target.value)}
      >
        <option value='filmSearch'>Search By Film</option>
        <option value='actorSearch'>Search By Actor</option>
        <option value='genreSearch'>Search By Genre</option>
      </select>
      {searchType === 'filmSearch' ? (
        <FilmSearch setMovies={setMovies} />
      ) : searchType === 'actorSearch' ? (
        <ActorSearch setMovies={setMovies} />
      ) : (
        <GenreSearch setMovies={setMovies} />
      )}
      <h2>Total Movies: {movies.length}</h2>
      <table>
        <thead>
          <tr>
            <th>film_id</th>
            <th>title</th>
            <th>description</th>
            <th>release_year</th>
            <th>language_id</th>
            <th>original_language_id</th>
            <th>rental_duration</th>
            <th>rental_rate</th>
            <th>length</th>
            <th>replacement_cost</th>
            <th>rating</th>
            <th>special_features</th>
            <th>last_update</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => {
            return (
              <tr key={index}>
                <td>{movie.film_id}</td>
                <td>{movie.title}</td>
                <td>{movie.description}</td>
                <td>{movie.release_year}</td>
                <td>{movie.language_id}</td>
                <td>{movie.original_language_id}</td>
                <td>{movie.rental_duration}</td>
                <td>{movie.rental_rate}</td>
                <td>{movie.length}</td>
                <td>{movie.replacement_cost}</td>
                <td>{movie.rating}</td>
                <td>{movie.special_features}</td>
                <td>{movie.last_update}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function FilmSearch({ setMovies }) {
  return (
    <div>
      <h2>Search Films by Film Name</h2>
      <input id='filmSearch' type='text' />
      <button
        onClick={() => {
          const searched = document.getElementById('filmSearch').value
          const link =
            'http://127.0.0.1:1313/movies/search?type=film&search=' + searched
          fetch(link)
            .then((response) => {
              return response.json()
            })
            .then((filmData) => {
              setMovies(filmData)
            })
        }}
      >
        Search
      </button>
    </div>
  )
}

function ActorSearch({ setMovies }) {
  return (
    <div>
      <h2>Search Films by Actor Name</h2>
      <input id='filmSearch' type='text' />
      <button
        onClick={() => {
          const searched = document.getElementById('filmSearch').value
          const link =
            'http://127.0.0.1:1313/movies/search?type=actor&search=' + searched
          fetch(link)
            .then((response) => {
              return response.json()
            })
            .then((filmData) => {
              setMovies(filmData)
            })
        }}
      >
        Search
      </button>
    </div>
  )
}

function GenreSearch({ setMovies }) {
  const genres = [
    'Action',
    'Animation',
    'Children',
    'Classics',
    'Comedy',
    'Documentary',
    'Drama',
    'Family',
    'Foreign',
    'Games',
    'Horror',
    'Music',
    'New',
    'Sci-Fi',
    'Sports',
    'Travel',
  ]

  return (
    <div>
      <h2>Search Films by Genre</h2>
      <select id='Genres'>
        {genres.map((genre, index) => {
          return (
            <option key={index} value={genre}>
              {genre}
            </option>
          )
        })}
      </select>
      <button
        onClick={() => {
          const opt_selected = document.getElementById('Genres').value
          const link =
            'http://127.0.0.1:1313/movies/search?type=genre&search=' +
            opt_selected
          fetch(link)
            .then((response) => {
              return response.json()
            })
            .then((filmData) => {
              setMovies(filmData)
            })
        }}
      >
        Search
      </button>
    </div>
  )
}
