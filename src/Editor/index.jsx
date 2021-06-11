import { useMemo, useRef, useState, lazy, Suspense } from "react";
import { usePinch } from 'react-use-gesture';
import { Container, Grid } from "./Styled.jsx";

const Pixel = lazy(() => import('./Pixel'));
const Tools = lazy(() => import('./Tools'));

const initialGridSize = 4000;
const cellsNumber = 70;

let cells;

export default function Editor() {

  if (window.localStorage.getItem("Grid")===null) cells = useMemo(() => [...Array(cellsNumber ** 2)], []);
  else cells = JSON.parse(window.localStorage.getItem("Grid"));

  const [[gridSize, pixelSize], setSize] = useState([initialGridSize, initialGridSize / cellsNumber]);

  const [{color,type},setStyle] = useState({
    color: "white",
    type: 1,
  })

  const DrawingGrid = useRef(null);

  usePinch(({ vdva }) => {
        setSize(([currentGridSize]) => {
          const newGridSize = currentGridSize + vdva[0] * 100;
          return [newGridSize, gridSize / cellsNumber];
        });
      },

    {
      domTarget: DrawingGrid,
      eventOptions: { passive: false },
    }
    );
    

  return (
    <Suspense fallback={<Loading />}>
      <Container ref={DrawingGrid}>
          <Grid gridSize={gridSize} pixelSize={pixelSize}>
              {cells.map((_, i) => (
                <Pixel key={i} {...{ i, type, color ,cells }} />
              ))}
          </Grid>
      </Container>
      <Tools {...{ setStyle , type, color }} />
    </Suspense>
  );
}

const Loading = () => <span>Loading...</span>;