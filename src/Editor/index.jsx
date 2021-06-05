import { useMemo, useRef, useState, lazy, Suspense } from "react";
import { useGesture } from 'react-use-gesture';
import { Container, Grid } from "./Styled.jsx";

const Pixel = lazy(() => import('./Pixel'));
const Tools = lazy(() => import('./Tools'));

const initialGridSize = 4000;
const cellsNumber = 70;

export default function Editor() {
  const [[gridSize, pixelSize], setSize] = useState([initialGridSize, initialGridSize / cellsNumber]);
  const [pixelcolor, setpixelcolor] = useState("white");

  const DrawingGrid = useRef(null);

  useGesture(
    {
      onPinch: ({ vdva }) => {
        setSize(([currentGridSize]) => {
          const newGridSize = currentGridSize + vdva[0] * 100;
          return [newGridSize, gridSize / cellsNumber];
        });
      },
    },
    {
      domTarget: DrawingGrid,
      eventOptions: { passive: false },
    }
  );

  const cells = useMemo(() => [...Array(cellsNumber ** 2)], []);

  return (
    <Suspense fallback={<Loading />}>
      <Container ref={DrawingGrid}>
          <Grid gridSize={gridSize} pixelSize={pixelSize}>
              {cells.map((_, i) => (
                <Pixel key={i} selectedColor={pixelcolor} />
              ))}
          </Grid>
      </Container>
      <Tools {...{ setpixelcolor }} />
    </Suspense>
  );
}

const Loading = () => <span>Loading...</span>;