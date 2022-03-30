import styled from "styled-components"
import { Link } from "react-router-dom";

import "../assets/styles/style.css" //importing general CSS file

import Logo from "./Logo"
import Input from "./Input"
import Button from "./Button"

export default function SignIn() {
    return(
        <SignInContainer>
            <Logo width = {'155'} />
            <Input type = {"email"} id = "email" placeholder = "email" />
            <Input type = {"password"} id = "password" placeholder = "senha" />
            <Button name = {"Entrar"} />
            <Link to="/cadastro" ><p>Não tem uma conta? Cadastre-se</p></Link>
        </SignInContainer>
    )
}

const SignInContainer = styled.main`
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
