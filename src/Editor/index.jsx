import { useRef, useState, lazy, Suspense, useCallback, useMemo, useEffect } from "react";
import { usePinch } from 'react-use-gesture';
import { useWindowSize } from "../useWindowSize.js";
import { Container, Grid } from "./Styled.jsx";
import PixelSettings from "./PixelSettings";
import useLocalStorage from "../useLocalStorage.js";
import { ToastContainer, toast } from 'react-toastify';
import { useSala } from '../App';

const Pixel = lazy(() => import('./Pixel'));
const Tools = lazy(() => import('./Tools'));

const initialGridSize = 5000;
const cellsNumber = 100;
const cells = [...Array(cellsNumber ** 2)];

const rotatePixel = (key, rotation) => {
  switch (key) {
    case 'ArrowLeft': return rotation - 45;
    case 'ArrowRight': return rotation + 45;
    case 'ArrowUp':
    case 'ArrowDown':
      return rotation + 180;
    default: return rotation;
  }
}

const textPixel = (key, text) => {
  if (text) {
    switch (key) {
      case 'Backspace': return "T";
      default: return text + key;
    }
  } else {
    switch (key) {
      case 'Backspace': return "T";
      default: return key;
    }
  }
}

const getxy = i => {
  const y = Math.trunc(i / cellsNumber);
  const x = i - (cellsNumber * y)
  return { x, y }
}

export default function Editor() {
  const [sala] = useSala();
  const [selectedPixels, setSelectedPixels] = useLocalStorage(sala, {});
  const [[gridSize, pixelSize], setSize] = useState([initialGridSize, initialGridSize / cellsNumber]);
  const [{ color, type }, setStyle] = useState({
    color: "white",
    type: 0
  });

  useEffect(() => {
    toast.info("Autosave enable", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      draggable: true,
    });
  }, [])

  const [doubleClickedIndex, setDoubleClickedIndex] = useState(null);

  const DrawingGrid = useRef(null);
  const { height, width } = useWindowSize();

  usePinch(({ vdva }) => {
    setSize(([currentGridSize]) => {
      if (width < currentGridSize + vdva[0] * 50 && height < currentGridSize + vdva[0] * 50) {
        const newGridSize = currentGridSize + vdva[0] * 50;
        return [newGridSize, gridSize / cellsNumber];
      } else {
        return [currentGridSize, gridSize / cellsNumber];
      }
    });
  }, {
    domTarget: DrawingGrid,
    eventOptions: { passive: false },
  });

  const catchKeyEvent = useCallback((e) => {
    e?.preventDefault();
    if (doubleClickedIndex === null || !selectedPixels[doubleClickedIndex]) return;
    else {
      const { rotation, ...pixelClicked } = selectedPixels[doubleClickedIndex];
      if (selectedPixels[doubleClickedIndex].type == 2) {
        select(doubleClickedIndex, { ...pixelClicked, key: textPixel(e.key, selectedPixels[doubleClickedIndex].key) })
      } else select(doubleClickedIndex, { ...pixelClicked, rotation: rotatePixel(e.key, rotation) });
    };
  }, [doubleClickedIndex, selectedPixels[doubleClickedIndex]?.rotation])

  const catchUIEvent = useCallback((e) => {
    if (doubleClickedIndex === null || !selectedPixels[doubleClickedIndex]) return;
    else {
      const { rotation, ...pixelClicked } = selectedPixels[doubleClickedIndex];
      select(doubleClickedIndex, { ...pixelClicked, rotation: rotatePixel(e.key, rotation) });
    };
  }, [doubleClickedIndex, selectedPixels[doubleClickedIndex]?.rotation])

  const borderBox = useCallback((e) => {
    if (doubleClickedIndex === null || !selectedPixels[doubleClickedIndex]) return;
    else {
      const { border, ...pixelClicked } = selectedPixels[doubleClickedIndex];
      select(doubleClickedIndex, { ...pixelClicked, border: e.key });
    };
  }, [doubleClickedIndex, selectedPixels[doubleClickedIndex]?.border])

  const select = (i, pixel) => setSelectedPixels(current => ({ ...current, [i]: pixel }));
  const grid = useMemo(() => cells.map((_, i) => <Pixel key={i} {...{ i, type, color, getxy }} selected={selectedPixels[i]} onSelect={select} onDoubleClick={setDoubleClickedIndex} />), [selectedPixels, type, color]);

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
        <PixelSettings onClickLeft={() => catchUIEvent({ key: 'ArrowLeft' })} onClickRight={() => catchUIEvent({ key: 'ArrowRight' })} borderYes={() => borderBox({ key: "20px" })} borderNo={() => borderBox({ key: "0px" })} borderPartial={() => borderBox({ key: "0px 10px 10px 0px" })} borderOne={() => borderBox({ key: "0px 0px 10px 0px" })} borderTwo={() => borderBox({ key: "0px 10px 0px 0px" })} sala={sala} />
        <Grid gridSize={gridSize} pixelSize={pixelSize} tabIndex={0} onKeyDown={catchKeyEvent}>
          {grid}
        </Grid>
      </Container>
      <Tools {...{ setStyle, type, color }} />
    </Suspense>
  );
}

const Loading = () => <span>Loading...</span>;