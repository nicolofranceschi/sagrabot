import styled from "styled-components";
import {
  motion
} from "framer-motion";

export const Container = styled(motion.div)`
  height: 90vh;
  bottom:0;
  width: 100vw;
  border-radius: 20px;
  overflow: hidden;
  position: absolute;
  cursor: grab;
`;
export const Card = styled.div `
  height: 100%;
  width: 100%;
  border-radius: 20px;
  position: relative;
  cursor: grab;
  background-color: var(--line);
  perspective: 600px;
`;
export const Testo = styled.div `
  text-align: center;
  vertical-align: middle;
  line-height: 20vh;
  position: absolute;
  width: 100%;
  color: white;
  font-weight: bold;
  font-size: 5vw; 
  @media only screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr  ;
    font-size: 3vw; 
  }
`;

export const Svg = styled.svg `
  right: -15px;
  z-index: 20;
  fill: red;
  width: 40px;
  height: 40px;
  position: absolute;
  top: -15px;
  backdrop-filter: blur(30px);
  border-radius:20px;
  :hover{
    transform: scale(1.2);
  }
`;

export const Form = styled.form `
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius:20px;
  display: flex;
  flex-direction: row;
`;

export const Testoinput = styled.input `
  width: 50%;
  height: 100%;
  position: relative;
  border-radius:20px 0px 0px 20px;
  background-color: var(--line);
  color:white;
  padding-left: 15px;
  font-size: 4vw; 
  font-weight: bold;
  text-transform: uppercase;
  :focus { outline: none; }
  @media only screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr  ;
    font-size: 1.7vw; 
  }
`;

export const Buttoninput = styled.button `
  width: 50%;
  height: 100%;
  position: relative;
  border-radius: 0px 20px 20px 0px;
  text-align: center;
  vertical-align: middle;
  line-height: 20vh;
  color: white;
  background-color: #ffade3;
  font-size: 6vw; 
  font-weight: bold;
  @media only screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr  ;
    font-size: 4vw; 
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