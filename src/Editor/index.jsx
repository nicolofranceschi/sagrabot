import { useRef, useState, lazy, Suspense, useCallback, useMemo } from "react";
import { usePinch } from 'react-use-gesture';
import { useWindowSize } from "../useWindowSize.js";
import { Container, Grid } from "./Styled.jsx";
// import useLocalStorage from "../useLocalStorage";

const Pixel = lazy(() => import('./Pixel'));
const Tools = lazy(() => import('./Tools'));

const initialGridSize = 5000;
const cellsNumber = 70;
const cells = [...Array(cellsNumber ** 2)];

const getxy = i => {
  const y = Math.trunc(i/cellsNumber);
  const x = i - (cellsNumber*y)
  return { x, y }
}
export default function Editor() {
  const [selected, setSelected] = useState({ color: "white",type: 0});
  // const [selected, setSelected] = useLocalStorage('selected_pixels', {});
  const [[gridSize, pixelSize], setSize] = useState([initialGridSize, initialGridSize / cellsNumber]);
  const [{ color, type ,x , y }, setStyle] = useState({
    color: "white",
    type: 0,
    x: null,
    y: null
  });

  const DrawingGrid = useRef(null);
  const { height , width }  = useWindowSize();

  usePinch(({ vdva }) => {
    setSize(([currentGridSize]) => {
      if( width < currentGridSize + vdva[0] * 50 && height < currentGridSize + vdva[0] * 50 ){
      const newGridSize = currentGridSize + vdva[0] * 50;
      return [newGridSize, gridSize / cellsNumber];
    }else{
      return [currentGridSize, gridSize / cellsNumber];
    }
    });
  }, {
    domTarget: DrawingGrid,
    eventOptions: { passive: false },
  });

  const select = useCallback((i, pixel) => setSelected(current => ({ ...current, [i]: pixel }) ), []);
  const grid = useMemo(() => cells.map((_, i) => <Pixel key={i} {...{ i, x, y, type, color, getxy}} selected={selected[i]} onSelect={select} />), [selected, type, color]);

  return (
    <Suspense fallback={<Loading />}>
      <Container ref={DrawingGrid}>
        <Grid gridSize={gridSize} pixelSize={pixelSize}>
          {grid}
        </Grid>
      </Container>
      <Tools {...{ setStyle, type, color }} />
    </Suspense>
  );
}

const Loading = () => <span>Loading...</span>;