import styled from "styled-components"
import "../assets/styles/style.css" //importing general CSS file


export default function Button(props) {
    const {name} = props
    return(
        <ButtonContainer>{name}</ButtonContainer>
    )
}

const ButtonContainer = styled.button`
    width: 100%;
    height: 45px;
    color: #FFF;
    background-color: var(--button-color);
    border: none;
    border-radius: 5px;
    font-size: 21px;
`

