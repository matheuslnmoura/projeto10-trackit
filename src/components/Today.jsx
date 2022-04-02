import styled from "styled-components"
import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { ThreeDots } from  'react-loader-spinner'
import dayjs from 'dayjs'

import UserContext from "../context/UserContext"
import "../assets/styles/style.css" //importing general CSS file

import Header from "./Header";
import Footer from "./Footer"
// import Logo from "./Logo"
// import Input from "./Input"
// import Button from "./Button"

export default function Today() {
    const navigate = useNavigate()
    const {userInfo, setUserInfo} = useContext(UserContext)
    const {loginResponse} = userInfo
    const {token} = loginResponse
    const [todayHabits, setTodayHabits] = useState([])
    const customParseFormat = require('dayjs/plugin/customParseFormat')


    useEffect(()=>{
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        const request = axios.get(URL, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        request.then((response)=>{
            setTodayHabits([response.data])
        })
    }, [])

    return(
        <TodayPage>
            <Header />
            <HandleDate />
            <HandleTodaysHabits response = {todayHabits} />
            <Footer />
        </TodayPage>
    )
}





function HandleTodaysHabits(props){
    const {response} = props
    
    if(response !== undefined){
        return (
            <>
            <h1>Você não tem hábitos programados pra hoje :(</h1>
            </>
        )
    } else {
        console.log("Entrou nessa porra de else do caralho")
        return (
            <>
            </>
        )
    }

}


function HandleDate() {
    let month = dayjs().get('month') // start 0
    month ++

    if(month < 10) {
        month = `0${month}`
    }
    
    let weekDay = dayjs().get('day')

    switch(weekDay){
        case 0:
            weekDay = "Domingo"
            break
        case 1:
            weekDay = "Segunda"
            break
        
        case 2:
            weekDay = "Terça"
            break
            
        case 3:
            weekDay = "Quarta"
            break
            
        case 4:
            weekDay = "Quinta"
            break
            
        case 5:
            weekDay = "Sexta"
            break
            
        case 6:
            weekDay = "Sábado"
            break
                
    }

    let date = dayjs().get('date')

    let dateObject = {month, weekDay, date}

    return (
        <p>{weekDay}, {date}/{month}</p>
    )
}

const TodayPage = styled.section`
    width: 100%;
    height: calc(100vh - 140px);
    height: fit-content;
    background-color: #ccc;

`


