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

export const Scroll = styled.div`
  max-height: 30vh;
  overflow: scroll;
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
  right: -10vh;
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

export const FormButtons = styled(Flex)`
  position: absolute;
  width: 100%;
  bottom: 60px;
  right: 0;
`;

export const Input = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
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
`;

export const Checkbox = styled.input`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 20px;
  height: 20px;
  align-items: left;
  vertical-align: center;
  margin-top:auto;
  margin-bottom: auto;
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



