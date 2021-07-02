
import { PixelRotation } from "./Styled.jsx";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Svg0 = styled.svg`
  margin:  15px 10px 15px 15px;
  height:20px;
  width:20px;
  stroke: white;
  fill: white;
  transform: rotate(0deg);
  :hover{
    transform: rotate(-30deg);
  }
`;

const Svg180 = styled.svg`
  margin:  15px 10px 15px 15px;
  height:20px;
  width:20px;
  stroke: white;
  fill: white;
  transform: rotate(180deg);
  :hover{ 
    transform: rotate(150deg);
  }
`;

const Svg = styled.svg`
  margin:15px;
  height:20px;
  width:20px;
  stroke: white;
`;

const BorderBox = styled.div`
  margin:  15px 10px 15px 15px;
  border-radius: 5px;
  height:20px;
  width:20px;
  background-color: white;
  :hover{ 
    transform: scale(1.2);
  }
`;
const Flex = styled.div`
  position: absolute;
  top:0px;
  left:0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  z-index: 10;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const BorderBoxPartial = styled.div`
  margin:  15px 10px 15px 15px;
  border-radius: 0px 5px 5px 0px;
  height:20px;
  width:20px;
  background-color: white;
  :hover{ 
    transform: scale(1.2);
  }
`;

const BorderBoxOne = styled.div`
  margin:  15px 10px 15px 15px;
  border-radius: 0px 0px 5px 0px;
  height:20px;
  width:20px;
  background-color: white;
  :hover{ 
    transform: scale(1.2);
  }
`;

const BorderBoxTwo = styled.div`
  margin:  15px 10px 15px 15px;
  border-radius: 0px 5px 0px 0px;
  height:20px;
  width:20px;
  background-color: white;
  :hover{ 
    transform: scale(1.2);
  }
`;

const LinearBox = styled.div`
  margin:  15px 10px 15px 15px;
  height:20px;
  width:20px;
  background-color: white;
  :hover{ 
    transform: scale(1.2);
  }
`;

const Back = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
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

const Testo = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  text-align: center;
  vertical-align: middle;
  line-height: 50px;
  color: white;
  top:20px;
  left:400px;
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


export default function PixelSettings({ onClickLeft, onClickRight, borderYes, borderNo, borderPartial, borderOne, borderTwo, sala }) {
  return (
    <Flex>
      <PixelRotation>
        <Svg0 onClick={onClickLeft} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.25 261.25"  >
          <path d="M231.385,39C250.293,62.087,261,91.278,261,121.75c0,71.958-58.542,130.5-130.5,130.5S0,193.708,0,121.75
      c0-35.358,13.911-68.463,39.17-93.215c5.917-5.798,15.414-5.701,21.212,0.216s5.701,15.413-0.216,21.212
      C40.713,69.025,30,94.52,30,121.75c0,55.416,45.084,100.5,100.5,100.5s100.333-45.084,100.333-100.5
      c0-21.763-6.916-42.675-19.916-59.781V74c0,8.284-6.716,15-15,15s-15-6.716-15-15V24.006c0-0.002,0-0.004,0-0.004
      C180.917,15.716,187.966,9,196.25,9h50c8.284,0,15,6.716,15,15s-6.716,15-15,15H231.385z"/>
        </Svg0>
        <Svg180 onClick={onClickRight} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.25 261.25"  >
          <path d="M231.385,39C250.293,62.087,261,91.278,261,121.75c0,71.958-58.542,130.5-130.5,130.5S0,193.708,0,121.75
      c0-35.358,13.911-68.463,39.17-93.215c5.917-5.798,15.414-5.701,21.212,0.216s5.701,15.413-0.216,21.212
      C40.713,69.025,30,94.52,30,121.75c0,55.416,45.084,100.5,100.5,100.5s100.333-45.084,100.333-100.5
      c0-21.763-6.916-42.675-19.916-59.781V74c0,8.284-6.716,15-15,15s-15-6.716-15-15V24.006c0-0.002,0-0.004,0-0.004
      C180.917,15.716,187.966,9,196.25,9h50c8.284,0,15,6.716,15,15s-6.716,15-15,15H231.385z"/>
        </Svg180>
        <BorderBox onClick={borderYes}></BorderBox>
        <BorderBoxPartial onClick={borderPartial}></BorderBoxPartial>
        <BorderBoxOne onClick={borderOne}></BorderBoxOne>
        <BorderBoxTwo onClick={borderTwo}></BorderBoxTwo>
        <LinearBox onClick={borderNo}></LinearBox>

      </PixelRotation>
      <Link to="/">
        <Back>
          <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </Svg>
        </Back>
      </Link>
      <Testo>
        <p>{sala}</p>
      </Testo>
    </Flex>
  );

}


