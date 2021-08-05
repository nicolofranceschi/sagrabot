

import { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useWindowSize } from "../useWindowSize";
import verde from "./verde.png";
import blue from "./blue.png";

const Svg = styled.svg`
  margin:15px;
  height:20px;
  width:20px;
  stroke: white;
  stroke-width:0;
  :hover{
    transform: scale(0.9);
  }
`;

const Svgcovid = styled.svg`
  margin:20px;
  height:25px;
  width:25px;
  stroke:red;
  stroke-width:0;
  :hover{
    transform: scale(0.9);
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

export const Text = styled.p`
  
  padding: ${props => props.padding};
  color: white;
  font-size:15px;
  z-index:1001;
  width: ${props => props.width};
  
  
`;

export const FlexText = styled.p`
  
  display: flex;
  flex-direction:row;
  align-items:center;
  justify-content: center;
  
  
`;

export const FlexTavoli = styled.p`
  
  display: flex;
  flex-direction:column;
  align-items:center;
  justify-content: center;
  
  
`;

const Info = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 20vh;
  margin-bottom: 120px;
  right:10px;
  height: 50px;
  width: 50px;
  border-radius: 20px;
  backdrop-filter: blur(30px);
  color:white;
  font-weight: bold;
  z-index:10;
`;

export const Popup = styled.div`
  position: absolute;
  top:0px;
  left:0px;
  height: 100vh;
  width: 100vw;
  border-radius: 20px;
  backdrop-filter: blur(30px);
  z-index:1000;
 
`;

export const Warinig = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top:10vh;
  left:10vw;
  height: 80vh;
  width: 80vw;
  border-radius: 20px;
  background-color: var(--line);
  z-index:1001;
  
`;

export const FlexButton = styled.div`

  position: absolute;
  display: flex;
  flex-direction: row;
  bottom: 0;
  left : 0;
  height: 20vh;
  width: 80vw;
  border-radius: 20px;
  z-index:1001;
  
`;

export const Scroll = styled.div`

  overflow: scroll;
  max-height: 45vh;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
  
  
`;
export const A = styled.a`

  height: 100%;
  width: 50%;
  
  
`;
export const Hyperlink = styled.a`

  color: #adaeff;
  
  
`;
export const Button = styled.div`

  display: flex;
  flex-direction: column;
  font-size: 50px;
  height: 100%;
  font-weight: bold;
  background-color: ${props => props.bg};
  color: ${props => props.color};
  border-radius: 20px;
  width: ${props => props.width}; 
  align-items: center;
  align-content: center;
  justify-content: center;
  z-index:1001;
  p{
    font-size: 30px;
    padding-left: 10px;
  }

  svg{ 
   
    height: 40px;
    :hover{ transform : scale(0.9)}
  }
  
`;

export const Ops = styled.p`
  
  padding: 20px;
  color: white;
  font-size:20px;
  font-weight: bold;
  z-index:1001;
  
`;

export const Tavoli = styled.img`
  
  border-radius: 20px;
  background-attachment: fixed;
  width: 80%;
  
  
`;

const cellsNumber = 50;

export default function PixelSettings({ data, onClick, selected, setSize,  gridSize }) {

  const { height, width } = useWindowSize();
  const [pop , setPop] = useState(true);
  return (
    <>
    {pop ? <Popup>
       <Warinig>
         <Ops>
           Come prenotare  🍽
         </Ops>
           <Scroll>
             <FlexText>
             <Text padding={"20px"}>✅ </Text>
             <Text width={"95%"}>Clicca sul posto che desideri per prenotarlo</Text>
             </FlexText>
             <FlexText>
             <Text padding={"20px"}>❌</Text>
             <Text width={"95%"}>Clicca una seconda volta per cancellarlo</Text>
             </FlexText>
             <FlexText>
            
             <Svgcovid xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" className="h-6 w-6" fill="none" viewBox="0 0 22 22" stroke="red">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </Svgcovid>
             
             <Text width={"95%"}>Posti covid</Text>
             </FlexText>
             <FlexTavoli>
             <Text width={"95%"} padding={"20px"}>Tavoli esterni </Text>
             <Tavoli src={verde}></Tavoli>
             </FlexTavoli>
             <FlexTavoli>
             <Text width={"95%"} padding={"20px"}>Tavoli al coperto </Text>
             <Tavoli src={blue}></Tavoli>
             </FlexTavoli>
             <FlexButton>
             <Button onClick={()=>setPop(false)} color={"white"} bg={"#adaeff"} width={"100%"}>Ho<p>capito</p> </Button>
             </FlexButton>
           </Scroll>
       </Warinig>
     </Popup>:<></>}
      <Link to="/data">
        <Back>
          <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </Svg>
        </Back>
      </Link>
      <Data>{data.data} {data.orario}</Data>
      <Info>
      <Svg  onClick={()=>setPop(true)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </Svg>
      </Info>
      <Zoom>
        <Svg onClick={() => {
          setSize(([currentGridSize]) => {
            if (width < currentGridSize + 10 * 50 && height < currentGridSize + 10 * 50) {
              const newGridSize = currentGridSize + 10 * 50;
              return [newGridSize, gridSize / cellsNumber];
            } else return [currentGridSize, gridSize / cellsNumber];
          });
        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 8a1 1 0 011-1h1V6a1 1 0 012 0v1h1a1 1 0 110 2H9v1a1 1 0 11-2 0V9H6a1 1 0 01-1-1z" />
          <path fillRule="evenodd" d="M2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8zm6-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
        </Svg>
        <Svg onClick={() => {
          setSize(([currentGridSize]) => {
            if (width < currentGridSize - 10 * 50 && height < currentGridSize - 10 * 50) {
              const newGridSize = currentGridSize - 10 * 50;
              return [newGridSize, gridSize / cellsNumber];
            } else return [currentGridSize, gridSize / cellsNumber];
          });
        }} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M5 8a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
        </Svg>
      </Zoom>
      {Object.keys(selected).length ? (
        <Link to="/menu">
          <ButtonTavoli onClick={onClick}>Scegli i menu</ButtonTavoli>
        </Link>
      ) : (
        <Alert>Prenota un tavolo prima di continuare</Alert>
      )}
    </>
  );
}