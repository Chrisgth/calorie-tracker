import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path='/sign-up' element={<Signup />}/>
          <Route path='/log-in' element={<Login />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
        <Footer />
      </div>  
    </Router>
  )
}

export default App;
 