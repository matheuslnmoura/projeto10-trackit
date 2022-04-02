import styled from "styled-components"
import {useState, useContext} from "react"
import axios from 'axios'

import HabitsContext from "../context/HabitsContex"
import { RiDeleteBin6Line } from 'react-icons/ri';


function ListHabits(){
    const {
        listOfHabits, 
        setListOfHabits, 
        token,
        setCallHabits
    } = useContext(HabitsContext)

    if(listOfHabits.length === 0 || listOfHabits === undefined) {
        return (
            <ListOfHabitsContainer >
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </ListOfHabitsContainer>
        )
    } else {
        return(
            <ListOfHabitsContainer >
                {listOfHabits.map((habit, index)=>{
                    return <Habit key = {habit.name + " " + index} habitName = {habit.name} habitDays = {habit.days} habitId = {habit.id} token = {token} listOfHabits = {listOfHabits} setListOfHabits = {setListOfHabits} setCallHabits = {setCallHabits} /> 
                })}
            </ListOfHabitsContainer>
            
        )
    }
}


function Habit(props){
    const {habitName, habitDays, habitId, token, listOfHabits, setListOfHabits, setCallHabits} = props
    const [modalVisibility, setModalVisibility] = useState(false)

    const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"]


    return(
        <HabitContainer key = {habitId + " " + habitName}>
            <FlexContainer>
                <span>{habitName}</span>
                <DaysContainer >
                    {daysOfWeek.map((day, index)=>{
                        if(habitDays.indexOf(index) === -1) {
                            return <DayContainer 
                                background= {"#FFFFFF"}
                                border =  {"1px solid #D5D5D5"}
                                color = {"#D4D4D4"}
                                key = {day + " " + index}
                            >   {day}
                            </DayContainer>
                        } else {
                            return <DayContainer 
                                background= {"#CFCFCF"}
                                border =  {"1px solid #CFCFCF"}
                                color = {"#FFFFFF"}
                                key = {day + " " + index}
                            >   {day}
                            </DayContainer>
                        }

                    })}
                </DaysContainer>
            </FlexContainer>
            <DeleteIcon onClick = {()=>{
                
                setModalVisibility(true)
            }} >
                <RiDeleteBin6Line color = "#666666" fontSize = "20px" />
            </DeleteIcon>
            <ConfirmModal 
                habitName = {habitName} 
                modalVisibility = {modalVisibility} 
                setModalVisibility = {setModalVisibility}
                habitId = {habitId}
                token  = {token}
                listOfHabits = {listOfHabits}
                setListOfHabits = {setListOfHabits} 
                setCallHabits = {setCallHabits}
            />
        </HabitContainer>
    )
}

function ConfirmModal(props) {
    const {modalVisibility, setModalVisibility, habitName, habitId, token, listOfHabits, setListOfHabits, setCallHabits} = props
    if(modalVisibility) {
        return(
            <Modal>
                <span>Você quer mesmo deletar o seu hábito "{habitName}"?</span>
                <div>
                    <button onClick={()=>{
                        setModalVisibility(!modalVisibility)
                    }}>
                        Não
                    </button>
                    <button onClick={()=>{
                        deleteHabit(habitId, token, listOfHabits, setListOfHabits, modalVisibility, setModalVisibility, setCallHabits)
                    }}>Sim</button>
                </div>
            </Modal>
        )
    } else {
        return (
            <></>
        )
    }
}

function deleteHabit(habitId, token, listOfHabits, setListOfHabits, modalVisibility, setModalVisibility, setCallHabits) {

    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}`
    const request = axios.delete(URL, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    request.then(()=>{
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const request = axios.get(URL, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        request.then((response)=>{
            setListOfHabits([...response.data])
            setModalVisibility(!modalVisibility) 
        }) 
    })
}

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
    margin-top: 13px;

    span{
        display: block;
        width: 90%;
        color: #666666;
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        word-wrap: break-word;
        word-break: break-all;
    }
`

const DaysContainer = styled.div`
    width: 90%;
    margin-top: 10px;
    margin-bottom: 15px;
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

const DeleteIcon = styled.div`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
`

const Modal = styled.div`
    width: 75%;
    height: 200px;
    background-color: #fff;
    position: fixed;
    top: 40vw;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    border-radius: 20px;
    box-shadow: -3px 4px 17px 1px rgba(0,0,0,0.6);

    span{
        display: block;
        width: 90%;
        margin: auto;
        text-align: center;
        font-size: 16px;
        word-break: break-word;
        word-wrap: break-word;
    }

    div {
        margin: 0, auto;
        width: 100%;
        display:flex;
        justify-content: center;
    }

    button{
        flex: 1;
        height: 40px;
        background-color: transparent;
        border: none;
        border-top: 1px solid var(--button-color);
        color: var(--button-color);
        font-weight: bolder;
    }

    button:first-child{
        border: 1px solid var(--button-color);
        border-bottom-left-radius: 20px;
    }

    button:last-child{
        border: 1px solid var(--button-color);
        border-left: none;
        border-bottom-right-radius: 20px;
    }

`



export default ListHabits