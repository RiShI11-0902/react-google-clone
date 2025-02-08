import HomePage from './components/HomePage'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"
import SearchPage from './components/SearchPage'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/searchPage' element={<SearchPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
