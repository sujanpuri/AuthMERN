import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetching the user data on Page Load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // sends a GET request to fetch user data from "/user"
        const response = await axios.get("http://localhost:8080/user", {
          withCredentials: true,
        });

        const data = await response.data;

        if (data.status) {    //
          setName(data.name);
          setEmail(data.email);   //set Db data into state.
        } else {
          alert("Session expired. Please log in again.");
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("❌ Error fetching user data:", err);
        alert("Error fetching user details!");
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
      <hr/>
      Welcome <strong>{name}</strong>, email: <strong>{email}</strong>.
      <br/>
      <hr/>

      <button onClick={handleLogOut}>Log Out</button>

      <br/>
      
    </div>
  );
};

export default Page;
