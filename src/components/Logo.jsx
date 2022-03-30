import styled from "styled-components"

import logoTrackit from "../assets/images/logoTrackit.png"

export default function Logo(props){
    const {width} = props
    return(
        <ImgContainer width = {width}>
            <img src={logoTrackit} alt="Track it Logo" />
            <p>Trackit</p>
        </ImgContainer>
    )
}

const ImgContainer = styled.div`
    width: ${props => props.width}px;
    font-family: 'Playball', cursive;
    margin: auto;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img{
        width: 100%;
    }
    p {
        font-weight: 400;
        font-size: 68.982px;
        line-height: 86px;
        color: #126BA5;
        margin-bottom: 35px;
    }

`

