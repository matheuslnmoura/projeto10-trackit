import styled from "styled-components"
import { Link } from "react-router-dom";
import { useContext } from "react";

import "../assets/styles/style.css" //importing general CSS file

import UserContext from "../context/UserContext"
import Logo from "./Logo"
import Input from "./Input"
import Button from "./Button"

export default function Login() {
    const {userInfo, setUserInfo} = useContext(UserContext)
    const {isSigningUp, email, name, image, password} = userInfo

    return(
        <LoginContainer>
            <Logo width = {'60%'} />
            <Input type = {"email"} id = "email" placeholder = "email" />
            <Input type = {"password"} id = "password" placeholder = "senha" />
            <Button buttonText = {"Entrar"} to = "/hoje" action={"login"} />
            <Link to="/cadastro" ><p>Não tem uma conta? Cadastre-se</p></Link>
        </LoginContainer>
    )
}

const LoginContainer = styled.section`
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
