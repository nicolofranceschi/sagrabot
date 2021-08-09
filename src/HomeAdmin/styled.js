import styled from "styled-components";
import {
    motion
} from "framer-motion";

export const Container = styled(motion.div)`
    height: 85vh;
    width: 100vw;
    border-radius: 20px;
    overflow: hidden;
    cursor: grab;
    word-wrap: break-word;
  `;

export const Blocco = styled.div`
    height: 100vh;
    bottom:0;
    width: 100vw;
    overflow: hidden;
    position: absolute;
    background-color: var(--black-light);
  `;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: row;
  width: 90vw;
  height: 10vh;
  margin-left:5vw;
`;

export const Input = styled.input`

width:70%;
border-radius: 20px 0px 0px 20px;
padding-left: 20px;
:focus { outline: none; }
`;

export const Button = styled.button`

width:30%;
border-radius: 0px 20px 20px 0px;
color: white;
background-color: #adaeff;

`;


export const Line = styled.div`
  margin-top: 10px;
  width: 800px;
  display: flex;
`;

export const Div = styled.div`
      width: 100vw;
      overflow: hidden;
      display: flex;
      flex-direction: row;
`;

export const Tavoli = styled.div`
      overflow: scroll;
      margin-left: 5%;
      margin-right: 5%;
      border-radius: 20px;
      height: 10vh;
      display: flex;
      flex-direction: column;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      ::-webkit-scrollbar {
       display: none;
  }
`;


export const Prenota = styled.div`
        height: 100px;
        bottom:0;
        width: 100px;
        border-radius: 100px;
        overflow: hidden;
        position: absolute;
        bottom: 50px;
        right:10px;
        background-color: #3498DB;
    `;

export const P = styled.p`
line-height: 40px;
padding-left:11px;
color: white;
font-size: 30px;
font-weight: bold;
`;

export const Menuimg = styled.img`
  height: 80%;
  width: 100%;
  border-radius: 10px;
  background-color: white;
`;


export const Pop = styled.div`
  height: 40px;
  width: 40px;
  z-index: 20;
  background-color: var(--line);
  border-radius: 20px;
  color:white;
  margin-top: -20px;
  margin-right: -20px;
  position: absolute;
  display: flex;
  right: 0;
  flex-direction: column;
  
`;

export const Card = styled.div`
    height: 90%;
    margin-left:5%;
    margin-right:5%;
    width: 90%;
    padding-top: 20px;
    border-radius: 20px;
    position: relative;
    cursor: grab;
    perspective: 600px;
    display: flex;
    flex-direction: row;
  `;

export const Eliminazione = styled.div`
    height: 90%;
    margin-left:5%;
    margin-right:5%;
    width: 90%;
    padding-top: 20px;
    border-radius: 20px;
    position: relative;
    cursor: grab;
    perspective: 600px;
    display: flex;
    flex-direction: row;
    div{
      width: 100%;
      height: 100%;
      position: relative;
      height: 10vh;
      border-radius:20px ;
      display: flex;
      text-align: center;
      vertical-align: middle;
      justify-content:center;
      align-items: center;
      color: white;
      background-color: var(--line);
      font-size: 10px; 
      font-weight: bold;
      @media only screen and (min-width: 600px) {
        grid-template-columns: 1fr 1fr 1fr  ;
        font-size: 4vw; 
      }
    svg{ 
      right: -15px;
      z-index: 20;
      stroke: red;
      width: 50px;
      height: 50px;
      padding: 10px;
      position: absolute;
      top: -25px;
      backdrop-filter: blur(30px);
      border-radius:50px;
      :hover{
        transform: scale(1.2);
      }
    }

    p{
      padding:30px;
      line-height: 1.6;
    }

    }
`;


export const Menu = styled.div`
    height: 80%;
    margin-left:20px;
    margin-right:20px;
    width: 200px;
    border-radius: 20px;
    position: relative;
`;


export const Testo = styled.div`
    text-align: center;
    vertical-align: middle;
    position: relative;
    width: 100%;
    padding: ${props => props.padding} ;
    line-height: ${props => props.line};
    color: white;
    font-weight: bold;
    font-size: 3vw; 
    @media only screen and (min-width: 600px) {
      grid-template-columns: 1fr 1fr 1fr  ;
      font-size: 1vw; 
    }
  `;
export const TestoBig = styled.div`
        text-align: center;
        vertical-align: middle;
        position: relative;
        width: 100%;
        padding: ${props => props.padding} ;
        line-height: ${props => props.line};
        color: white;
        font-weight: bold;
        font-size: ${props => props.size}; 
        @media only screen and (min-width: 600px) {
            grid-template-columns: 1fr 1fr 1fr  ;
            font-size: 5vw; 
  }
`;




export const Space = styled.div`
        height: ${props => props.size}vh;
