import React from 'react'
import { useNavigate } from 'react-router'
import { Link } from "react-router";

const Register= () => {

  const navigate =useNavigate()




  const handleSubmit = (e) => {
  e.preventDefault()
}

  return (
      <main>
      <div className="form-conter">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

        <div className="input-group">
          <label htmlFor="email">Email</label> 
          <input type='email' id='email' name='email' placeholder='enter your email'/>
        </div>


    

         <div className="input-group">
          <label htmlFor="username">username</label> 
          <input type='text' id='username' name='username' placeholder='enter your username'/>
        </div>
        
        <div className="input-group">
          <label htmlFor="password">password</label>  
          
          <input type='password' id='password' name='password' placeholder='enter your password'/>
        </div>

        <br />

        <button className='button primary-button'>Register</button>

     


        </form>

<p>
  Already have account? <Link to="/login">Login</Link>
</p>

      </div>
     </main>
  )
}

export default Register