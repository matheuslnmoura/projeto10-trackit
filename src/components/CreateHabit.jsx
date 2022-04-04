import styled from "styled-components"
import {useState, useContext, useEffect} from "react"
import axios from 'axios'
import { ThreeDots } from  'react-loader-spinner'

import HabitsContext from "../context/HabitsContext"
import UserContext from "../context/UserContext"

function CreateHabit() {
    const {
        createHabitVisibility, 
        setCreateHabitVisibility, 
        listOfHabits, 
        setListOfHabits, 
        userInfo, 
        setUserInfo, 
        loginResponse, 
        token,
    } = useContext(HabitsContext)

    const {inputButtonActive, setInputButtonActive} = useContext(UserContext)
    const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"]
    const [habitInfo, setHabitInfo] = useState({habitName: "", habitDays: []})
    const [buttonStyle, setButtonStyle] = useState({content: "Salvar", opacity: 1})
    const {habitName, habitDays} = habitInfo

    useEffect(()=>{
        setInputButtonActive("")
    }, [])



    if (createHabitVisibility === false) {
        return (
            <>
            </>
        )
    } else {
        return(
            <CreateHabitContainer>
                <FlexContainer opacity = {buttonStyle.opacity}>
                    <input value = {habitName} placeholder="nome do hábito" disabled = {inputButtonActive} onChange = {(event)=>{
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
                                inputButtonActive = {inputButtonActive}
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
                                inputButtonActive = {inputButtonActive}
                                />
                            }

                        })}
                    </DaysContainer>
                    <ButtonsContainer opacity = {buttonStyle.opacity}>
                        <button onClick={()=>{
                            setCreateHabitVisibility(!createHabitVisibility)
                        }}>Cancelar
                        </button>
                        <button onClick={()=>{
                            registerHabit(token, habitInfo, setHabitInfo, createHabitVisibility, setCreateHabitVisibility, listOfHabits, setListOfHabits, setButtonStyle, setInputButtonActive)
                        }}>{buttonStyle.content}</button>
                    </ButtonsContainer>
                </FlexContainer>
            </CreateHabitContainer>
        )
    }
}


function Day(props) {
    const {day, index, habitInfo, setHabitInfo, background, border, color, inputButtonActive} = props
    const {habitDays} = habitInfo

    return(
        <DayContainer key={`${day} ${index}`} disabled = {inputButtonActive} onClick={()=>{
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



function registerHabit(token, habitInfo, setHabitInfo, createHabitVisibility, setCreateHabitVisibility, listOfHabits, setListOfHabits, setButtonStyle, setInputButtonActive) {
    const{habitName, habitDays} = habitInfo

    setInputButtonActive("disabled")
    setButtonStyle({content: <ThreeDots color="#fff" height={40} width={40} />, opacity: 0.7})

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
            setButtonStyle({content: "Salvar", opacity: 1})
            setInputButtonActive("")
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



/*STYLES*/

const CreateHabitContainer = styled.div`
    width: 100%;
    height: fit-content;
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

const DaysContainer = styled.div`
    width: 90%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

`
const DayContainer = styled.button`
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
    margin-bottom: 15px;
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
        opacity: ${props=>props.opacity};
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export default CreateHabit