import styled from "styled-components";
import QrReader from 'react-qr-reader'

export const Blocco = styled.div`
    height: 100vh;
    bottom:0;
    width: 100vw;
    overflow: hidden;
    position: absolute;
    background-color: ${props => props.color};
  `;

export const Qr = styled(QrReader)`
    top:10vh;
    width: 90vw;
    max-width: 45vh;
    left:5vw;
    border-radius: 20px;
    position: absolute;
    border: 10px solid hsl(218deg 65% 19%);
    .section {
        border-radius:40px;
    }
    
`;

export const ContainerClose = styled.div`
    height: 70px;
    bottom: 25px;
    right: 25px;
    width: 60px;
    overflow: hidden;
    position: absolute;
    background-color: var(--line);
    border-radius: 60px;
    display:flex;
    align-items: center;
    justify-content: center;
`;

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

export const Title = styled.div`
    
        width: 80vw;
        display: flex;
        justify-content: flex-end;
        position: absolute;
        right: 40px;
        line-height: 10vh;
        color: ${props => props.color};
        font-weight: bold;
        font-size: ${props => props.size}vh; 
        
`;

export const Svg = styled.svg`
  margin:15px;
  height:20px;
  width:20px;
  stroke: ${props => props.color};
  stroke-width:0;
  :hover{
    transform: scale(0.9);
  }
`;

export const Svglight = styled.svg`
    height: 35px;
    width: 35px;
    stroke:${props => props.color};
    margin-top: 10px;
    margin-bottom: 10px;
    :hover {
        transform: scale(0.9);
    }  
`;

export const Space = styled.div`
  height: 55vh;
`;

export const P = styled.p`
  padding: 5vw;
  color: ${props => props.color};
  position: relative;
`;