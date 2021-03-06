import styled from "styled-components"
import { useState, useEffect, useContext } from "react"
import axios from 'axios'
import dayjs from 'dayjs'
import {BsCheckLg} from 'react-icons/bs'

import ProgressContext from "../context/ProgressContext"
import UserContext from "../context/UserContext"
import "../assets/styles/style.css"

import Header from "./Header"
import Footer from "./Footer"

export default function Today() {
    const {userInfo, habitsPercentage, setHabitsPercentage} = useContext(UserContext)
    const {loginResponse} = userInfo
    const {token} = loginResponse
    const [todayHabits, setTodayHabits] = useState([])
    const [concludedHabits, setConcludedHabits] = useState([])
    // const [habitsPercentage, setHabitsPercentage] = useState(0)
    const [renderControl, setRendercontrol] = useState([])
    
    useEffect(()=>{
        let habitsPercentageValue = Math.round((concludedHabits.length / todayHabits.length) * 100)
        setHabitsPercentage(habitsPercentageValue)

    },[concludedHabits])
    
    useEffect(()=>{
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        const request = axios.get(URL, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        request.then((response)=>{
            setTodayHabits([...response.data])
        })
    }, [renderControl])

    return(
        <ProgressContext.Provider value={{
            todayHabits, 
            setTodayHabits, 
            concludedHabits, 
            setConcludedHabits, 
            habitsPercentage, 
            setHabitsPercentage,
            token,
            setRendercontrol
        }}>
            <TodayPage>
                <Header />
                <PageContainer>
                    <HandleDate />
                    <ListOfHabitsContainer>
                        <HandleTodaysHabits todayHabits = {todayHabits} />
                    </ListOfHabitsContainer>
                </PageContainer>
                <Footer />
            </TodayPage>
        </ProgressContext.Provider>
    )
}

function HandleTodaysHabits(props){
    const {concludedHabits, setConcludedHabits, token, setRendercontrol} = useContext(ProgressContext)
    let {todayHabits} = props

    useEffect(()=>{
        const idsControlArr = []
        todayHabits.forEach(habit=>{
            if(habit.done === true ) {
                idsControlArr.push(habit.id)
            }  
        })
        setConcludedHabits([...idsControlArr])
    },[todayHabits])

    
    if(todayHabits.length === 0){

        return (
            <>
                <h1>Voc?? n??o tem h??bitos programados pra hoje :(</h1>
            </>
        )
    } else {

        return (
            <>
                {todayHabits.map(habit=>{
                    let buttonColor = "#EBEBEB"
                    let sequencesColor = "#666666"
                    habit.done ? buttonColor = "#8FC549" : buttonColor = "#EBEBEB"
                    habit.currentSequence === habit.highestSequence && habit.currentSequence > 0 ? sequencesColor = "#8FC549" : sequencesColor = "#666666"
                    return (
                        <HabitContainer key = {habit.name + habit.id}>
                            <FlexContainer>
                                <Info color = {sequencesColor}>
                                    <span>{habit.name}</span>
                                    <p>Sequ??ncia atual: {habit.currentSequence}</p>
                                    <p>Seu recorde: {habit.highestSequence}</p>
                                </Info>
                                <CheckHabit onClick={()=>{
                                    toggleHabitStatus(habit, token, todayHabits)
                                }} buttonColor = {buttonColor} >
                                    <BsCheckLg fontSize={34} color={"#fff"} />
                                </CheckHabit>
                            </FlexContainer>
                        </HabitContainer>   
                    )
                })}
            </>
        )
    }

    function toggleHabitStatus(habit, token, todayHabits) {
        if(concludedHabits.indexOf(habit.id) === -1) {
            changeHabitStatus(habit, token, "check")
        } else {
            changeHabitStatus(habit, token, "uncheck")
        }
         
    }

    function changeHabitStatus(habit, token, action) {
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/${action}`
        const request = axios.post(URL, {}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        request.then(()=>{
            setRendercontrol([])
        })

        request.catch((error)=>{
            alert("Algo deu errado. Tente novamente")
        })
    }
    

}


function HandleDate() {
    const {habitsPercentage} = useContext(ProgressContext)


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
            weekDay = "Ter??a"
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
            weekDay = "S??bado"
            break
                
        default:
    }

    let date = dayjs().get('date')

    if(date < 10) {
        date = `0${date}`
    }

    if (habitsPercentage === 0 || isNaN(habitsPercentage) ){
        return (
            <Date>
                <p>{weekDay}, {date}/{month}</p>
                <HabitsResume color = {"#BABABA"}>Nenhum h??bito conclu??do ainda</HabitsResume>
            </Date>
        )
    } else {
        return (
            <Date>
                <p>{weekDay}, {date}/{month}</p>
                <HabitsResume color = {"#8FC549"}>{habitsPercentage}% dos h??bitos conclu??dos</HabitsResume>
            </Date>
        )
    }


}




/* ----------------- STYLES ----------------- */



const TodayPage = styled.section`
    width: 100%;
    height: calc(100vh - 140px);
    background-color: #E5E5E5;
    display: flex;
    justify-content: center;
    overflow-y: scroll;
`

const PageContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`
const Date = styled.div`
    margin-bottom: 28px;
    p:first-child {
        color: #126BA5;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
    }

`
const HabitsResume = styled.p`
    color: ${props=>props.color};
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
`

const ListOfHabitsContainer = styled.ul`
    margin-top: 20px;
    width: 100%;
`

const HabitContainer = styled.li`
    width: 100%;
    border-radius: 5px;
    background-color: #FFF;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    position: relative;
`

const FlexContainer = styled.div`
    width: 90%;
    margin: 13px 0px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`

const Info = styled.div`
    flex: 1;
    span {
        display: block;
        color: #666666;
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        word-wrap: break-word;
        word-break: break-word;
        margin-bottom: 7px;
    }

    p {
        color: ${props=>props.color};
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        margin-top: 3px;
    }
`

const CheckHabit = styled.button`
    width: 69px;
    height: 69px;
    background: ${props => props.buttonColor};
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    margin-left: 35px;
`

