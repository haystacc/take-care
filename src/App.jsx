import Pages from './Pages'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Pages />
        <ToastContainer aria-live="assertive" role="alert"/>
      </BrowserRouter>
    </>
  )
}

export default App