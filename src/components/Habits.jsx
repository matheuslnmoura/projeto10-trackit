import styled from "styled-components"
import { Link } from "react-router-dom"
import {useState, useContext, useEffect} from "react"
import axios from 'axios'

import UserContext from "../context/UserContext"
import "../assets/styles/style.css" //importing general CSS file

import Header from "./Header"
import Footer from "./Footer"
// import Logo from "./Logo"
// import Button from "./Button"



export default function Habits() {
    const [createHabitVisibility, setCreateHabitVisibility] = useState(false)
    const [listOfHabits, setListOfHabits] = useState([])
    const {userInfo, setUserInfo} = useContext(UserContext)
    const {loginResponse} = userInfo
    const {token} = loginResponse

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

    function CreateHabit() {
        const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"]
        const [habitInfo, setHabitInfo] = useState({habitName: "", habitDays: []})
        const{habitName, habitDays} = habitInfo

        if (createHabitVisibility === false) {
            return (
                <>
                </>
            )
        } else {
            return(
                <CreateHabitContainer>
                    <FlexContainer>
                        <input value = {habitName} placeholder="nome do hábito" onChange = {(event)=>{
                            let inputValue = "" 
                            inputValue += event.target.value
                            setHabitInfo({...habitInfo, habitName: inputValue})
                        }}/>
                        <DaysContainer >
                            {daysOfWeek.map((day, index)=>{
                                if(habitDays.indexOf(index) === -1) {
                                    return <Day 
                                    day = {day} 
                                    index = {index} 
                                    habitInfo = {habitInfo} 
                                    setHabitInfo = {setHabitInfo}
                                    background= {"#FFFFFF"}
                                    border =  {"1px solid #D5D5D5"}
                                    color = {"#D4D4D4"}
                                    />
                                } else {
                                    return <Day 
                                    day = {day} 
                                    index = {index} 
                                    habitInfo = {habitInfo} 
                                    setHabitInfo = {setHabitInfo}
                                    background= {"#CFCFCF"}
                                    border =  {"1px solid #CFCFCF"}
                                    color = {"#FFFFFF"}
                                    />
                                }

                            })}
                        </DaysContainer>
                        <ButtonsContainer>
                            <button onClick={()=>{
                                clearHabit(habitInfo, setHabitInfo)
                            }}>Cancelar
                            </button>
                            <button onClick={()=>{
                                registerHabit(token, habitInfo, setHabitInfo, createHabitVisibility, setCreateHabitVisibility, listOfHabits, setListOfHabits)
                            }}>Salvar</button>
                        </ButtonsContainer>
                    </FlexContainer>
                </CreateHabitContainer>
            )
        }
    }

    function ListHabits(props){
        const {listOfHabits} = props
        console.log(listOfHabits)

        if(listOfHabits.length === 0 || listOfHabits === undefined) {
            return (
                <ListofHabitsContainer >
                    <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                </ListofHabitsContainer>
            )
        } else {
            return(
                <ListofHabitsContainer >
                    {listOfHabits.map((habit, index)=>{
                        return <p>{habit.name} + {index}</p>
                    })}

                </ListofHabitsContainer>
                
            )
        }
    }

    return(
        <HabitsPage>
            <Header />
            <HabitsContainer>
                <Top >
                    <p>Meus hábitos</p>
                    <button onClick={()=>{
                        setCreateHabitVisibility(!createHabitVisibility)
                    }}><span>+</span></button>
                </Top>

                <CreateHabit />

                <ListHabits listOfHabits = {listOfHabits} />

            </HabitsContainer>
            <Footer />
        </HabitsPage>
    )
}

function Day(props) {
    const {day, index, habitInfo, setHabitInfo, background, border, color} = props
    const {habitDays} = habitInfo

    return(
        <DayContainer key={`${day} ${index}`} onClick={()=>{
            if(habitDays.indexOf(index) === -1){

                setHabitInfo({...habitInfo, habitDays: [...habitDays, index]})
            } else {

                const removalIndex = habitDays.indexOf(index)
                const habitDaysClone = [...habitDays]
                habitDaysClone.splice(removalIndex, 1)
                setHabitInfo({...habitInfo, habitDays: [...habitDaysClone]})
            }
            
            }} background = {background} border = {border} color = {color} >
            {day}
        </DayContainer>
    )
}



function registerHabit(token, habitInfo, setHabitInfo, createHabitVisibility, setCreateHabitVisibility, listOfHabits, setListOfHabits) {
    const{habitName, habitDays} = habitInfo
    if(habitName.length === 0){
        alert("Dê um nome a seu hábito")
    } else if(habitDays.length === 0 ) {
        alert("Escolha pelo menos um dia da semana para fazer esse hábito")
    } else {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const requestObj = {name: habitName, days: habitDays}
        
        const request = axios.post(URL, requestObj, 
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }

        )

        request.then((response)=>{
            setHabitInfo({habitName: "", habitDays: []})
            setCreateHabitVisibility(!createHabitVisibility)
            setListOfHabits([...listOfHabits, response.data])

        })

        request.catch(()=>{
            alert(`
                Algo deu errado :(
                Tente novamente
                `
            )
        })

    }
}

function clearHabit(habitInfo, setHabitInfo) {
    setHabitInfo({habitName: "", habitDays: []})
}



/* STYLES */



const HabitsPage = styled.section`
    width: 100%;
    height: calc(100vh - 140px);
    background-color: #E5E5E5;
    display: flex;
    justify-content: center;

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

const CreateHabitContainer = styled.div`
    width: 100%;
    height: 180px;
    border-radius: 5px;
    background-color: #FFF;
    margin-top: 20px;
    display: flex;
    justify-content: center;
`

const FlexContainer = styled.div`
    width: 90%;


    input {
        width: 100%;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        margin-top: 18px;
        padding-left: 11px;
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

const DaysContainer = styled.div`
    width: 90%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

`
const DayContainer = styled.div`
    width: 30px;
    height: 30px;
    background: ${props=>props.background};
    border: ${props=>props.border};
    color: ${props=>props.color};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ButtonsContainer = styled.div`
    width: 100%;
    margin-top: 29px;
    display: flex;
    justify-content: flex-end;

    button {
        width: 84px;
        height: 35px;
        font-weight: 400;
        font-size: 15.976px;
    }

    button:first-child {
        background-color: transparent;
        color: var(--button-color);
        border:none;
    }

    button:last-child {
        background-color: var(--button-color);
        color: var(--white-color);
        border:none;
        border-radius: 5px;
        margin-left: 10px;
    }
`

const ListofHabitsContainer = styled.div`
    margin-top: 20px;
`