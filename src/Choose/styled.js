import styled from "styled-components";
import { motion } from "framer-motion";
  

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 20vh;
  gap: 20px;
  padding: 20px;
`;

export const Line = styled.div`
  height: 40vh;
  width: 1200px;
  display: flex;
`;


export const Logo = styled.div`
  height: 10vh;
  width: 100vw;
  overflow: hidden;
`;

export const Backdrop = styled.div`
  backdrop-filter: blur(10px);
  border-radius: 0px 0px 20px 20px;
`;

export const Card = styled.div`
  height: 80%;
  width: 300px;
  background-color: white;
  border-radius: 20px;
  margin: 10vh 40px 40px 40px;
  color: ${props => props.color};;
  :hover{
      p{ 
          color:pink;
      }
  }
`;
export const CardMenu = styled.div`
  height: 80%;
  width: 300px;
  background-color: white;
  border-radius: 20px;
  margin: 20px;
  p{
      z-index: 1;
      margin-top: -20px;
      margin-bottom: 30px;
      border-radius: 20px;
      margin-left:10px;
      font-size: 30px;
      word-wrap: break-word;
      font-family: Arial, Helvetica, sans-serif;
  }
  :hover{
      p{ 
          color:pink;
      }
  }
`;

export const Giorni = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 120px;
  padding-left: 10px
`;

export const Mese = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  padding-left:10px;
`;

export const Descrizione = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  padding-left:10px;
  margin: 10px;
  color: white;
  z-index:3;
  position: fixed;
  top: ${props => props.vh};
  left: 10px;
`;
export const ButtonTavoli = styled.button`
  position: absolute;
  bottom:2vh;
  left:5vw;
  height: 6vh;
  width: 90vw;
  border-radius: 20px;
  background-color: white;
  z-index:10;
`;

