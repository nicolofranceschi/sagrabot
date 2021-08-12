import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const Motion = styled(motion.div)`
  height:28vh;
  width:100vw;
  transform: translate3d(0px, 0px, 0px) scale(1, 1);
  transform-origin: 50% 50% 0px;
  
`;

export const Header= styled.div`
  height:20vh;
  width:100vw;
  display: flex;
  flex-direction: row;
`;

export const Table = styled.div`
  margin-top: 2vh;
  height:50vh;
  width:100vw;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      ::-webkit-scrollbar {
       display: none;
  }
`;

export const Product = styled.div`
  height:10vh;
  width:90vw;
  display: flex;
  background-color: white;
  border-radius: 20px;
  margin-top: 2vh;
  margin-left: 5vw;
  flex-direction: row;
`;

export const Field = styled.div`
  height:10vh;
  width:70%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color:black;
  font-weight: bold;
`;

export const Quantita = styled.div`
  height:10vh;
  width:15%;
  flex-direction:column;
  display: flex;
  align-items: center;
  justify-content: center;
  color:white;
  background-color: #adaeff;
  font-weight: bold;
  border-radius:20px 0px 0px 20px;
`;

export const Prezzo = styled.div`
  height:10vh;
  width:15%;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  color:white;
  background-color:#ffade3;
  font-weight: bold;
  border-radius: 0px 20px 20px 0px;
`;

export const Tot = styled.div`
  height:10vh;
  width:40%;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  color:white;
  background-color:var(--line);
  font-weight: bold;
  border-radius: 20px;
`;


export const Datiprenotazione= styled.div`
  height:20vh;
  width: 50%;
  padding:10px;
  display: flex;
  flex-direction: column;
`;

export const PP= styled.div`
  
      padding:5px;
      color:white;
      font-size:${props => props.size};
      font-weight:bold;
  
`;

export const Numerotavolo= styled.div`
  width: 50%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  border-radius:20px;
  overflow: scroll;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #ffade3;
  p{
      display: flex;
      align-items: center;
      justify-content: center;
      color:white;
      font-size:20px;
      font-weight:bold;
      height: 10vh;
  }
`;

export const Allergie = styled.div`
  margin-top: 5vh;
  margin-left: 2vw;
  margin-right: 2vw;
  width: 95vw;
  height: 30vh;
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-items: center;
`;



export const AllergieText = styled.button`
   padding: 10px;
   border-radius: 20px 0px 0px 20px;
   background-color: #adaeff;
   color: white;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   width: 30%;
   height: 100%;
   font-size:16px;
   font-weight: bold;
   .p{
    font-size:3px;
   }
`;
export const LittleText = styled.button`
  
    font-size:10px;
    padding-top: 4px;
   
`;



export const AllergieContent = styled.textarea`
   border-radius: 0px 20px 20px 0px;
   background-color: var(--line);
   width: 70%;
   color: white;
   height: 30vh;
   font-size:15px;
   top: 5px;
   padding:5px;
   :focus { outline: none; }
`;

export const Line = styled.div`
  height: 25vh;
  display: flex;
`;

export const Linebig = styled.div`
  margin-top: 2vh;
  height: 30vh;
  display: flex;
`;

export const Card = styled.div`
  margin-top: 2vh;
  height: 25vh;
  width: 40vw;
  max-width: 200px;
  border-radius:20px;
  margin-left : 5vw;
  margin-right : 5vw;
  background-color: white;
  display: flex;
  flex-direction:column;
`;

export const Cardbig = styled.div`
  margin-top: 2vh;
  height: 25vh;
  width: 40vw;
  max-width: 200px;
  border-radius:20px;
  margin-left : 5vw;
  margin-right : 5vw;
  background-color: white;
  display: flex;
  flex-direction:column;
`;

export const Buttonline = styled.div`
  height: 10vh;
  width: 40vw;
  max-width: 200px;
  border-radius:20px;
  display: flex;
  flex-direction:row;
`;

export const Infoline = styled.div`
  height: 15vh;
  width: 40vw;
  max-width: 200px;
  border-radius:20px;
  display: flex;
  flex-direction:column;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Svg = styled.svg`
  margin : auto;
  height: 60%;
  width: 60%;
  stroke: ${props => props.color};
`;

export const P = styled.p`
  font-size: ${props => props.size};
  padding-top: 10px;
  font-weight: bold;
`;

export const Pop = styled.div`
  height: 40px;
  width: 40px;
  z-index: 20;
  background-color: var(--line);
  border-radius: 20px;
  color:white;
  margin-top: -20px;
  margin-left: -20px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  .p{
    font-weight: bold;
  }
`;

export const Pezzo = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  border-radius: ${props => props.border};
  font-size: 30px;
  text-align: center;
  background-color: ${props => props.color};
  :hover{ 
    transform: scale(0.95);
  }
`;

export const ButtonTavoli = styled.button`
  position: absolute;
  bottom:2vh;
  right:5vw;
  height: 10vh;
  width: 70vw;
  color: #ffade3;
  font-weight: bold;
  border-radius: 20px;
  background-color: var(--line);
  z-index:10;
`;


export const DeleteTavoli = styled.button`
  position: absolute;
  bottom:2vh;
  left:5vw;
  height: 10vh;
  width: 30vw;
  color: #ffade3;
  font-weight: bold;
  border-radius: 20px;
  background-color: red;
  z-index:10;
`;