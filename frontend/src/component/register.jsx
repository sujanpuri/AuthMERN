import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      //sending data using axios to backend "/register"
      const response = await axios.post(
        "http://localhost:8080/register",
        { name, email, password },
        { withCredentials: true }   //req for transfer of cookies betn frontend & backend
      );

      //the data sent from the backend is stored in "response"
      const data = response.data.status;  
      if (data===true) window.location.href = "/page";   //directs to the "/page" after signup 

    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
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
      <button onClick={handleSignup}>Register</button>
    </div>
  );
};

export default Signup;
