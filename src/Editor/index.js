import { Container , Grid } from  "./Styled.js";

import  {  useMemo, useRef, useState } from "react";

import { useGesture } from 'react-use-gesture'


import { Pixel } from "./Pixel"

import { Tools } from "./Tools"


const cellsNumber = 70;

export default function Editor() {

  const [gridSize, setgridSize] = useState(4000);
  const [pixelSize, setpixelSize] = useState(gridSize/cellsNumber);
  const [pixelcolor , setpixelcolor] = useState("white")

  const DrawingGrid = useRef(null)

  useGesture(
    {
      onPinch: ({ vdva }) => {
        setgridSize((current) => current + vdva[0]*100);
        setpixelSize(gridSize/cellsNumber)
      },
    },
    {
      domTarget: DrawingGrid,
      eventOptions: { passive: false },
    }
  );

  const cells = useMemo(() => [...Array(cellsNumber ** 2)], []);

  return (
    <div>
      <Container ref={DrawingGrid}>
        <Grid pixelSize={pixelSize} gridSize={gridSize} >
          {cells.map((_,i) => (
            <Pixel key={i} selectedColor={pixelcolor}/>
          ))}
        </Grid>
      </Container>
      <Tools {...{setpixelcolor}} />
    </div>
  );
}