import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import Index from './Index';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Index />}/>
          <Route path='/sign-up' element={<Signup />}/>
          <Route path='/log-in' element={<Login />}/>
        </Routes>
      </div>  
    </Router>
  )
}

export default App;