`;

export const Scroll = styled.div`
  max-height: 80vh;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Title = styled.div`
    
        width: 100%;
        padding: 20px ;
        line-height: 15vh;
        color: white;
        font-weight: bold;
        font-size: ${props => props.size}vh; 
        
`;

export const Allergie = styled.div`
  
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  border-radius: 20px;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  align-items:center;
  max-width: 400px;

  :hover{
    transform: scale(0.9);
  }

  img{
    padding:6px 0px 0px;
    width: 50px;
  }
  
  
`;

export const P1 = styled.div`
    
    padding: 20px 0px 20px 0px;
    color: white;
    font-size: 12px;
    font-weight: bold;
    width: 60%;
       
`;

export const P2 = styled.div`
    
    padding: 20px 0px 20px 0px;
    color: #ee404c;
    font-size: 20px;
    font-weight: bold;
       
`;


export const Titlelitte = styled.div`
    
        width: 100%;
        padding: 20px ;
        line-height: ${props => props.line}vh;
        color: white;
        font-weight: bold;
        font-size: ${props => props.size}em; 
       
`;

export const Svgout = styled.svg`

      padding-right: 20px;
      height: 10vh;
      width: 60px;
      border-radius: 20px;
      overflow: hidden;
      stroke: white;
      &:hover {
      height: 10vh;
      width: 55px;
      }
`;

export const Dati = styled.div`
    
        width: 100%;
        padding: 2px ;
        padding-right:40px;
        color: white;
        font-weight: bold;
        font-size: ${props => props.size}vw; 
        @media only screen and (min-width: 600px) {
            grid-template-columns: 1fr 1fr 1fr  ;
            font-size: 1vw; 
  }
`;
export const Flex = styled.div`
    
        display: flex;
        flex-direction:${props => props.orientation};
        align-items: center;
        justify-content: center;
        height: 20vh;
`;

export const Svg = styled.svg`
    right: -15px;
    z-index: 20;
    stroke: red;
    width: 50px;
    height: 50px;
    padding: 10px;
    position: absolute;
    top: 0px;
    backdrop-filter: blur(30px);
    border-radius:50px;
    :hover{
      transform: scale(1.2);
    }
  `;

export const Svg1 = styled.svg`
        height: 100px;
        width: 100px;
        border-radius: 100px;
        overflow: hidden;
        position: absolute;
        bottom: 50px;
        backdrop-filter: blur(30px);
        right:20px;
        :hover{ 
        transform: rotate(150deg);
        transform: scale(1.2);
  }

`;

export const Close = styled.svg`
        right: 15px;
        z-index: 20;
        fill: red;
        width: 40px;
        height: 40px;
        position: absolute;
        top: 15px;
        backdrop-filter: blur(30px);
        border-radius:20px;
        :hover{
        transform: scale(1.2);
        }
`;

export const Find = styled.svg`
        height: 30px;
        width: 30px;
        :hover{
        transform: scale(1.2);
        }
`;



export const Left = styled.div`
    width: 50%;
    height: 100%;
    position: relative;
    border-radius: 5px 20px 20px 5px;
    background-color: var(--line);
    color:white;
    padding-left: 15px;
    font-weight: bold;
    text-transform: uppercase;
    :focus { outline: none; }
    @media only screen and (min-width: 600px) {
      grid-template-columns: 1fr 1fr 1fr  ;
      font-size: 1.7vw; 
    }
  `;

export const Right = styled.div`
    width: 50%;
    height: 100%;
    position: relative;
    border-radius:20px 5px 5px 20px;
    text-align: center;
    vertical-align: middle;
    color: white;
    background-color: #ffade3;
    font-size: 20vw; 
    font-weight: bold;
    text-transform: uppercase;
    @media only screen and (min-width: 600px) {
      grid-template-columns: 1fr 1fr 1fr  ;
      font-size: 4vw; 
    }
  `;


export const TavoliText = styled.div`

    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    vertical-align: middle;
    display: flex;
    align-items: center;
    color: white;
    background-color: #ffade3;
    font-size: 20vw; 
    font-weight: bold;
    text-transform: uppercase;
    
  `;

export const ButtonTavoli = styled.button`
    position: absolute;
    bottom:1vh;
    left:5vw;
    height: 20vh;
    width: 90vw;
    color: white;
    font-weight: bold;
    border-radius: 20px ;
    background-color:#adaeff;
    z-index:10;
    :hover{
      transform: scale(0.9);
    }
`;

export const ButtonCancella = styled.button`
    position: absolute;
    bottom:25vh;
    left:5vw;
    height: 5vh;
    width: 90vw;
    color: white;
    font-weight: bold;
    border-radius: 5px ;
    background-color:red;
    z-index:10;
    :hover{
      transform: scale(0.9);
    }
`;


export const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 20vh;
    gap: 20px;
    padding: 20px;
    @media only screen and (min-width: 600px) {
      grid-template-columns: 1fr 1fr 1fr  ;
    }
  `;