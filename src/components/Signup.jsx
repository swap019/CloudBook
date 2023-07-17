import React, { useState } from 'react'
const host = "http://localhost:5000";
const Signup = () => {

  const [credentials, setCredentials] = useState({ name:"", email: "", password: "",cpassword:"" });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect ans save the auth token;
      localStorage.setItem('token', json.authToken);
      window.location.href = "/home";
    }
    else {
      alert("Invalid Credentials");
    }
  }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Username</label>
            <input type="name" className="form-control" id="name" value={credentials.name} onChange={onChange} name="name" placeholder="Enter Your Name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" placeholder="name@domain.com" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password" placeholder="Enter a strong password" minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={credentials.cpassword} onChange={onChange} name="cpassword" placeholder="Enter a strong password" minLength={5} required/>
          </div>
          <button type="submit" className="btn btn-primary" disabled={credentials.password!==credentials.cpassword  || credentials.name.length===0} >SignUp</button>
        </form>
      </div>
    )
  }

export default Signup
