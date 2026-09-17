import React from 'react'
import"../auth.form.scss"
// import { useNavigate } from 'react-router'
import { Link } from "react-router";

const Login= () => {

const handleSubmit = (e) => {
  e.preventDefault()
}

  return (
     <main>
      <div className="form-conter">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>

        <div className="input-group">
          <label htmlFor="email">Email</label> 
          <input type='email' id='email' name='email' placeholder='enter your email'/>
        </div>

    <br />
        
        <div className="input-group">
          <label htmlFor="password">password</label>  
          
          <input type='password' id='password' name='password' placeholder='enter your password'/>
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