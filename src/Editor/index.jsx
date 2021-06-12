import { useRef, useState, lazy, Suspense, useCallback, useMemo } from "react";
import { usePinch } from 'react-use-gesture';
import { Container, Grid } from "./Styled.jsx";
// import useLocalStorage from "../useLocalStorage";

const Pixel = lazy(() => import('./Pixel'));
const Tools = lazy(() => import('./Tools'));

const initialGridSize = 4000;
const cellsNumber = 70;
const cells = [...Array(cellsNumber ** 2)];

export default function Editor() {
  const [selected, setSelected] = useState({});
  // const [selected, setSelected] = useLocalStorage('selected_pixels', {});
  const [[gridSize, pixelSize], setSize] = useState([initialGridSize, initialGridSize / cellsNumber]);

  const [{ color, type }, setStyle] = useState({
    color: "white",
    type: 0,
  });

  const DrawingGrid = useRef(null);

  usePinch(({ vdva }) => {
    setSize(([currentGridSize]) => {
      const newGridSize = currentGridSize + vdva[0] * 50;
      return [newGridSize, gridSize / cellsNumber];
    });
  }, {
    domTarget: DrawingGrid,
    eventOptions: { passive: false },
  });

  const select = useCallback((i, pixel) => setSelected(current => ({ ...current, [i]: pixel }) ), []);
  const grid = useMemo(() => cells.map((_, i) => <Pixel key={i} {...{ i, type, color }} selected={selected[i]} onSelect={select} />), [selected, type, color]);

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