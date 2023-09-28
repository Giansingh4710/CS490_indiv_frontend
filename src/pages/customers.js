import React, { useEffect, useState } from 'react'
import Navbar from '../comps/navbar.js'

export default function CustomersPage() {
  const [allCustomers, setAllCustomers] = useState([])
  const [showCustomers, setShowCustomers] = useState([])
  useEffect(() => {
    fetch('http://127.0.0.1:1313/customers/listAll')
      .then((res) => res.json())
      .then((data) => {
        setAllCustomers(data)
        setShowCustomers(data)
      })
  }, [])
  return (
    <div className='App'>
      <Navbar />
      <h1>CustomersPage</h1>
      <h2>Total Customers: {showCustomers.length}</h2>
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
            if (i.target.value === '') {
              setShowCustomers(allCustomers)
            }
          }}
          id='searchInput'
          type='text'
          placeholder='Filter By ID First/Last Name'
        />
        <button
          onClick={() => {
            const word = document.getElementById('searchInput').value
            setShowCustomers(
              allCustomers.filter((cust) => {
                return (
                  cust.customer_id == word ||
                  cust.first_name.toLowerCase() == word.toLowerCase() ||
                  cust.last_name.toLowerCase() == word.toLowerCase()
                )
              })
            )
          }}
        >
          Search
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>customer_id</th>
            <th>store_id</th>
            <th>first_name</th>
            <th>last_name</th>
            <th>email</th>
            <th>address_id</th>
            <th>active</th>
            <th>Edit Detail</th>
          </tr>
        </thead>
        <tbody>
          {showCustomers.map((cust, index) => {
            return (
              <tr key={index} id={cust.customer_id}>
                <td>{cust.customer_id}</td>
                <td contentEditable={cust.new}>{cust.store_id}</td>
                <td contentEditable={cust.new}>{cust.first_name}</td>
                <td contentEditable={cust.new}>{cust.last_name}</td>
                <td contentEditable={cust.new}>{cust.email}</td>
                <td contentEditable={cust.new}>{cust.address_id}</td>
                <td contentEditable={cust.new}>{cust.active}</td>
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
      active: tr.children[6].innerText,
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
  deleteBtn.onclick = () => {
    const customer_id = tr.children[0].innerText
    const link = 'http://127.0.0.1:1313/customers/delete?customer_id=' + customer_id
    console.log(link)
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
