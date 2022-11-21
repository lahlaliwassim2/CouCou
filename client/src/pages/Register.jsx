import { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Logo from "../assets/logoo.svg"
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function Register() {
  const [values,setValues]=useState({
    username: "",
    email: "",
    passord: "",
    confirmPassword: ""
  })
  const handleSubmit = (e)=>{
    e.preventDefault();
    handleValidation()
  }
  const handleValidation = ()=>{
    const {username,email,passord,confirmPassword} = values;
    if(passord!==confirmPassword){
      toast.error("password and confirm password not match",{
        position: "bottom-right",
        autoClose:8000,
        pauseOnHover: true,
        draggable:true,
        theme: "dark"
      })
    }
  }
  const handleChange = (e)=>{
          setValues({...values, [e.target.name]:e.target.value })
  }
  return (
    
    <>
    <FormContainer>
      <form  onSubmit={(e)=> handleSubmit(e)}>
        <div  className='brand'>
          <img src={ Logo } alt="logo" />
          <h1>CouCou</h1>
        </div>
        <input type="text" placeholder='Username' name='username' onChange={e=>handleChange(e)}/>
        <input type="email" placeholder='Email' name='email' onChange={e=>handleChange(e)}/>
        <input type="password" placeholder='Password' name='password' onChange={e=>handleChange(e)}/>
        <input type="password" placeholder='ConfirmPassword' name='confirmPassword' onChange={e=>handleChange(e)}/>
        <button type='submit'>Créer un compte</button>
        <span>Vous avez deja un compte ? <Link to="/login">Login</Link> </span>
      </form>
    </FormContainer>
    <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
height: 100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#909EC1;
  .brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
      height:2.5rem;

    }
    h1{
      color:white;
      text-transform:uppercase;

    }
  }
  form{display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
      background-color:transparent;
      padding:1rem;
      border-radius:0.4rem;
      color:white;
      width:100%;
      font-size:1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline:none;
      }

    }
    button {
      background-color:#997af0;
      color:white;
      padding: 0.5rem 1rem
      border:none;
      border-radius: 0.4rem;
      cursor:pointer;
      font-size:1rem;
      height:25px;
      transition:0.5s ease-in-out;
      &:hover {
        background-color:#4e0eff;
      }
    }

    span {
      color:white;
      a{
        color:#4e0eff;
        text-decoration:none;
        font-weight:bold;
      }
    }

}
`
export default Register