import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login"; // Redirect if no token
      return;
    }

    axios
      .get("http://localhost:8080/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data;
        if (data.status) {
          setName(data.name);
        } else {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.error("❌ Error fetching user data:", error);
        alert("Error fetching user details!");
      });
  }, []); // Runs only once when the component mounts

  return (
    <div>
      Welcome, {name}.
    </div>
  );
};

export default Page;
