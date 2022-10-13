import styled from 'styled-components';

const Item = styled.div`
    background: #77273A;
    width: 600px;
    height: 270px;
    border-radius: 30px;
    display: flex;
    justify-content: left;
    position: relative;
 
`

const Name = styled.div`
    font-family: "Rounded Mplus 1c Medium";
    font-size: 22px;
    color: #fff;
    padding-left: 25px;
    @font-face {
        font-family: "Rounded Mplus 1c Medium";
        src: url("../src/fonts/MPLUSRounded1c-Medium.ttf");
        font-style: normal;
        font-weight: normal;
      }
`
const Button = styled.div`
    background-color: #D9D9D9;
    text-align: center;
    width: 300px;
    height: 60px;
    border-radius: 20px;
    color: #000000;
    font-family: "Rounded Mplus 1c Medium";
    font-size: 22px;
    position: absolute;
    bottom: 0;
    margin-left: 25px;
    margin-bottom: 25px;
    @font-face {
        font-family: "Rounded Mplus 1c Medium";
        src: url("../src/fonts/MPLUSRounded1c-Medium.ttf");
        font-style: normal;
        font-weight: normal;
      }
`

export {Item, Name, Button};