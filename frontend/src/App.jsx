import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./component/login";
import Register from "./component/register";
import Page from "./component/Page";
function App() {
  const handleClick = ()=> {
    console.log("Clicked")
  }
  return (
    <>
      <Router>
        <Link to="/login">
          <p onClick={handleClick}>login</p>
        </Link>
        <Link to="/register">
          <p onClick={handleClick}>register</p>
        </Link>
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/page" element={<Page /> }/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
