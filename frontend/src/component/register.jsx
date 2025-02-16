import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      console.log("signup Clicked");
      
      const response = await axios.post("http://localhost:8080/register", { name, password });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Register</button>
    </div>
  );
};

export default Signup;