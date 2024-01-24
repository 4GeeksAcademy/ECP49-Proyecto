import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";

export const Private = () => {
  const { actions } = useContext(Context);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await actions.getToken();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      {/* <p>User Id: {user.email}</p> */}
      {/* <p>User Username: {user.email}</p> */}
    </div>
  );
};