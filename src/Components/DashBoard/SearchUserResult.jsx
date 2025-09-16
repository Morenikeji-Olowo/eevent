import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

const SearchUserResult = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost/React/eevent/src/BackEnd/src/Explore/findUsers.php?q=${userId}`);
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      <h2>SearchUserResult for user ID: {userId}</h2>
      {userData && (
        <div>
          <h3>User Information:</h3>
          <p>ID: {userData.id}</p>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
};

export default SearchUserResult;

     
