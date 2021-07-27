import styled from "styled-components";
import {
    motion
} from "framer-motion";

export const Container = styled(motion.div)`
    height: 85vh;
    bottom:0;
    width: 100vw;
    border-radius: 20px;
    overflow: hidden;
    position: absolute;
    cursor: grab;
    word-wrap: break-word;
  `;

export const Blocco = styled.div`
    height: 100vh;
    bottom:0;
    width: 100vw;
    overflow: hidden;
    position: absolute;
    background-color: var(--line);
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

export const Card = styled.div`
    height: 90%;
    margin-top: 5vh;
    margin-left:5%;
    margin-right:5%;
    width: 90%;
    border-radius: 20px;
    position: relative;
    cursor: grab;
    background-color: var(--line);
    perspective: 600px;
    display: flex;
    flex-direction: row;
  `;

export const Testo = styled.div`
    text-align: center;
    vertical-align: middle;
    position: relative;
    width: 100%;
    padding: 10px ;
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
        padding: 10px ;
        line-height: ${props => props.line};
        color: white;
        font-weight: bold;
        font-size: 20vw; 
        @media only screen and (min-width: 600px) {
            grid-template-columns: 1fr 1fr 1fr  ;
            font-size: 5vw; 
  }
`;


export const Space = styled.div`
        height: 10vh;
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
        font-size: ${props => props.size}vw; 
        @media only screen and (min-width: 600px) {
            grid-template-columns: 1fr 1fr 1fr  ;
            font-size: 6vw; 
  }
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