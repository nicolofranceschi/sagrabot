import { useRef, useState, lazy, Suspense, useMemo, useEffect } from "react";
import { usePinch } from 'react-use-gesture';
import useIntersectionObserver from "../useIntersectionObserver";
import { useWindowSize } from "../useWindowSize.js";
import { Container, Grid , Animation } from "./Styled";
import { updateUserDocument, getUserDocument } from "../firebase";
import PixelSettings from "./PixelSettings";
import { ToastContainer, toast } from 'react-toastify';
import { useSala } from "../App";
import Load from "./Animation.json";

const Pixel = lazy(() => import('./Pixel.jsx'));

const initialGridSize = 2500;
const cellsNumber = 50;
const cells = [...Array(cellsNumber ** 2)];



const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: Load,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const getxy = i => {
  const y = Math.trunc(i / cellsNumber);
  const x = i - (cellsNumber * y)
  return { x, y }
}


const SALEUID = 'sala';

export default function Prenotazioni() {
  const {prenotazioni: [, setPrenotazioni],user:[user],orario: [orario]} = useSala();
  console.log(orario)
  const [[gridSize, pixelSize], setSize] = useState([initialGridSize, initialGridSize / cellsNumber]);
  const [data, setData] = useState({});
  const [selected, setSelected] = useState({});

  const DrawingGrid = useRef(null);
  const { height, width } = useWindowSize();

  useEffect(async ()=> {
  try {
        const res = await getUserDocument(SALEUID);
        if (!res) {res = await getUserDocument(SALEUID); throw "No connection"}
        setData(res?.sale['SAGRA']); 
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        draggable: true,
      });
    }
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
    setSelected(current => ({ ...current, [i]: { type: 'default' } }))
  };

  const grid = useMemo(() => cells.map((_, i) => (
    <ObservedPixel key={i}>
      {ref => <Pixel i={i} data={data[i]} selected={selected[i]} orario={orario} onSelect={select} ref={ref} />}
    </ObservedPixel>
  )), [data, selected]);

  const confirm = () => {
     setPrenotazioni([data, selected]);
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
      <PixelSettings onClick={confirm} data={orario} />
      <Container ref={DrawingGrid}>
        <Grid gridSize={gridSize} pixelSize={pixelSize} tabIndex={0}>
          {grid}
        </Grid>
      </Container>
    </Suspense>
  );
}

const Loading = () => <Animation  options={defaultOptions} />;;

function ObservedPixel({ children }) {
  const ref = useRef();
  const [, setVisible] = useState(false);

  const entry = useIntersectionObserver(ref);
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => { if (isVisible) setVisible(true) }, [isVisible]);
  return isVisible ? children(ref) : <div ref={ref} style={{ backgroundColor: 'hsl(218, 24%, 15%)' }} />;
}
