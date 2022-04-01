import styled from "styled-components"
import { Link } from "react-router-dom";

import "../assets/styles/style.css" //importing general CSS file

import Header from "./Header";
import Footer from "./Footer";
// import Logo from "./Logo"
// import Input from "./Input"
// import Button from "./Button"

export default function History() {
    return(
        <HistoryPage>
            <Header />
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            <Footer />
        </HistoryPage>
    )
}

const HistoryPage = styled.section`
    width: 100%;
    height: calc(100vh - 140px);
    background-color: #ccc;

`