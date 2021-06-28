import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  height: 90vh;
  bottom:0;
  width: 100vw;
  border-radius: 20px;
  overflow: hidden;
  position: absolute;
  cursor: grab;
`;

export const Utente = styled(motion.div)`
  height: 90vh;
  width: 100vw;
  border-radius: 3em 3em 0 0;
  z-index:200;
  overflow: hidden;
  position: absolute;
  background-color: white;
  cursor: grab;
`;

export const Svgpiu = styled.svg`
  top : 0;
  right: 40px;
  z-index: 10;
  padding-right: 20px;
  height: 10vh;
  width: 40px;
  border-radius: 20px;
  overflow: hidden;
  position: absolute;
  stroke: white;
  &:hover {
  height: 10vh;
  width: 55px;
  
  }
`;
export const Svgmap = styled.svg`
  top : 0;
  right: 80px;
  z-index: 10;
  padding-right: 20px;
  height: 10vh;
  width: 40px;
  border-radius: 20px;
  overflow: hidden;
  position: absolute;
  stroke: white;
  &:hover {
  height: 10vh;
  width: 55px;
  
  }
`;

export const Svgout = styled.svg`
  top : 0;
  right: 0;
  padding-right: 20px;
  height: 10vh;
  width: 40px;
  border-radius: 20px;
  overflow: hidden;
  position: absolute;
  stroke: white;
  &:hover {
  height: 10vh;
  width: 55px;
  }
`;

export const TextAlert = styled.h2`
  margin: 0;
  position: absolute;
  top: 50%;
  left:0;
  transform: translate(0,-50%);
  text-align: center;
  width:100vw;
  height: 10vh;
  color: var(--main);
`;

export const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 50vh;
  gap: 20px;
  padding: 20px;
  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;