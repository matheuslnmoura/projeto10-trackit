import styled from "styled-components"
import { useContext } from "react";


import "../assets/styles/style.css" //importing general CSS file

import UserContext from "../context/UserContext"

export default function Input(props){
    const {type, id, placeholder, value} = props
    const {userInfo, setUserInfo, inputButtonActive} = useContext(UserContext)

    
    let inputOpacity = 1

    if (inputButtonActive === "disabled") {
        inputOpacity = 0.7
    }

    return(
        <InputsContainer opacity = {inputOpacity}>
            <input type={type} 
            placeholder = {placeholder} 
            id = {id} 
            value = {value}
            disabled = {inputButtonActive}
            onChange={(event)=>{
                switch(id){
                    case "email":
                        setUserInfo({...userInfo, email: event.target.value})
                        break
                    
                    case "password":
                        setUserInfo({...userInfo, password: event.target.value})
                        break
                                            
                    case "name":
                        setUserInfo({...userInfo, name: event.target.value})
                        break
                                            
                    case "image":
                        setUserInfo({...userInfo, image: event.target.value})
                        break

                    default:
                }

            }} />
        </InputsContainer>
    )
}

const InputsContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input{
        width: 100%;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        margin-bottom: 10px;
        opacity: ${props=>props.opacity}
    }
    
    input:focus{
        outline: 2px solid var(--button-color);
    }

    input::-webkit-input-placeholder { /* Edge */
        padding-left: 11px;
        color: #DBDBDB;
    }

    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        padding-left: 11px;
        color: #DBDBDB;
    }

    input::placeholder {
        padding-left: 11px;
        color: #DBDBDB;
    }


`