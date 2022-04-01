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
    width: ${props => props.width};
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img{
        width: 100%;
    }
    p {
        font-family: 'Playball', cursive;
        font-weight: 400;
        font-size: 68.982px;
        line-height: 86px;
        color: var(--main-color);
        margin-bottom: 35px;
    }

`

