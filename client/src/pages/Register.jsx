import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Logo from "../assets/logoo.svg"
function Register() {
  const handleSubmit = (e)=>{
    e.preventDefault();
    alert("form")
  }
  const handleChange = (e)=>{

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
background-color:#131324;
  .brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
      height:5rem;

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
      padding: 1rem 2rem
      border:none;
      border-radius:0.4rem;
      cursor:pointer;
      font-size:1rem;

    }


}
`
export default Register