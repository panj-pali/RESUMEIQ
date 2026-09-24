
import React, {useState} from 'react'
import { useNavigate } from 'react-router'
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth"

const Register= () => {

  const navigate =useNavigate()
   const [ name, setname ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")



    const {loading,handleRegister} = useAuth()

  const handleSubmit = async(e) => {
  e.preventDefault()
   await handleRegister({name,email,password})
        navigate("/")
}







  return (
      <main>
      <div className="form-conter">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

        <div className="input-group">
          <label htmlFor="email">Email</label> 
          <input 
              onChange={(e) => { setEmail(e.target.value) }}
          type='email' id='email' name='email' placeholder='enter your email'/>
        </div>


    

         <div className="input-group">
          <label htmlFor="name">name</label> 
          <input
             onChange={(e) => { setname(e.target.value) }}
           type='text' id='name' name='name' placeholder='enter your name'/>
        </div>
        
        <div className="input-group">
          <label htmlFor="password">password</label>  
          
          <input
           onChange={(e) => { setPassword(e.target.value) }}
          type='password' id='password' name='password' placeholder='enter your password'/>
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