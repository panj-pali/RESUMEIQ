import React, { useState }  from 'react'
import"../auth.form.scss"
 import { useNavigate } from 'react-router'
import { Link } from "react-router";
import { useAuth } from '../hooks/useAuth';


const Login= () => {

  const{loading, handleLogin}=useAuth()
const  navigate=useNavigate()


     const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const result = await handleLogin({ email, password });

    if (result) {
      navigate("/");
    }
  } catch (error) {
    console.log("Login failed:", error);
  }
};


if(loading){
  return (<main><h1>Loading........</h1></main>)
}


  return (
     <main>
      <div className="form-conter">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>

        <div className="input-group">
          <label htmlFor="email">Email</label> 
          <input    onChange={(e) => { setEmail(e.target.value) }}
          
          type='email' id='email' name='email' placeholder='enter your email'/>
        </div>

    <br />
        
        <div className="input-group">
          <label htmlFor="password">password</label>  
          
          <input    onChange={(e) => { setPassword(e.target.value) }}
            type='password' id='password' name='password' placeholder='enter your password'/>
        </div>

        <br />

        <button className='button primary-button'>Login</button>

     


        </form>
        <p>
    Don't have an account?<Link to="/register">Register</Link>
</p>
      </div>
     </main>
  )
}

export default Login