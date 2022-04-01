import styled from "styled-components"
import "../assets/styles/style.css" //importing general CSS file
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { ThreeDots } from  'react-loader-spinner'

import UserContext from "../context/UserContext"

export default function Button(props) {
    const navigate = useNavigate()
    const {buttonText, to, action} = props
    const {userInfo, setUserInfo, buttonActive, setButtonActive} = useContext(UserContext)
    const {isSigningUp, email, name, image, password} = userInfo
    const [buttonStyle, setButtonStyle] = useState({content: buttonText, opacity: 1})

    function handleButtonStatus() {
        if(buttonActive === true) {
            setButtonActive(false)
            setButtonStyle({content: <ThreeDots color="#fff" height={40} width={40} />, opacity: 0.7})
        } else {
            setButtonActive(true)
            setButtonStyle({content: buttonText, opacity: 1})
        }
    }

    function validadeLoginInfos() {
        if(!(email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))) {
            alert("Email inválido")
        } else if (password.length === 0) {
            alert("Digite uma senha!")
        } else {
            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"
            const signUpObject = {
                email,
                password,
            }

            handleButtonStatus()


            const request = axios.post(URL, signUpObject)
            request.then((response)=>{
                const loginResponse = response.data
                setUserInfo({loginResponse})
                navigate(to)
            })
            request.catch((error)=>{
                alert(error.response.data.message)
                // setUserInfo({isSigningUp: false, email:"", name: "", image: "", password:""})
            })
        }
 
    }

    function validateSingUpInfos(){
        if(!(email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))) {
            alert("Email inválido")
        } else if (password.length === 0) {
            alert("Digite uma senha!")
        } else if(name.length === 0) {
            alert("Digite o seu nome!")
        } else if(!(image.match(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/))){
            alert("Escolha uma URL Válida")
        } else {
            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"
            const signUpObject = {
                email,
                password,
                name,
                image
            }

            handleButtonStatus()

            const request = axios.post(URL, signUpObject)
            request.then((response)=>{
                navigate(to)
            })
            request.catch((error)=>{
                alert(error.response.data.message)
                setUserInfo({isSigningUp: false, email:"", name: "", image: "", password:""})
            })
        }
        
    }

    return(
        <ButtonContainer opacity = {buttonStyle.opacity}>
            <button onClick={()=>{
                if(action === "login") {
                    validadeLoginInfos()
                } else if(action === "signup") {
                    validateSingUpInfos()
                } 
                
                }}>{buttonStyle.content}</button>
        </ButtonContainer>
    )
} 

const ButtonContainer = styled.div`
    width: 100%;
    height: 45px;

    button{
        width: 100%;
        height: 100%;
        color: #FFF;
        background-color: var(--button-color);
        opacity: ${props => props.opacity};
        border: none;
        border-radius: 5px;
        font-size: 21px;
    }

    button div {
        display: flex;
        justify-content: center;
    }

`

