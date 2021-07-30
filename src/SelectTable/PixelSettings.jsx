

import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useWindowSize } from "../useWindowSize";

const Svg = styled.svg`
  margin:15px;
  height:20px;
  width:20px;
  stroke: white;
  stroke-width:0;
  :hover{
    transform: scale(1.1);
  }
`;

const Back = styled.div`
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

const Data = styled.div`
  position: absolute;
  text-align: center;
  vertical-align: middle;
  line-height: 50px;
  color: white;
  top:20px;
  right:10px;
  height: 50px;
  width: 200px;
  border-radius: 20px;
  backdrop-filter: blur(30px);
  z-index:10;
  p{
    padding-left: 10px;
    font-weight: bold;
  }
`;

const ButtonTavoli = styled.button`
    position: absolute;
    bottom:5vh;
    left:5vw;
    height: 10vh;
    width: 90vw;
    border-radius: 20px;
    background-color: var(--line);
    color: #adaeff;
    font-weight: bold;
    z-index:10;
    :hover{
      transform: scale(1.2);
    }
`;
const Alert = styled.button`
    position: absolute;
    bottom:5vh;
    left:5vw;
    height: 10vh;
    width: 90vw;
    border-radius: 20px;
    background-color: #adaeff;
    color:white;
    
    font-weight: bold;
    z-index:10;
`;

const Zoom = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom:20vh;
  right:10px;
  height: 100px;
  width: 50px;
  border-radius: 20px;
  backdrop-filter: blur(30px);
  color:white;
  font-weight: bold;
  z-index:10;
`;

const initialGridSize = 1500;
const cellsNumber = 50;

export default function PixelSettings({ data, onClick ,selected,setSize,pixelSize,gridSize}) {

  const { height, width } = useWindowSize();
  return (
    <>
      <Link to="/data">
        <Back>
          <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </Svg>
        </Back>
      </Link>
      <Data>{data.data} {data.orario}</Data>
      <Zoom>
      <Svg onClick={()=>{setSize(([currentGridSize]) => {
      if (width < currentGridSize + 10 * 50 && height < currentGridSize + 10 * 50) {
        const newGridSize = currentGridSize + 10 * 50;
        return [newGridSize, gridSize / cellsNumber];
      } else return [currentGridSize, gridSize / cellsNumber];
    });}} xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24"className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 8a1 1 0 011-1h1V6a1 1 0 012 0v1h1a1 1 0 110 2H9v1a1 1 0 11-2 0V9H6a1 1 0 01-1-1z" />
        <path fillRule="evenodd" d="M2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8zm6-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
      </Svg>
      <Svg onClick={()=>{setSize(([currentGridSize]) => {
      if (width < currentGridSize - 10 * 50 && height < currentGridSize - 10 * 50) {
        const newGridSize = currentGridSize - 10 * 50;
        return [newGridSize, gridSize / cellsNumber];
      } else return [currentGridSize, gridSize / cellsNumber];
    });}} xmlns="http://www.w3.org/2000/svg"  className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M5 8a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
      </Svg>
      </Zoom>
      {Object.keys(selected).length ? (
      <Link to="/menu">
      <ButtonTavoli onClick={onClick}>Scegli i menu</ButtonTavoli>
      </Link>
      ):(
      <Alert>Prenota un tavolo prima di continuare</Alert>
      )}
    </>
  );
}