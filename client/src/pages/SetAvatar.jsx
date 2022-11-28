import { useState,useEffect } from 'react'
import styled from 'styled-components'
import loader from "../assets/loader.gif"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from 'buffer'
import axios from 'axios'
import { setAvatarRoute } from '../utils/APIRoutes'

export default function SetAvatar() {

    const api = "https://api.multiavatar.com/45678945"
    const navigate = useNavigate()
    const [avatars,setAvatars]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [selectedtAvatar,setselectedtAvatar]=useState(undefined)
    const toastoptions = {
      position: "bottom-right",
      autoClose:8000,
      pauseOnHover: true,
      draggable:true,
      theme: "dark"
    };
    const setProfilPicture = async ()=>{};
    useEffect (()=>{
      const loadData = async () => {
      const data = []
      for(let i = 0; i < 4; i++){
        const image = await  axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
          )
        const buffer = new Buffer(image.data)
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false)
    }
    loadData()
    },[]) 
  return (
    <>
      <Container>
        <div className="title-container">
          <h1>choisir votre avatar</h1>
        </div>
        <div className="avatars">
          {
            avatars.map((avatar,index)=>{
              return (
                
                <div 
                key={index}
                className={`avatar ${selectedtAvatar === index ? "selected" : ""
                }`}
                >
                  <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
                </div>
              )
            })
          }
        </div>
      </Container>
      <ToastContainer />
    </>
    
  )
}
const Container = styled.div``;
