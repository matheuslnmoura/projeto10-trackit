import styled from "styled-components"
import { Link } from "react-router-dom";

import "../assets/styles/style.css" //importing general CSS file

import Logo from "./Logo"
import Input from "./Input"
import Button from "./Button"

export default function Login() {
    return(
        <LoginContainer>
            <Logo width = {'155'} />
            <Input type = {"email"} id = "email" placeholder = "email" />
            <Input type = {"password"} id = "password" placeholder = "senha" />
            <Input type = {"text"} id = "name" placeholder = "nome" />
            <Input type = {"text"} id = "photo" placeholder = "foto" />
            <Button name = {"Cadastrar"} />
            <Link to="/" ><p>Já tem uma conta? Faça o login</p></Link>
        </LoginContainer>
    )
}

const LoginContainer = styled.main`
    width: 90%;
    margin: auto;


    p{
        width: fit-content;
        margin: auto;
        margin-top: 25px;
    }
    a{
        color: var(--button-color);
        text-decoration: underline;
    }


    
`
