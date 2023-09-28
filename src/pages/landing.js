import Navbar from '../comps/navbar.js'

export default function LandingPage() {
  function make_li(name, obj) {
    const li = document.createElement('li')
    li.innerText = `${name}: ${obj[name]}`
    return li
  }

  function get_top5_movies() {
    document.getElementById('item_details').innerHTML = ''
    fetch('http://127.0.0.1:1313/landing/top5movies')
      .then((response) => {
        return response.json()
      })
      .then((top5movies) => {
        const top5lst = document.getElementById('top5lst')
        top5lst.innerHTML = ''
        for (let movie of top5movies) {
          const li = document.createElement('li')
          const btn = document.createElement('button')
          btn.innerText = movie.title
          btn.onclick = () => get_movie_details(movie.title)
          li.appendChild(btn)
          top5lst.appendChild(li)
        }
      })
  }

  function get_movie_details(title) {
    const link = `http://127.0.0.1:1313/landing/movieDetail?movie=${title}`
    fetch(link)
      .then((res) => {
        return res.json()
      })
      .then((movie_detail) => {
        movie_detail = movie_detail[0]
        const detail_tag = document.getElementById('item_details')
        detail_tag.innerHTML = ''
        const keys = [
          'film_id',
          'title',
          'description',
          'release_year',
          'language_id',
          'original_language_id',
          'rental_duration',
          'rental_rate',
          'length',
          'replacement_cost',
          'rating',
          'special_features',
          'last_update',
        ]
        for (let key of keys) {
          detail_tag.appendChild(make_li(key, movie_detail))
        }
      })
  }

  function get_top5_actors() {
    document.getElementById('item_details').innerHTML = ''
    fetch('http://127.0.0.1:1313/landing/top5actors')
      .then((response) => {
        return response.json()
      })
      .then((top5actors) => {
        const top5lst = document.getElementById('top5lst')
        top5lst.innerHTML = ''
        for (let actor of top5actors) {
          const li = document.createElement('li')
          const btn = document.createElement('button')
          btn.innerText = actor.first_name + ' ' + actor.last_name
          btn.onclick = () => get_actor_details_n_top5_movies(actor.actor_id)
          li.appendChild(btn)
          top5lst.appendChild(li)
        }
      })
  }

  function get_actor_details_n_top5_movies(actor_id) {
    const link = `http://127.0.0.1:1313/landing/actorDetail?actor_id=${actor_id}`
    fetch(link)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        const detail_tag = document.getElementById('item_details')
        detail_tag.innerHTML = '<p>Actor Details</p>'
        const keys = ['actor_id', 'first_name', 'last_name', 'last_update']
        for (let key of keys) {
          detail_tag.appendChild(make_li(key, data['actor_detail']))
        }

        detail_tag.innerHTML += '<p>Top 5 rented Movies</p>'
        for (let movie of data['rented_movies']) {
          const li = document.createElement('li')
          li.innerText = `${movie.title} was rented ${movie.rented} times`
          detail_tag.appendChild(li)
        }
      })
  }

  return (
    <div className='App'>
      <Navbar />
      <button onClick={get_top5_movies}>Get Top 5 Movies</button>
      <button onClick={get_top5_actors}>Get Top 5 actors</button>
      <ul id='top5lst'></ul>
      <hr />
      <ul id='item_details'></ul>
    </div>
  )
}
