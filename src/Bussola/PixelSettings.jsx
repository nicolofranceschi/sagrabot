

import { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useWindowSize } from "../useWindowSize";
import { useForm } from "react-hook-form";
import Fumetto from "../components/Fumetto"

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

const Data = styled.select`

  background-color:var(--line);
  border-radius: 20px 0px 0px 20px;
  height: 100%;
  padding: 10px;
  -webkit-appearance: none;
  :focus{outline: none;}
  p{
    padding-left: 10px;
    font-weight: bold;
  }
`;

const ButtonTavoli = styled.button`
    position: absolute;
    bottom:0;
    height: 15vh;
    width: 100vw;
    border-radius: 5px;
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
    bottom:0;
    height: 15vh;
    width: 100vw;
    border-radius: 5px;
    background-color: #adaeff;
    color:white;
    font-weight: bold;
    z-index:10;
`;

const Zoom = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom:50px;
  right:10px;
  height: 100px;
  width: 50px;
  border-radius: 20px;
  backdrop-filter: blur(30px);
  color:white;
  font-weight: bold;
  z-index:10;
`;

const Dati = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom:50px;
  left:10px;
  height: 300px;
  width: 70px;
  border-radius: 20px;
  color:white;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  z-index:10;
`;

const Datip = styled.div`
  
  border-radius:20px;
  background-color: var(--line);
  height: 20%;
  width: 100%;
  margin: 5px;
  p{
    height: 100%;
    width: 100%;
    font-size: 10px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    svg{ 
      margin-left: 5px;
      height: 10px;
      width: 10px;
    }
  }
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
  span {
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

export const Buttonform = styled.button`
  
  
  width: 80%;
  height: 100%;
  background-color: aquamarine;
  border-radius: 0px 20px 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg{
    height: 30px;
    width: 30px;
  }
  
  
`;

export const Form = styled.form`
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  text-align: center;
  vertical-align: middle;
  line-height: 50px;
  top:20px;
  right:10px;
  height: 50px;
  width: 200px;
  border-radius: 20px;
  background-color: var(--line);
  color: white;
  z-index:10;
  
  
`;

const cellsNumber = 50;

export default function PixelSettings({ datistatistici, setOrario, setSize, gridSize }) {

  const { height, width } = useWindowSize();
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    setOrario({ data: data.data.substr(0, 9), orario: data.data.substr(10) });
  }

  return (
    <>
      <Link to="/">
        <Back>
          <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </Svg>
        </Back>
      </Link>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Data {...register("data")} >
        <option value="10 Ottobre-alle 12:00">10 Ottobre-alle 12:00</option>
        <option value="17 Ottobre-alle 12:00">17 Ottobre-alle 12:00</option>
        <option value="24 Ottobre-alle 12:00">24 Ottobre-alle 12:00</option>
        <option value="31 Ottobre-alle 12:00">31 Ottobre-alle 12:00</option>
        </Data>
        <Buttonform type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </Buttonform>
      </Form>
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
      <Dati>
        <Datip>
        <Fumetto content="Livello ottimizzazione sala" direction="right">
          <p>{Math.round(datistatistici.posti / datistatistici.posticovid)}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </p>
        </Fumetto>
        </Datip>
        <Datip>
        <Fumetto content="Posti totali" direction="right">
          <p>{Math.round(datistatistici.posti + datistatistici.posticovid)}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          </p>
          </Fumetto>
        </Datip>
        <Datip>
        <Fumetto content="Posti" direction="right">
          <p>{datistatistici.posti}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </p>
          </Fumetto>
        </Datip>
        <Datip>
        <Fumetto content="Posti covid" direction="right">
          <p>{datistatistici.posticovid}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </p>
          </Fumetto>
        </Datip>
        <Datip>
        <Fumetto content="Menu" direction="right">
          <p>{datistatistici.menu}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </p>
          </Fumetto>
        </Datip>
      </Dati>
    </>
  );
}