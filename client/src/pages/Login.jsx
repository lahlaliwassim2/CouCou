import { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Logo from "../assets/logoo.svg"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes'
function Login() {
  const navigate = useNavigate()
  const [values,setValues]=useState({
    username: "",
    password: "",

  })
  const toastoptions = {
    position: "bottom-right",
    autoClose:8000,
    pauseOnHover: true,
    draggable:true,
    theme: "dark"
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if( handleValidation()){
      const {username,password} = values;
      const { data } = await axios.post(registerRoute,{
        username,
        password
      })
      if(data.status === false){
        toast.error(data.msg,toastoptions)
      }
      if(data.status === true){
        localStorage.setItem("chat-app-user",JSON.stringify(data.user))
      }
      navigate('/')
    }
  }
  const handleValidation = ()=>{
    const {username,password} = values;
    if (username.length < 3){
      toast.error("entrer un nom valable",toastoptions)
      return false
    }else if(password ===""){
      toast.error("entrer votre email",toastoptions)
      return false
    }
    return true
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
        <input type="password" placeholder='Password' name='password' onChange={e=>handleChange(e)}/>
        <button type='submit'>Se connecter</button>
        <span>Vous n'avez pas un compte ? <Link to="/register">Register</Link> </span>
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
export default Login