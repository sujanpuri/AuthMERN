import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./component/login";
import Register from "./component/register";
import Page from "./component/Page";
import Admin from "./component/admin";
function App() {
  return (
    <>
      <Router>
        <Link to="/login">
          <p>login</p>
        </Link>
        <Link to="/register">
          <p>register</p>
        </Link>
        
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/page" element={<Page /> }/>
            <Route path="/admin" element={<Admin /> }/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
