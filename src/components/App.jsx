import "../assets/styles/style.css" //importing general CSS file
import styled from 'styled-components';

import SignIn from "./SignIn";
import Login from "./Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <Main > 
            <BrowserRouter>
                <Routes>
                    <Route path="/" element = {<SignIn />} />
                    <Route path="/cadastro" element = {<Login />} />
                </Routes>
            </BrowserRouter>
        </Main >
    )
}


const Main = styled.main`
    width: 100vw;
    max-width: 375px;
    height: 100vh;
    margin: auto;
`
