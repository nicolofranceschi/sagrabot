import { useRef, useState, lazy, Suspense,  useMemo, useEffect } from "react";
import { usePinch } from 'react-use-gesture';
import useIntersectionObserver from "../useIntersectionObserver";
import { useWindowSize } from "../useWindowSize.js";
import { Container, Grid } from "./Styled.jsx";
import useLocalStorage from "../useLocalStorage.js";
import { useSala } from '../App';

const Pixel = lazy(() => import('./Pixel'));

const initialGridSize = 2500;
const cellsNumber = 50;
const cells = [...Array(cellsNumber ** 2)];

const getxy = i => {
  const y = Math.trunc(i / cellsNumber);
  const x = i - (cellsNumber * y)
  return { x, y }
}

export default function Prenotatore() {

  const [sala] = useSala();
  const [selectedPixels, setSelectedPixels] = useLocalStorage(sala, {});
  const [[gridSize, pixelSize], setSize] = useState([initialGridSize, initialGridSize / cellsNumber]);
  
  const DrawingGrid = useRef(null);
  const { height, width } = useWindowSize();

  usePinch(({ vdva }) => {
    setSize(([currentGridSize]) => {
      if (width < currentGridSize + vdva[0] * 50 && height < currentGridSize + vdva[0] * 50) {
        const newGridSize = currentGridSize + vdva[0] * 50;
        return [newGridSize, gridSize / cellsNumber];
      } else return [currentGridSize, gridSize / cellsNumber];
    });
  }, {
    domTarget: DrawingGrid,
    eventOptions: { passive: false },
  });

  
  const select = (i, pixel) => setSelectedPixels(current => ({ ...current, [i]: pixel }));

  const grid = useMemo(() => cells.map((_, i) => (
    <ObservedPixel key={i}>
      {ref => <Pixel {...{ i, type, color, getxy }} selected={selectedPixels[i]} onSelect={select}  ref={ref}/>}
    </ObservedPixel>
  )), [selectedPixels, type, color]);

  return (
    <Suspense fallback={<Loading />}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Container ref={DrawingGrid}>
        <Grid gridSize={gridSize} pixelSize={pixelSize} tabIndex={0} onKeyDown={catchKeyEvent}>
          {grid}
        </Grid>
      </Container>
    </Suspense>
  );
}

const Loading = () => <span>Loading...</span>;

function ObservedPixel ({ children }) {
  const ref = useRef();
  const [, setVisible] = useState(false);

  const entry = useIntersectionObserver(ref);
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => { if (isVisible) setVisible(true) }, [isVisible]);
  return isVisible ? children(ref) : <div ref={ref} style={{backgroundColor:'red'}}/>;
}