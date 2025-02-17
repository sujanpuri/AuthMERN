import axios from "axios";
import React, { useEffect } from "react";

const Admin = () => {
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin", {
          withCredentials: true,
        });

        const data = response.data; // ✅ Correct way to get response data
        if(!data.status){
          alert(data.message)       //if status in the "/admin backend" is false throw it to login page.
          window.location.href="/login"
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  return <div>This is Admin Page</div>;
};

export default Admin;
