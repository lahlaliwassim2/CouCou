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
    useEffect( ()=>{
      if(!localStorage.getItem("chat-app-user")){
        navigate('/login')
      }
    },[])
    const setProfilPicture = async ()=>{
      if(selectedtAvatar === undefined){
        toast.error("choix de avatar obligatoire",toastoptions)
      }else{
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
          image : avatars[selectedtAvatar]
        })
        if(data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("chat-app-user",JSON.stringify(user))
          navigate('/')
        }else{
          toast.error('erreur d chargement de avatar . ',toastoptions)
        }
      }
    };
    useEffect (()=>{
      const loadData = async () => {
      const data = []
      for(let i = 0; i < 5; i++){
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
    {
      isLoading ? <Container>
        <img src={loader} alt="chargement de page" className='load' />
      </Container> : (
    
 <Container>
          <div className="title-container">
            <h1>choisissez votre avatar </h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedtAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setselectedtAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilPicture} className="submit-btn"> 
              Commencer
          </button> 
          <ToastContainer />
        </Container>
       ) }
      <ToastContainer />
    </>
    
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #000;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;