import styled from "styled-components"
import { Link } from "react-router-dom"
import {useState, useContext, useEffect} from "react"
import axios from 'axios'

import UserContext from "../context/UserContext"
import HabitsContext from "../context/HabitsContex"
import "../assets/styles/style.css" //importing general CSS file

import Header from "./Header"
import Footer from "./Footer"
import CreateHabit from "./CreateHabit"
import ListHabits from "./ListHabits"
// import Logo from "./Logo"
// import Button from "./Button"



export default function Habits() {
    const [callHabits, setCallHabits] = useState([])
    const [createHabitVisibility, setCreateHabitVisibility] = useState(false)
    const [listOfHabits, setListOfHabits] = useState([])
    const {userInfo, setUserInfo} = useContext(UserContext)
    const {loginResponse} = userInfo
    const {token} = loginResponse

    console.log("chamou Habits")

    useEffect(()=>{
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const request = axios.get(URL, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        request.then((response)=>{
            setListOfHabits([...response.data])
        })
    },[])

    return(
        <HabitsContext.Provider value = {{
                createHabitVisibility, 
                setCreateHabitVisibility, 
                listOfHabits, 
                setListOfHabits, 
                userInfo, 
                setUserInfo, 
                loginResponse, 
                token,
                setCallHabits
            }}>
            <HabitsPage>
                <Header />
                <HabitsContainer>
                    <Top >
                        <p>Meus hábitos</p>
                        <button onClick={()=>{
                            setCreateHabitVisibility(!createHabitVisibility)
                        }}><span>{createHabitVisibility ? "-" : "+"}</span></button>
                    </Top>

                    <CreateHabit />

                    <ListHabits listOfHabits = {listOfHabits} setListOfHabits = {setListOfHabits} token = {token} />

                </HabitsContainer>
                <Footer />
            </HabitsPage>
        </HabitsContext.Provider>
    )
}



/* STYLES */



const HabitsPage = styled.section`
    width: 100%;
    height: calc(100vh - 140px);
    background-color: #E5E5E5;
    display: flex;
    justify-content: center;
    overflow-y: scroll;

`

const HabitsContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

`

const Top = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 22px;

    p{
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

    button{
        width: 40px;
        height: 35px;
        background: var(--button-color);
        color: var(--white-color);
        border: none;
        border-radius: 4.63636px; 
        font-size: 27px;
        display: flex;
        justify-content: center;
        align-items: center;    
        text-align: center;
        position: relative;
    }

    button span {
        height: fit-content;
        position: relative;
        bottom: 2px;
    }

`



