import React, { useState } from 'react'
import Navbar from '../comps/navbar.js'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'

export default function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [searchType, setSearchType] = useState('filmSearch')
  const [modalOpen, setModal] = React.useState(false)
  const [film_id_to_rent, set_film_id] = React.useState(-1)
  const [customer_id, set_customer_id] = React.useState(-1)
  const [store_id, set_store_id] = React.useState(-1)
  const [staff_id, set_staff_id] = React.useState(-1)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  function SearchType() {
    return searchType === 'filmSearch' ? (
      <FilmSearch setMovies={setMovies} />
    ) : searchType === 'actorSearch' ? (
      <ActorSearch setMovies={setMovies} />
    ) : (
      <GenreSearch setMovies={setMovies} />
    )
  }

  function TheTable() {
    return (
      <table>
        <thead>
          <tr>
            <th>Rent Out</th>
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
                <td>
                  <button
                    onClick={() => {
                      setModal(true)
                      set_film_id(movie.film_id)
                    }}
                  >
                    Rent Movie
                  </button>
                </td>
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
    )
  }

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
      <SearchType />
      <h2>Total Movies: {movies.length}</h2>
      <TheTable />

      <Modal open={modalOpen} onClose={() => setModal(false)}>
        <Box sx={style}>
          <h2>Rent Out Movie</h2>
          <p>Film ID: {film_id_to_rent}</p>
          <TextField
            id='outlined-basic'
            label='Customer ID'
            variant='outlined'
            onChange={(i) => set_customer_id(i.target.value)}
          />
          <TextField
            id='outlined-basic'
            label='Store ID'
            variant='outlined'
            onChange={(i) => set_store_id(i.target.value)}
          />
          <TextField
            id='outlined-basic'
            label='Staff ID'
            variant='outlined'
            onChange={(i) => set_staff_id(i.target.value)}
          />
          <button
            onClick={() => {
              const link = 'http://127.0.0.1:1313/movies/rent'
              if (staff_id != 1 && staff_id != 2) {
                alert('Invalid Staff ID')
                return
              }

              if (store_id === -1 || !store_id) {
                alert('Invalid Store ID')
                return
              }
              if (customer_id === -1 || !customer_id) {
                alert('Invalid Customer ID')
                return
              }
              fetch(link, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  film_id: parseInt(film_id_to_rent),
                  customer_id: parseInt(customer_id),
                  store_id: parseInt(store_id),
                }),
              })
                .then((response) => {
                  return response.json()
                })
                .then((data) => {
                  console.log(data)
                  alert(JSON.stringify(data))
                })
            }}
          >
            Submit
          </button>
        </Box>
      </Modal>
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
