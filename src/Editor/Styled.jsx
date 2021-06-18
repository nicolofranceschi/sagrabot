
import styled from 'styled-components';
import { motion } from "framer-motion";

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

export const Grid = styled.div.attrs(props => ({
  style: {
    height: `${props.gridSize}px`,
    width: `${props.gridSize}px`,
    gridTemplateColumns: `repeat(100, ${props.pixelSize}px)`,
    gridTemplateRows: `repeat(100, ${props.pixelSize}px)`,
  },
}))`
  background-color: var(--black-light);
  display: grid;
`;

export const Pixelstyle = styled.div`
  border: 1px solid var(--line);
  box-sizing: border-box;
  background-color: ${({ pixelColor }) => pixelColor ?? 'var(--black-light)'};
  :hover {
    background-color: ${({ selectedColor }) => selectedColor ?? 'white'};
  }
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
  position: relative;
  top : 0;
  right : 0;
  width: 100%;
  height: 50px;
`;

export const Positiondiv = styled.div`
  position: relative;
  margin-top : 20px;
  padding-left: 5% ;
`;

export const Svg = styled.svg`
  position: absolute;
  top : 10px;
  right : 10px;
  height: 30px;
  width: 30px;
  stroke: var(--medium-gray);
  &:hover {
    stroke: var(--black-light);
  }
`;

export const InfoText = styled.h3`
  padding-bottom: 10px;
  color:var(--medium-gray);
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
    position: relative;
    top : 10px;
    height: 30px;
    width: 30px;
    stroke: var(--black-light);
  }
`;

export const Icon = styled.div`
  height: 50px;
  width: 50px;
  padding-left:5px;
`;

export const Text = styled.h3`
  color:var(--black-light);
`;

export const SelezionaOggetto = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const Quadrato = styled.div`
  height: 50px;
  width: 50px;
  margin-right: 5%;
  border-radius: 5px 5px 5px 5px;
  border: 1px solid var(--line);
  background-color: var(--black-light);
  &:hover{
    transform: scale(1.08);
  }
`;
export const Tavolo = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: row;
  &:hover {
    transform: scale(1.08);
  }

`;
export const PixelTavolo = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const OnlyTavolo = styled.div`
  height: 100%;
  width: 50%;
  border: 1px solid var(--line);
  box-sizing: border-box;
  background-color: ${({ pixelColor }) => pixelColor ?? 'var(--black-light)'};
  :hover {
    background-color: ${({ selectedColor }) => selectedColor ?? 'blue'};
  }
`;
export const Posto = styled.div`
  height: 50px;
  width: 25px;
  border-radius: 5px 5px 5px 5px;
  background-color: var(--black-light);
`;

export const Sedia = styled.div`
  height: 100%;
  width: 50%;
`;

export const Sediastatic = styled.div`
  height: 50px;
  width: 50px;
`;
