import React, { useState } from 'react'

const host = "http://localhost:5000";
const Logindo = () => {
  const [credentials,setCredentials]=useState({email:"",password:""});
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  
  const handleSubmit =async (e)=>{
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({email:credentials.email,password: credentials.password})
    });
    const json= await response.json();
    console.log(json.authToken);
    if(json.success){
      //redirect ans save the auth token;
      localStorage.setItem('token', json.authToken);
      window.location.href = "/";
    }
    else{
      alert("Invalid Credentials");
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" placeholder="name@domain.com" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password" placeholder="Enter a strong password" />
      </div>
      <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Logindo
