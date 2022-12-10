import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { allUserRoute} from "../utils/APIRoutes"
function Chat() {
const navigate = useNavigate();
const [contacts , setContacts]= useState([]);
const [currentUser , setcurrentUser]= useState(undefined);
useEffect(()=>{
  const CurentFct = async()=>{
    if(!localStorage.getItem("chat-app-user")){
      navigate('/login')
    } else {
      setcurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
    }
  }
  CurentFct()
},[])
useEffect(()=>{
  const funct = async()=>{
    if(currentUser) {
      if(currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
        setContacts(data.data)
      }else {
        navigate("/setAvatar")
      }
    }
}
funct()
},[currentUser])
  return (
    <Container>
      <div className="container"></div>
    </Container>
  )
}

const Container = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction: colomn;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;
.container{
  height:85vh;
  width:85vw;
  background-color:#00000076;
  display:drid;
  grid-template-colomns:25% 75%;
  
}
`
export default Chat