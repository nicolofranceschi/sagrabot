import { useRef, useState, lazy, Suspense, useCallback, useMemo, useEffect } from "react";
import { usePinch } from 'react-use-gesture';
import useIntersectionObserver from "../useIntersectionObserver";
import { useWindowSize } from "../useWindowSize.js";
import { Container, Grid } from "./Styled.jsx";
import PixelSettings from "./PixelSettings";
import useLocalStorage from "../useLocalStorage.js";
import { ToastContainer, toast } from 'react-toastify';
import { useSala } from '../App';
import { generateUserDocument } from "../firebase";

const Pixel = lazy(() => import('./Pixel'));
const Tools = lazy(() => import('./Tools'));

const initialGridSize = 2500;
const cellsNumber = 50;
const cells = [...Array(cellsNumber ** 2)];

const arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

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
  const { sala } = useSala();
  const [selectedPixels, setSelectedPixels] = useLocalStorage(sala, {});
  const [[gridSize, pixelSize], setSize] = useState([initialGridSize, initialGridSize / cellsNumber]);
  const [{ color, type , text }, setStyle] = useState({ color: "white", type: 0 , text:"."});

  useEffect(() => {
    toast.info("Autosave enable", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      draggable: true,
    });
  }, []);

  const [doubleClickedIndex, setDoubleClickedIndex] = useState(null);
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

  const noDoubleClicked = () => doubleClickedIndex === null || !selectedPixels[doubleClickedIndex];

  const catchKeyEvent = useCallback(e => {
    if (arrowKeys.includes(e.key)) e?.preventDefault();
    if (noDoubleClicked()) return;
    const { rotation, ...pixelClicked } = selectedPixels[doubleClickedIndex];
    select(doubleClickedIndex, { ...pixelClicked, rotation: rotatePixel(e.key, rotation) });
  }, [doubleClickedIndex, selectedPixels[doubleClickedIndex]]);

  const catchUIEvent = useCallback(e => {
    if (noDoubleClicked()) return;
    const { rotation, ...pixelClicked } = selectedPixels[doubleClickedIndex];
    select(doubleClickedIndex, { ...pixelClicked, rotation: rotatePixel(e.key, rotation) });
  }, [doubleClickedIndex, selectedPixels[doubleClickedIndex]]);

  const borderBox = useCallback(e => {
    if (noDoubleClicked()) return;
    const { border, ...pixelClicked } = selectedPixels[doubleClickedIndex];
    select(doubleClickedIndex, { ...pixelClicked, border: e.key });
  }, [doubleClickedIndex, selectedPixels[doubleClickedIndex]]);

  const select = (i, pixel) => setSelectedPixels(current => ({ ...current, [i]: pixel }));

  const grid = useMemo(() => cells.map((_, i) => (
    <ObservedPixel key={i}>
      {ref => <Pixel {...{ i, type, color, getxy, text , pixelSize }} selected={selectedPixels[i]} onSelect={select} onDoubleClick={setDoubleClickedIndex} ref={ref}/>}
    </ObservedPixel>
  )), [selectedPixels, type, color]);

  const [onClickLeft, onClickRight] = useFunctionVariants(catchUIEvent, ['ArrowLeft', 'ArrowRight']);
  const [
    borderYes,
    borderNo,
    borderPartial,
    borderOne,
    borderTwo
  ] = useFunctionVariants(borderBox, [
    '20px',
    '0px',
    '0px 10px 10px 0px',
    '0px 0px 10px 0px',
    '0px 10px 0px 0px'
  ]);

  const saveMap = async () => {
    const user = await generateUserDocument({ uid: 'sala' }, { phone: '3451302071', sale: { 'SAGRA': selectedPixels }});
    console.log(user);
  }

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
        <PixelSettings {...{ onClickLeft, onClickRight, borderYes, borderNo, borderPartial, borderOne, borderTwo }} sala={sala} />
        <Grid gridSize={gridSize} pixelSize={pixelSize} tabIndex={0} onKeyDown={catchKeyEvent}>
          {grid}
        </Grid>
      </Container>
      <Tools {...{ setStyle, type, color }} />
      <button style={{position: 'absolute', top: 0, left: '50%', width: '50px', height: '50px', backgroundColor: 'white'}} onClick={saveMap}>SALVA</button>
    </Suspense>
  );
}

const Loading = () => <span>Loading...</span>;

const useFunctionVariants = (fn, variants) => useMemo(() => variants.map(key => () => fn({ key })), [fn]);

function ObservedPixel ({ children }) {
  const ref = useRef();
  const [, setVisible] = useState(false);

  const entry = useIntersectionObserver(ref);
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => { if (isVisible) setVisible(true) }, [isVisible]);
  return isVisible ? children(ref) : <div ref={ref} style={{backgroundColor:'red'}}/>;
}