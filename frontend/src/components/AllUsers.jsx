import React, { useEffect, useState } from "react";

function AllUsers() {
  const [allusers, setAllUsers] = useState([]);

  const allUser = async () =>{
    try {
        const res = await fetch(`http://localhost:4000/admin/allsuer`,{
            method : "GET",
            credentials : "include",
            headers : {
                "Content-Type" : "application/json"
            }
        })

        const data = await res.json()
        if(data.success){
          setAllUsers(data.users)
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    allUser();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allusers.map((user, index) => {
          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {user.fullname || "Unknown User"}
              </h2>
              <h2 className="text-lg font-semibold text-gray-800">
                {user._id || "Unknown User"}
              </h2>
              <p className="text-sm text-gray-600">
                {user.email || "No Email"}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Role: {user.type || "User"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllUsers;
