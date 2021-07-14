import styled from "styled-components";
import {
    motion
  } from "framer-motion";
  

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
  height: 25vh;
  width: 800px;
  display: flex;
`;

export const LineMenu = styled.div`
  height: 40vh;
  width: 900px;
  display: flex;
`;

export const Logo = styled.div`
  height: 10vh;
  width: 100vw;
  overflow: hidden;
`;

export const Card = styled.div`
  height: 80%;
  width: 200px;
  background-color: white;
  border-radius: 20px;
  margin: 20px;
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
      margin-bottom: 20px;
      backdrop-filter: blur(10px);
      border-radius: 20px;
      margin-left:10px;
      font-size: 30px;
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

export const Immagine = styled.img`
  overflow: hidden;
  max-height:100%; 
  max-width:100%;
  border-radius: 20px;
  position: center;
  .blur {
      filter: blur(2px);
    }
`;

