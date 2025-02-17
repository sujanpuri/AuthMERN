import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user", {
          withCredentials: true,
        });

        const data = await response.data; // ✅ Correct way to get response data

        if (data.status) {
          setName(data.name);
          setEmail(data.email);
        } else {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("❌ Error fetching user data:", err);
        alert("Error fetching user details!");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    };

    fetchUserData();
  }, []);

  const handleLogOut= async ()=>{
    try {
      const response = await axios.delete("http://localhost:8080/logout", {
        withCredentials: true,
      })
      const data = response.status;
      if(data){
        alert("logout successful");
        window.location.href="/login";
      }else{
        alert("Logout unsuccessfull")
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div>
      Welcome {name}, email: {email}.

      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default Page;
