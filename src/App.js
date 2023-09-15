import './App.css'

function App() {
  function getBackend() {
    // from https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
    fetch('http://127.0.0.1:1313/test')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        document.getElementById('bob').innerHTML += data['msg'] + ' '
      })
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 id='bob'></h1>
        <button onClick={getBackend}>Click me</button>
      </header>
    </div>
  )
}

export default App
