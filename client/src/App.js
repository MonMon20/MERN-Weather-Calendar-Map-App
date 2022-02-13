import React, { useState, useEffect } from "react";
import LoginForm from  "./Components/LoginForm"
// SERVICES THAT CALL OUR API ENDPOINTS
import { getAllProfiles } from "./services/profileService";

function App() {
  const adminUser = {
    email:"admin@admin.com",
    passwords:"admin123"
  }

  const [user, setUser] = useState({name: "", email: "" })
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);
  }
  const Logout =() => {
    console.log("Logout");
  }
  
  return (
      <div className = "App">
        {(user.email !== "") ? (
          <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button>Logout</button>
          </div>
        ): (
          <LoginForm Login={Login} error={error} />
        )}
      </div>
  
  );
}








// function App() {
//   const [profiles, setProfiles] = useState(null);

//   useEffect(() => {
//     async function getProfiles() {
//       if (!profiles) {
//         const response = await getAllProfiles();
//         setProfiles(response);
//       }
//     }

//     getProfiles();
//   }, [profiles]);

//   const renderProfile = (user) => {
//     return (
//       <li key={user._id}>
//         <h3>
//           {`${user.first_name} 
//           ${user.last_name}`}
//         </h3>
//         <p>{user.location}</p>
//       </li>
//     );
//   };

//   return (
//     <div>
//       <ul>
//         {profiles && profiles.length > 0 ? (
//           profiles.map((profile) => renderProfile(profile))
//         ) : (
//           <p>No profiles found</p>
//         )}
//       </ul>
//     </div>
//   );
// }

export default App;
