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
  width: 600px;
  background-color: white;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
 
`;
export const LineMenu = styled.div`
  height: 40vh;
  width: 600px;
  background-color: red;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
`;

export const Logo = styled.div`
  height: 10vh;
  width: 100vw;
  background-color: blue;
  overflow: hidden;
`;

export const Card = styled.div`
  height: 80%;
  width: 200px;
  background-color: black;
  margin: 20px;
`;

