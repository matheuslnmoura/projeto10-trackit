import styled from "styled-components"
import "../assets/styles/style.css" //importing general CSS file
import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { ThreeDots } from  'react-loader-spinner'

import UserContext from "../context/UserContext"


function Footer(){
    const {userInfo, setUserInfo, buttonActive, setButtonActive} = useContext(UserContext)

    return(
        <FooterContainer>
            <FlexContainer >
                <Link to="/habitos"><span>Hábitos</span></Link>
                <Link to="/hoje"><div>Hoje</div></Link>
                <Link to="/historico"><span>Histórico</span></Link>
            </FlexContainer>

        </FooterContainer>
    )
}

const FooterContainer = styled.footer`
    width: 100%;
    height: 70px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: var(--main-color);
    display: flex;
    justify-content: center;
    align-items: center;
`

const FlexContainer = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;

`

export default Footer