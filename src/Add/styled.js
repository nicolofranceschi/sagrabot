import styled from "styled-components";
import { Flex } from "../components/Lib";
import Lottie from 'react-lottie';


export const Back = styled.div`
  position: absolute;
  top:20px;
  left:10px;
  height: 50px;
  width: 50px;
  border-radius: 20px;
  backdrop-filter: blur(30px);
  z-index:10;
  :hover{ 
    transform: scale(1.2);
  }
`;

export const Backup = styled.div`
  position: absolute;
  top:20px;
  left:10px;
  height: 50px;
  width: 50px;
  border-radius: 20px;
  backdrop-filter: blur(30px);
  z-index:120;
  :hover{ 
    transform: scale(1.2);
  }
`;

export const Right = styled.div`
    width: 70%;
    height: 30vh;
    overflow: scroll;
    position: relative;
    border-radius:20px 5px 5px 20px;
    text-align: center;
    vertical-align: middle;
    color: white;
    background-color: #ffade3;
    font-size: 20vw; 
    font-weight: bold;
    text-transform: uppercase;
    -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      ::-webkit-scrollbar {
       display: none;
  }
   
  `;

export const All = styled.div`
width: 100%;
height: 30vh;
overflow: scroll;
position: relative;
border-radius:20px;
text-align: center;
vertical-align: middle;
color: white;
background-color: #ffade3;
font-size: 20vw; 
font-weight: bold;
text-transform: uppercase;
-ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
   display: none;
}

`;

export const Left = styled.div`
width: 30%;
height: 30vh;
position: relative;
overflow: scroll;
border-radius: 5px 20px 20px 5px;
background-color: var(--line);
color:white;
padding-left: 15px;
font-weight: bold;
text-transform: uppercase;
:focus { outline: none; }
-ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
   display: none;
}
`;

export const Svg = styled.svg`
  margin:15px;
  height:20px;
  width:20px;
  stroke: white;
`;

export const Icona = styled.img`
  z-index: 0;
  position: absolute;
  top:-20vh;
  height: 60vh;
  width: 100vw;
  max-width: 600px;
  animation: pulse 2s;
  @keyframes pulse{
  25%  {transform: scale(0.9);}
  75%  {transform: scale(1.1);}
}
`;

export const InputProps = {
  width: '100%',
  margin: "45px 0 0 0"
}

export const Animation = styled(Lottie)`
  width: 400px;
  background-color: var(--black-light);
`;

export const Accordion = styled.div`
  display: ${({ show = true }) => show ? 'block' : 'none'};
`;

export const Container = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
  width: 80vw;
  height: 85vh;
  padding: 6vh 0 0;
  overflow: hidden;
  background-color: var(--black-light);
  margin: 0 auto;
  max-width: 400px;
`;

export const Containerscr = styled(Flex)`
  flex-direction: column;
  width: 100vw;
  margin-top: 10vh;
  overflow: hidden;
  background-color: var(--black-light);
`;

export const Adds = styled.button`
  position: absolute;
  height: 10vh;
  bottom: 20px;
  border-radius: 5px;
  width: 90vw;
  left: 5vw;
  background-color: white;
  color: black;
  font-weight: bold;
`;

export const FormButtons = styled(Flex)`
  position: absolute;
  width: 100%;
  bottom: 60px;
  right: 0;
`;

export const Card = styled.div`
    height: 90%;
    margin-left:5%;
    margin-right:5%;
    width: 90%;
    margin-top: 20px;
    padding-top: 20px;
    border-radius: 20px;
    position: relative;
    cursor: grab;
    perspective: 600px;
    display: flex;
    flex-direction: row;
  `;

export const Bar = styled.div`
  display: flex;
  flex-direction:row;
  align-items: flex-start;
  justify-content: center;
  margin-top: 2vh;
  margin-left: 60px;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Confirm = styled.div`
position: absolute;
z-index:100;
height: 100vh;
width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0;
  background-color: #0080ff;
  color: white;
  font-weight: bold;
  font-size: 2rem;
  
`;

export const Scroll = styled.div`
  max-height: 75vh;
  width: 90vw;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Input = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Admin = styled.div`
  position: absolute;
  height: 50px;
  width: 50px;
  top: 5vh;
  left: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg{
    padding:10px;
    stroke: white;
  }
`;

export const Version = styled.div`
  position: absolute;
  height: 50px;
  width: 50px;
  bottom: 5vh;
  right: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Lucida Console", "Courier New", monospace;
  color: var(--line);
  font-family:bold;
  
`;

export const Accedi = styled.button`
  width: 25vw;
  max-width: 120px;
  height:6vh;
  position: absolute;
  top:0;
  right:20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
  backdrop-filter: blur(30px);
  color: #ffade3;
  border-radius: 20px;
  padding: ${({ padding }) => padding ? padding : '0'};
  font-weight: bold;
  margin: ${({ margin }) => margin ? margin : '0'};
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 20vh;
`;

export const Label = styled.label`
  position: relative;
  width: 100%;
  display: flex;
  vertical-align: center;
`;

export const Divspace = styled.div`
  height: ${props => props.space}
`;


export const DivCheckbox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  vertical-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Checkbox = styled.input`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 20px;
  height: 20px;
  align-items: left;
  vertical-align: center;
  margin-bottom: auto;
`;

export const Testo = styled.div`
    text-align: center;
    vertical-align: middle;
    position: relative;
    width: 100%;
    padding: ${props => props.padding} ;
    line-height: ${props => props.line};
    color: ${props => props.color};
    font-weight: bold;
    font-size: ${props => props.size}; 
    @media only screen and (min-width: 600px) {
      grid-template-columns: 1fr 1fr 1fr  ;
      font-size: 1vw; 
    }
  `;

export const Textconstol = styled.span`
  margin-left: 10px;
  margin-top:auto;
  margin-bottom: auto;
  color: var(--white);
  font-size: ${props => props.font};
  font-weight: ${props => props.bold};
  width: 80%;
`;

export const ButtonStart = styled.button`
  width: 80vw;
  height:6vh;
  position: absolute;
  bottom: 10vh;
  z-index:10;
  left:10vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2vh; 
  text-align: center;
  vertical-align: middle;
  background-color: ${({ color }) => color ? color : "#ffade3" };
  color: var(--white);
  border-radius: var(--border-radius);
  padding: ${({ padding }) => padding ? padding : '0'};
  font-weight: bold;
  margin: ${({ margin }) => margin ? margin : '0'};
`;

export const Span = styled.span`
    color: var(--white);
    position: relative;
    margin: 5px;
    margin-top:auto;
    margin-bottom: auto;
    font-size: ${props => props.font};
    font-weight: ${props => props.bold};
  
`;



