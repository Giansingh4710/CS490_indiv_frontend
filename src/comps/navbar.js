import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav id='navbar'>
      <ul>
        <ATag href='/'>Landing Page</ATag>
        <ATag href="/movies">Movies Page</ATag>
        <ATag href="/customers">Customers Page</ATag>
      </ul>
    </nav>
  )
}

function ATag({ href, children }) {
  return (
    <li>
      <Link to={href} className='navLink'>
        {children}
      </Link>
    </li>
  )
}
