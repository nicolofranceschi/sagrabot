import { useRef, useState, lazy, Suspense,  useMemo, useEffect } from "react";
import { usePinch } from 'react-use-gesture';
import useIntersectionObserver from "../useIntersectionObserver";
import { useWindowSize } from "../useWindowSize.js";
import { Container, Grid } from "./Styled";
import { getUserDocument } from "../firebase";
import PixelSettings from "./PixelSettings";

const Pixel = lazy(() => import('./Pixel.jsx'));

const initialGridSize = 2500;
const cellsNumber = 50;
const cells = [...Array(cellsNumber ** 2)];

const getIndexFromXY = (x, y) => cellsNumber * y + x;

const getxy = i => {
  const y = Math.trunc(i / cellsNumber);
  const x = i - (cellsNumber * y)
  return { x, y }
}

function getClosePlaces (i) {
  const { x, y } = getxy(i);
  return [
    getIndexFromXY(x+1, y+0),
    getIndexFromXY(x+1, y+1),
    getIndexFromXY(x+1, y-1),
    getIndexFromXY(x+0, y+1),
    getIndexFromXY(x+0, y-1),
    getIndexFromXY(x-1, y+0),
    getIndexFromXY(x-1, y+1),
    getIndexFromXY(x-1, y-1),
  ]
}

const getCovidPixels = (occupied, available) => Object.entries(occupied).reduce((acc, [i, spot]) => ({
  ...acc,
  [i]: spot,
  ...(getClosePlaces(i).filter(close => {
    if (!available[close] || available[close].type !== 1) return false;
    if (occupied[close]) return false;
    else return true;
  }).reduce((internalAcc, j) => ({ ...internalAcc, [j]: { type: 'covid' } }), {}))
}), {});

export default function Prenotazioni () {
  const [[gridSize, pixelSize], setSize] = useState([initialGridSize, initialGridSize / cellsNumber]);
  const [data, setData] = useState({});
  const [selected, setSelected] = useState({});

  console.log(getCovidPixels(selected, data));
  
  const DrawingGrid = useRef(null);
  const { height, width } = useWindowSize();

  useEffect(() => {
    (async function() {
      const res = await getUserDocument('gzDP6bxoUcWKC71dye7PkVrB5y52');
      setData(res.sale['test']);
    })();
  }, []);

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
  
  const select = (i) => { 
      console.log('ho prenotato il posto ', i, getxy(i)); 
      setSelected(current => ({ ...current, [i]: { type: 'default' }})) 
    };
    

  const grid = useMemo(() => cells.map((_, i) => (
    <ObservedPixel key={i}>
      {ref => <Pixel i={i} data={data[i]} selected={selected} onSelect={select} ref={ref} />}
    </ObservedPixel>
  )), [data]);

  return (
    <Suspense fallback={<Loading />}>
        <PixelSettings></PixelSettings>
      <Container ref={DrawingGrid}>
        <Grid gridSize={gridSize} pixelSize={pixelSize} tabIndex={0}>
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
  return isVisible ? children(ref) : <div ref={ref} style={{backgroundColor:'hsl(218, 24%, 15%)'}}/>;
}