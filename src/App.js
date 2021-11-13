import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [usernamereg, setUsernamereg] = useState("");
  const [passwordreg, setPasswordreg] = useState("");
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  axios.defaults.withCredentials = true;

  const register = () => {
    axios.post("/register", { username: usernamereg, password: passwordreg })
    .then((response)=>{
      console.log(response);
    })
  }
 
  const login = ()=>{
    axios.post("/login", { username, password})
    .then((response)=>{
      if(response.data.message) setLoginStatus(response.data.message);
      else setLoginStatus(response.data[0].username);
    })
  }

  useEffect(() => {
    
    axios.get("login").then((response)=>{
      if(response.data.loggedIn)
      setLoginStatus(response.data.user[0].username);
    })
    
  }, []) 

  return (
    <div className="App">

      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label><input type="text" onChange={(e) => setUsernamereg(e.target.value)} /><br />
        <label>Password</label><input type="text" onChange={(e) => setPasswordreg(e.target.value)} /><br />
        <button onClick={register}>Register</button>
      </div>
      <hr />
      <div className="login">
        <h1>Login</h1>
        <label>Username</label><input type="text" placeholder="Username ..." onChange={(e) => setUsername(e.target.value)} /><br />
        <label>Password</label><input type="text" placeholder="Password ..." onChange={(e) => setPassword(e.target.value)} /><br />
        <button onClick={login}>Login</button>
        <h2>{loginStatus}</h2>
      </div>

    </div>
  );
}

export default App;
