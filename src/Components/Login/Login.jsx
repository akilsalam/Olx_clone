import React, { useState,useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import {useHistory} from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {firebase} = useContext(FirebaseContext)
  const history = useHistory()
  const handleSubmit = (e) =>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push('/')
    }).catch((error)=>{
      alert(error.message)
    })
  }
  return (
    <div className='m-2'>
      <div className="loginParentDiv" >
      <div className="logo">

  <img width="200px" height="200px" src={Logo} alt="Logo" />
</div>
        <form onSubmit={handleSubmit}>
      <h4 className='text-center text-dark '>LogIn to your account</h4>

          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input "
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a className='signupOption' style={{textDecoration:'none',cursor:'auto'}}>Create new Account</a>
        <Link to={'/signup'}>
        SignUp
        </Link>
      </div>
    </div>
  );
}

export default Login;
