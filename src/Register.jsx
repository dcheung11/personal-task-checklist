import React, { useState } from "react";
import { getUsers, signup } from "./api/users/users";

export const Register = (props) => {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [message, setMessage] =  useState()

    const handleSubmit = async (e) => {
      e.preventDefault();
      const a = await signup({name: username, password: password});
      let msg = a.data ? a.data.message : (a.message ? a.message : '' )
  
      if (a.data) {
        msg = a.data.message;
        setMessage(msg)
        console.log(a.data.user)
        props.setUser(a.data.user)
      }
      else {
        msg = (a.message ? a.message : 'Error' )
      }
      setMessage(msg)
    }
    return (
        <div className="auth-form-container">
        <h2>
          Register
        </h2>
        <form className="form" onSubmit={handleSubmit}>
          <label for="username"> Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" id="password" name="password"/>
          <label for="password"> Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="*******" id="password" name="password"/>
          <button type="submit"> Register </button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch("login")}> Already have an account? Login here.</button>
        </div>
      );
  };