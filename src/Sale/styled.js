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
export const Card = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  cursor: grab;
  background-color: var(--line);
  perspective: 600px;
`;
export const Testo = styled.div`
  text-align: center;
  vertical-align: middle;
  line-height: 20vh;
  color: white;
  transform-style: preserve-3d;
  transform-origin: center right;
  transition: transform 1s;
  font-weight: bold;
  font-size: 5vw; 
`;

export const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 20vh;
  gap: 20px;
  padding: 20px;
  @media only screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr ;
  }
`;