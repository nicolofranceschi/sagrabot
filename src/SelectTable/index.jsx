import { useRef, useState, lazy, Suspense, useMemo, useEffect } from "react";
import { usePinch } from 'react-use-gesture';
import useIntersectionObserver from "../useIntersectionObserver";
import { useWindowSize } from "../useWindowSize.js";
import { Container, Grid, LoadingDiv  } from "./Styled";
import { getUserDocument } from "../firebase";
import PixelSettings from "./PixelSettings";
import { ToastContainer, toast } from 'react-toastify';
import { useSala } from "../App";
import Load from "./Animation.json";
import {Redirect} from "react-router-dom"
import ReactLoading from 'react-loading';




const initialGridSize = 1500;
const cellsNumber = 50;
const cells = [...Array(cellsNumber ** 2)];


const getxy = i => {
  const y = Math.trunc(i / cellsNumber);
  const x = i - (cellsNumber * y)
  return { x, y }
}


const SALEUID = 'sala';

const Pixel = lazy(() => import('./Pixel.jsx'));

export default function Prenotazioni() {
  
  const { height, width } = useWindowSize();
  const {prenotazioni: [, setPrenotazioni],user:[user],orario: [orario]} = useSala();

  if(orario.data===undefined || user===null) {
    toast.error("Hai perso lo stack di prenotazione , RIPROVA");
    return <Redirect to="/"></Redirect>
  }
  const [[gridSize, pixelSize], setSize] = useState([initialGridSize, initialGridSize / cellsNumber]);
  const [data, setData] = useState({});
  const [selected, setSelected] = useState({});

  const DrawingGrid = useRef(null);

  useEffect(async ()=> {
  try {
        toast.info("🚀🚀🚀🚀🚀🚀🚀🚀🚀", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        });
        const res = await getUserDocument(SALEUID);
        if (!res) throw "ERRORE 😞, ricarica";
        toast.info("Stanza creata 🤪", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        });
        setData(res?.sale['SAGRA']); 
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
      return <Redirect to="/"></Redirect>
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
    setSelected(current => ({ ...current, [i]: { type: 'default' } }));
  };

  const grid = useMemo(() => cells.map((_, i) => (
    <ObservedPixel key={i}>
      {ref => <Pixel i={i} data={data[i]} selected={selected[i]} setSelected={setSelected} orario={orario} onSelect={select} ref={ref} />}
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
      <PixelSettings onClick={confirm} data={orario} selected={selected} setSize={setSize} gridSize={gridSize} pixelSize={pixelSize} />
      <Container ref={DrawingGrid}>
        <Grid gridSize={gridSize} pixelSize={pixelSize} tabIndex={0}>
          {grid}
        </Grid>
      </Container>
    </Suspense>
  );
}

const Loading = () => {
  return (
      <LoadingDiv >
          <ReactLoading type={"bubbles"} color={"#adaeff"} height={200} width={200}  />
      </LoadingDiv>
);}

function ObservedPixel({ children }) {
  const ref = useRef();
  const [, setVisible] = useState(false);

  const entry = useIntersectionObserver(ref);
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => { if (isVisible) setVisible(true) }, [isVisible]);
  return isVisible ? children(ref) : <div ref={ref} style={{ backgroundColor: 'hsl(218, 24%, 15%)' , borderColor: 'var(--line)'}} />;
}
