
import styled from 'styled-components';
import {motion} from "framer-motion";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: auto;
  -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      ::-webkit-scrollbar {
        display: none;
      }
  `;

export const Grid = styled.div`
      background-color: var(--black-light);
      height: ${props => props.gridSize}px;
      width: ${props => props.gridSize}px;
      display: grid;
      grid-template-columns: repeat(70,${props => props.pixelSize}px);
      grid-template-rows: repeat(70,${props => props.pixelSize}px);
      
`;

export const Pixelstyle = styled.div`
      border: 1px solid var(--line);
      box-sizing: border-box;
`;


export const BottomPopup = styled(motion.div)`

  width: ${props => props.width};
  height: ${props => props.height};
  background: white;
  position: absolute;
  border-radius: 20px 20px 0 0;
  z-index: 50;
  margin-top: ${({ marginBottom }) => marginBottom ? `${-marginBottom}px` : 0};
  bottom: ${({ bottom }) => bottom ? `${bottom}px` : 0};
  @media (min-width: 768px) {
    border-radius: 20px;
    top: 20px;
    right: 20px;  
  }
`;

export const Action = styled.div`

     position: absolute;
     top : 0;
     right : 0;
     width: 50px;
     height: 50px;
     background-color: white;
     border-radius: 20px;
`;

export const Color = styled.div`

     position: absolute;
     top : 10%;
     left : 5% ;
     
`;

export const Svg = styled.svg`
 
 position: absolute;
    top : 10px;
    left : 10px;
    height: 30px;
    width: 30px;
    stroke: var(--medium-gray);
    &:hover{
      stroke: var(--black-light);
    }

`;

export const InfoText = styled.h3`
 
    padding-bottom: 10px;
    color:var(--medium-gray)

`;

export const Infodiv = styled.div`
 
    height: 50px;
    width: 100vw;
    background-color: var(--medium-gray);
    display: flex;
    flex-direction: row;
    border-radius: 20px 20px 0 0;
    opacity: 0.5;
    line-height: 50px;
    text-align: center;
    svg{
      position: absolute;
    top : 10px;
    left : 10px;
    height: 30px;
    width: 30px;
    stroke: var(--black-light);
   
    }
`;

export const Icon = styled.div`
 
    height: 50px;
    width: 50px;
    padding-left:10px;
    
`;

export const Text = styled.h3`
 
    color:var(--black-light)
    
`;



