import React, { useEffect, useState } from 'react'
import Navbar from '../comps/navbar.js'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'

export default function CustomersPage() {
  const [allCustomers, setAllCustomers] = useState([])
  const [showCustomers, setShowCustomers] = useState([])
  const [customers_displayed_num, set_customers_displayed_num] = useState(0)
  const [searchWordCustomer, setSearchCustomer] = useState('')
  const [modalOpen, setModal] = React.useState(false)
  const [display_customer_movies, set_display_customer_movies] = React.useState(
    {}
  )

  useEffect(() => {
    fetch('http://127.0.0.1:1313/customers/listAll')
      .then((res) => res.json())
      .then((data) => {
        setAllCustomers(data)
        setShowCustomers(data)
      })
  }, [])

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

  function TheTable() {
    set_customers_displayed_num(0)
    return (
      <table>
        <thead>
          <tr>
            <th>customer_id</th>
            <th>store_id</th>
            <th>first_name</th>
            <th>last_name</th>
            <th>email</th>
            <th>address_id</th>
            <th>Edit Detail</th>
          </tr>
        </thead>
        <tbody>
          {showCustomers.map((cust, index) => {
            if (cust.active === 0) return null
            set_customers_displayed_num((i) => i + 1)
            return (
              <tr key={index} id={cust.customer_id} role='row'>
                <td>
                  <button
                    onClick={() => {
                      const link = `http://127.0.0.1:1313/customers/rented_movies?customer_id=${cust.customer_id}`
                      fetch(link)
                        .then((res) => res.json())
                        .then((movies) => {
                          set_display_customer_movies({
                            customer_id: cust.customer_id,
                            first_name: cust.first_name,
                            last_name: cust.last_name,
                            movies: movies,
                          })
                        })
                      setModal(true)
                    }}
                  >
                    {cust.customer_id}
                  </button>
                </td>
                <td contentEditable={cust.new}>{cust.store_id}</td>
                <td contentEditable={cust.new}>{cust.first_name}</td>
                <td contentEditable={cust.new}>{cust.last_name}</td>
                <td contentEditable={cust.new}>{cust.email}</td>
                <td contentEditable={cust.new}>{cust.address_id}</td>
                <td>
                  <button onClick={() => edit_and_save_customer(cust)}>
                    {cust.new ? 'Save' : 'Edit'}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  function CustomerMoviesModal() {
    if (display_customer_movies.movies === undefined) return null
    const name =
      display_customer_movies.first_name +
      ' ' +
      display_customer_movies.last_name
    return (
      <Modal open={modalOpen} onClose={() => setModal(false)}>
        <Box sx={style}>
          <h2>Total Rented Out Movies: {display_customer_movies.movies.length}</h2>
          <details style={{
            height: '200px',
            overflow: 'auto',
            border: '1px solid #000',
          }}>
            <summary>Movies for {name}</summary>
            <p>
              {display_customer_movies.movies.map((movie) => {
                return (
                  <div>
                    <button onClick={() => {
                      const link = `http://127.0.0.1:1313/customers/movie_returned?customer_id=${display_customer_movies.customer_id}&film_id=${movie.film_id}`
                      fetch(link).then(res => res.json()).then(dates => {
                        console.log(dates)
                        for(let date of dates){
                          if(!date.return_date){
                            alert(`Movie ${movie.title} not returned :(`)
                            return
                          }
                        }
                        alert(`Movie ${movie.title} returned successfully!`)
                      })
                    }}
                    >{movie.title}</button>
                  </div>
                )
              })}
            </p>
          </details>
        </Box>
      </Modal>
    )
  }

  return (
    <div className='App'>
      <Navbar />
      <h1>Customers Page</h1>
      <h2>Total Customers: {customers_displayed_num}</h2>
      <button
        onClick={(i) => {
          i.currentTarget.disabled = true
          const data = {
            customer_id: allCustomers[allCustomers.length - 1].customer_id + 1,
            new: true,
          }
          setShowCustomers([data, ...showCustomers])
        }}
      >
        Add Customer
      </button>
      <div>
        <input
          onChange={(i) => {
            if (i.target.value === '') setShowCustomers(allCustomers)
            setSearchCustomer(i.target.value)
          }}
          id='searchInput'
          type='text'
          placeholder='Filter By ID First/Last Name'
        />
        <button
          onClick={() => {
            const word = searchWordCustomer.toLowerCase()
            setShowCustomers(
              allCustomers.filter((cust) => {
                return (
                  cust.customer_id == word ||
                  cust.first_name.toLowerCase().includes(word) ||
                  cust.last_name.toLowerCase().includes(word)
                )
              })
            )
          }}
        >
          Search
        </button>
      </div>
      <TheTable />
      <CustomerMoviesModal />
    </div>
  )
}

function edit_and_save_customer(cust) {
  function update_customer(tr) {
    const data = {
      customer_id: tr.children[0].innerText,
      store_id: tr.children[1].innerText,
      first_name: tr.children[2].innerText,
      last_name: tr.children[3].innerText,
      email: tr.children[4].innerText,
      address_id: tr.children[5].innerText,
      active: tr.children[6].innerText,
    }
    const a = new URLSearchParams(data).toString()
    const link = 'http://127.0.0.1:1313/customers/update?' + a
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        if (data.errno) {
          alert('Error in updating customer ' + JSON.stringify(data))
        } else {
          alert('Suscessfully updated customer ' + JSON.stringify(data))
          window.location.reload()
        }
      })
  }

  function make_new_customer(tr) {
    const data = {
      customer_id: tr.children[0].innerText,
      store_id: tr.children[1].innerText,
      first_name: tr.children[2].innerText,
      last_name: tr.children[3].innerText,
      email: tr.children[4].innerText,
      address_id: tr.children[5].innerText,
    }
    const a = new URLSearchParams(data).toString()
    const link = 'http://127.0.0.1:1313/customers/new?' + a
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        if (data.errno) {
          alert('Error in making new customer ' + JSON.stringify(data))
        } else {
          alert('Suscessfully made new customer ' + JSON.stringify(data))
          window.location.reload()
        }
      })
  }

  function delete_customer(tr) {
    const customer_id = tr.children[0].innerText
    const link =
      'http://127.0.0.1:1313/customers/delete?customer_id=' + customer_id
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        if (data.errno) {
          alert('Error in Deleting customer ' + JSON.stringify(data))
        } else {
          alert('Suscessfully Deleted customer ' + JSON.stringify(data))
          window.location.reload()
        }
      })
  }

  const id = cust.customer_id
  const tr = document.getElementById(id)
  const btn = tr.children[tr.children.length - 1].children[0]
  if (cust.new) {
    btn.onclick = () => make_new_customer(tr)
    return
  }
  const edit_td = tr.children[tr.children.length - 1]
  const deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'
  deleteBtn.onclick = () => delete_customer(tr)
  edit_td.appendChild(deleteBtn)

  let i = 1
  while (i < tr.children.length - 1) {
    tr.children[i].contentEditable = true
    i++
  }
  btn.innerText = 'Save'
  btn.onclick = () => update_customer(tr)
}

function AddCustomer({ allCustomers }) {
  const data = {
    customer_id: allCustomers[allCustomers.length - 1].customer_id + 1,
    // store_id: tr.children[1].innerText,
    // first_name: tr.children[2].innerText,
    // last_name: tr.children[3].innerText,
    // email: tr.children[4].innerText,
    // address_id: tr.children[5].innerText,
    // active: tr.children[6].innerText,
  }
  return <div></div>
}
