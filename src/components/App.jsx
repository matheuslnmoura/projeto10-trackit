import "../assets/styles/style.css" //importing general CSS file
import styled from 'styled-components'
import { useState } from "react"
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import UserContext from "../context/UserContext"
import SignIn from "./SignUp"
import Login from "./Login"
import Today from "./Today"
import Habits from "./Habits"
import History from "./History"

import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {
    const [userInfo, setUserInfo] = useState({isSigningUp: false, email:"", name: "", image: "", password:""})
    const [habitsPercentage, setHabitsPercentage] = useState(0)
    // const [userResponseData, setUserResponseData] = useState({})
    const [buttonActive, setButtonActive] = useState(true)

    return (
        <UserContext.Provider value = {{userInfo, setUserInfo, buttonActive, setButtonActive, habitsPercentage, setHabitsPercentage}}>
            <Main > 
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element = {<Login />} />
                        <Route path="/cadastro" element = {<SignIn />} />
                        <Route path="/hoje" element = {<Today />} />
                        <Route path="/habitos" element = {<Habits />} />
                        <Route path="/historico" element = {<History />} />
                    </Routes>
                </BrowserRouter>
            </Main >
        </UserContext.Provider>
    )
}


const Main = styled.main`
    width: 100vw;
    max-width: 450px;
    height: 100vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
