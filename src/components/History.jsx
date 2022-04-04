import styled from "styled-components"

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
            <HistoryContainer >
                <h1>Histórico</h1>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </HistoryContainer>
            <Footer />
        </HistoryPage>
    )
}

const HistoryPage = styled.section`
    width: 100%;
    height: calc(100vh - 140px);
    background-color: #E5E5E5;

`

const HistoryContainer = styled.div`
    width: 90%;
    margin:auto;

    h1 {
        color: var(--main-color);
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        margin-top: 28px;
        margin-bottom: 17px;
    }

    p {
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`