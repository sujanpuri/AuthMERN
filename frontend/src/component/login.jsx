import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [name, setName] = useState("sujan");
  const [email, setEmail] = useState("sujan@gmail.com");
  const [password, setPassword] = useState("sujan123");

  const handleLogin = async () => {
    try {
      //sends the login data to the backend "/login"
      const response = await axios.post(    
        "http://localhost:8080/login",
        { name, email, password },
        { withCredentials: true }    //for cookies transfer betwn frontend & backend
      );
      window.location.href = "/page";   //direct the user to "/page"
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
