import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard'
import Nav from '../components/Nav'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/sign-up' element={<Signup />}/>
          <Route path='/log-in' element={<Login />}/>
        </Routes>
      </div>  
    </Router>
  )
}

export default App;
 