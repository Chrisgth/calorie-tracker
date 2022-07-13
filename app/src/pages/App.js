import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {}, [user]);

  return (
    <Router>
      <div className="App">
        <Nav user={user} />
        <div className="content">
          <Routes>
            <Route path="/sign-up" element={<Signup />} />
            <Route
              path="/log-in"
              element={<Login setUser={setUser} user={user} />}
            />
            <Route
              path="/"
              element={
                user === null ? <Navigate to="/log-in" /> : <Dashboard />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
