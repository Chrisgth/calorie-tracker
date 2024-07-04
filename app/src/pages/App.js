import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }, []);

  useEffect(() => {}, [user]);

  return (
    <Router>
      <div className="App">
        <Nav user={user} setUser={setUser} />
        <div className="content">
          <Routes>
            <Route path="/calorie-tracker" element={<Navigate to="/" />} />
            <Route
              path="/sign-up"
              element={user ? <Navigate to="/" /> : <Signup setUser={setUser} user={user} />}
            />
            <Route
              path="/log-in"
              element={user ? <Navigate to="/" /> : <Login setUser={setUser} user={user} />}
            />
            <Route
              path="/"
              element={!user ? <Navigate to="/log-in" /> : <Dashboard user={user} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
