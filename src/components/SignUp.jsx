import styled from "styled-components"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"

import "../assets/styles/style.css" //importing general CSS file

import UserContext from "../context/UserContext"
import Logo from "./Logo"
import Input from "./Input"
import Button from "./Button"

export default function SignUp() {
    const {userInfo, setUserInfo} = useContext(UserContext)
    const {isSigningUp, email, name, image, password} = userInfo

    return(
        <SingUpContainer>
            <Logo width = {'60%'} />
            <Input type = {"email"} id = "email" placeholder = "email" value = {email} required />
            <Input type = {"password"} id = "password" placeholder = "senha" value = {password} required />
            <Input type = {"text"} id = "name" placeholder = "nome" value = {name} required />
            <Input type = {"text"} id = "image" placeholder = "foto" value = {image} required />
            <Button buttonText = {"Cadastrar"} to = "/" action = {"signup"}/>
            <Link to="/" ><p>Já tem uma conta? Faça o login</p></Link>
        </SingUpContainer>
    )
}

const SingUpContainer = styled.section`
    width: 90%;
    overflow-y: scroll;
    margin-top: 20px;

    p{
        width: fit-content;
        margin: 25px auto;
    }
    a{
        color: var(--button-color);
        text-decoration: underline;
    }
`

