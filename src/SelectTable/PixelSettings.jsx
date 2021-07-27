

import { Link } from "react-router-dom";
import styled from 'styled-components';



const Svg = styled.svg`
  margin:15px;
  height:20px;
  width:20px;
  stroke: white;
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

export const ButtonTavoli = styled.button`
    position: absolute;
    bottom:5vh;
    left:5vw;
    height: 10vh;
    width: 90vw;
    border-radius: 20px;
    background-color: var(--line);
    font-weight: bold;
    z-index:10;
`;


export default function PixelSettings({ data, onClick }) {
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
      <Link to="/menu">
      <ButtonTavoli onClick={onClick}>Scegli i menu</ButtonTavoli>
      </Link>
    </>
  );

}


