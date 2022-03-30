import styled from "styled-components"
import "../assets/styles/style.css" //importing general CSS file

export default function Input(props){
    const {type, placeholder} = props
    return(
        <InputsContainer>
            <input type={type} placeholder = {placeholder} />
        </InputsContainer>
    )
}

const InputsContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input{
        width: 100%;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    
    input:focus{
        outline: 2px solid var(--button-color);
    }

`