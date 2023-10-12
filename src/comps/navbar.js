import { Link } from 'react-router-dom'
import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'

pdfMake.vfs = pdfFonts.pdfMake.vfs

export default function Navbar() {
  return (
    <nav id='navbar'>
      <ul>
        <ATag href='/'>Landing Page</ATag>
        <ATag href='/movies'>Movies Page</ATag>
        <ATag href='/customers'>Customers Page</ATag>
        <button onClick={genaratePDF}>Get PDF report</button>
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

function genaratePDF() {
  function downloadPdf(data) {
    const document = {
      content: [{ text: 'Customers', fontStyle: 15, lineHeight: 2 }],
    }
    data.forEach((cust) => {
      let cols = []
      for (let attribute in cust) {
        const line = attribute + ': ' + cust[attribute]
        cols.push({ text: line, width: 10 })
      }
      cols.push({ text: "------------End of Customer----------", width: 10 })
      document.content.push({
        columns: [cols],
        lineHeight: 1,
      })
    })
    pdfMake.createPdf(document).download()
  }
  const store_id = prompt('Enter store id:')
  const link = `http://127.0.0.1:1313/pdfReport?store_id=${store_id}`

  fetch(link)
    .then((res) => res.json())
    .then((data) => {
      downloadPdf(data)
    })
}
