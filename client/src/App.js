import React, { useState } from "react";
import LoginForm from "./Components/LoginForm";
import "./index.css";
// SERVICES THAT CALL OUR API ENDPOINTS
// import { getAllProfiles } from "./services/profileService";

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const Login = async (details) => {
    console.log("details", details);

    // if(details.email === adminUser.email && details.password === adminUser.password){
    //   console.log("Logged in");
    //   setUser({
    //     name: details.name,
    //     email:details.email
    //   })}
    //   else {
    //   console.log("Details do not match!");
    //   setError("Details do not match!");
    // }

    let formData = new FormData();
    formData.append("name", "John");
    formData.append("password", "John123");

    try {
      const repsonse = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        body: JSON.stringify({
          username: details.name,
          email: details.email,
          password: details.password,
        }),
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log("repsonse", repsonse);
    } catch (error) {
      console.log("error", error);
    }
  };

  const Logout = () => {
    setUser({ name: "", email: "" });
  };

  return (
    <div className="App">
      {user.email !== "" ? (
        <div className="welcome">
          <h2>
            Welcome, <span>{user.name}</span>
          </h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
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
