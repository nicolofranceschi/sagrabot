import { useRef, useState, lazy, Suspense, useCallback, useMemo } from "react";
import { usePinch } from 'react-use-gesture';
import { useWindowSize } from "../useWindowSize.js";
import { Container, Grid } from "./Styled.jsx";
import PixelSettings from "./PixelSettings";
// import useLocalStorage from "../useLocalStorage";

const Pixel = lazy(() => import('./Pixel'));
const Tools = lazy(() => import('./Tools'));

const initialGridSize = 5000;
const cellsNumber = 20;
const cells = [...Array(cellsNumber ** 2)];

const rotatePixel = (key, rotation) => {
  switch (key) {
    case 'ArrowLeft': return rotation - 10;
    case 'ArrowRight': return rotation + 10;
    case 'ArrowUp':
    case 'ArrowDown':
      return rotation + 180;
    default: return rotation;
  }
}

const getxy = i => {
  const y = Math.trunc(i/cellsNumber);
  const x = i - (cellsNumber*y)
  return { x, y }
}
export default function Editor() {
  const [selected, setSelected] = useState({ color: "white", type: 0 });
  // const [selected, setSelected] = useLocalStorage('selected_pixels', {});
  const [[gridSize, pixelSize], setSize] = useState([initialGridSize, initialGridSize / cellsNumber]);
  const [{ color, type }, setStyle] = useState({
    color: "white",
    type: 0
  });
  const [doubleClickedIndex, setDoubleClickedIndex] = useState(null);

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
  const grid = useMemo(() => cells.map((_, i) => <Pixel key={i} {...{ i, type, color, getxy }} selected={selected[i]} onSelect={select} onDoubleClick={setDoubleClickedIndex} />), [selected, type, color]);
  
  const catchKeyEvent = (e) => {
    e?.preventDefault();
    if (doubleClickedIndex === null || !selected[doubleClickedIndex]) return;
    else {
      const { rotation, ...pixelClicked } = selected[doubleClickedIndex];
      select(doubleClickedIndex, { ...pixelClicked, rotation: rotatePixel(e.key, rotation) });
    };
  }

  return (
    <Suspense fallback={<Loading />}>
      <Container ref={DrawingGrid}>
        <Grid gridSize={gridSize} pixelSize={pixelSize} tabIndex={0} onKeyDown={catchKeyEvent}>
          {grid}
        </Grid>
      </Container>
      <Tools {...{ setStyle, type, color }} />
      <PixelSettings onClickLeft={() => catchKeyEvent({ key: 'ArrowLeft' })} onClickRight={() => catchKeyEvent({ key: 'ArrowLeft' })} />
    </Suspense>
  );
}

const Loading = () => <span>Loading...</span>;