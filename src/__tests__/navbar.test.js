import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../comps/navbar.js'
import CustomersPage from '../pages/customers.js'

describe('Navbar Component', () => {
  test('renders three navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const links = screen.getAllByRole('link') // Assert that there are three navigation links
    expect(links).toHaveLength(3)
    expect(links[0].textContent).toBe('Landing Page')
    expect(links[1].textContent).toBe('Movies Page')
    expect(links[2].textContent).toBe('Customers Page')
  })

  test('navigation links have correct href attributes', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const links = screen.getAllByRole('link')
    expect(links[0].getAttribute('href')).toBe('/')
    expect(links[1].getAttribute('href')).toBe('/movies')
    expect(links[2].getAttribute('href')).toBe('/customers')
  })

  test('navigation links have the correct class name', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    // Assert the class name of each link
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link.className).toBe('navLink')
    })
  })
})

