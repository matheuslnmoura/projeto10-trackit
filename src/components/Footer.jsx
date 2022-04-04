import styled from "styled-components"
import "../assets/styles/style.css" //importing general CSS file
import { useContext } from "react"
import { Link } from "react-router-dom"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import UserContext from "../context/UserContext"


function Footer(){
    const {habitsPercentage} = useContext(UserContext)

    function ProgressButton() {
        return(
            <ProgressBar>
                <CircularProgressbar 
                    value = {habitsPercentage} 
                    text = {"Hoje"} 
                    styles={buildStyles({
                        pathColor: "#fff",
                        textColor: '#fff',
                        trailColor: 'transparent'
                    })}
                />
            </ProgressBar>
        )
    }

    return(
        <FooterContainer>
            <FlexContainer >
                <Link to="/habitos"><span>Hábitos</span></Link>
                <Link to="/hoje"><ProgressButton /></Link>
                <Link to="/historico"><span>Histórico</span></Link>
            </FlexContainer>

        </FooterContainer>
    )
}


const FooterContainer = styled.footer`
    width: 100%;
    max-width: 450px;
    height: 70px;
    position: fixed;
    bottom: 0;
    left: auto;
    background-color: var(--white-color);
    display: flex;
    justify-content: center;
    align-items: center;
`

const FlexContainer = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    a {
        text-decoration: none;
        color: var(--button-color)
    }
`

const ProgressBar = styled.div`
    width: 91px;
    height: 91px;
    padding: 5px;
    position: relative;
    bottom: 20px;
    background-color: var(--button-color);
    border-radius: 50%;
`

export default Footer