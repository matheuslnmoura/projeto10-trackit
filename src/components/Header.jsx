import styled from "styled-components"
import "../assets/styles/style.css" //importing general CSS file
import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { ThreeDots } from  'react-loader-spinner'

import UserContext from "../context/UserContext"


function Header(){
    const {userInfo, setUserInfo, buttonActive, setButtonActive} = useContext(UserContext)
    const {loginResponse} = userInfo
    const {name, image} = loginResponse
    return(
        <HeaderContainer>
            <FlexContainer image = {image}>
                <p>Trackit</p>
                <div>
                    {/* <img src = {image} alt = {`${name} Profile Image`}></img> */}
                </div>
            </FlexContainer>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header `
    width: 100%;
    max-width: 450px;
    height: 70px;
    background-color: var(--main-color);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: auto;
    top: 0;

`

const FlexContainer = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p{
        font-family: 'Playball', cursive;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: var(--white-color);
        margin: 0;
    }

    div {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        background-color: #CCC;
        background-image: url(${props => props.image});
        background-size: cover;
        background-position: center;

    }
`
export default Header