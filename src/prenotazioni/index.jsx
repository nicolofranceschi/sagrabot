import { useRef, useState, lazy, Suspense, useMemo, useEffect } from "react";
import { usePinch } from 'react-use-gesture';
import useIntersectionObserver from "../useIntersectionObserver";
import { useWindowSize } from "../useWindowSize.js";
import { Container, Grid } from "./Styled";
import { updateUserDocument, getUserDocument } from "../firebase";
import PixelSettings from "./PixelSettings";
import { ToastContainer, toast } from 'react-toastify';
import { useSala } from "../App";

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

function getClosePlaces(i,available) {
  const { x, y } = getxy(i);
  console.log(i,available)

  if(available.rotation==0 || available.rotation==360 ) return [
    getIndexFromXY(x + 1, y + 0),
    getIndexFromXY(x - 2, y + 0),
    getIndexFromXY(x + 1, y + 1),
    getIndexFromXY(x + 1, y - 1),
    getIndexFromXY(x + 0, y + 1),
    getIndexFromXY(x + 0, y - 1),
    getIndexFromXY(x - 1, y + 0),
    getIndexFromXY(x - 1, y + 1),
    getIndexFromXY(x - 1, y - 1),
  ]

  if(available.rotation==180 || available.rotation== -180) return [
    getIndexFromXY(x + 1, y + 0),
    getIndexFromXY(x + 2, y + 0),
    getIndexFromXY(x + 1, y + 1),
    getIndexFromXY(x + 1, y - 1),
    getIndexFromXY(x + 0, y + 1),
    getIndexFromXY(x + 0, y - 1),
    getIndexFromXY(x - 1, y + 0),
    getIndexFromXY(x - 1, y + 1),
    getIndexFromXY(x - 1, y - 1),
  ]

  if(available.rotation==90 || available.rotation==-270) return [
    getIndexFromXY(x + 1, y + 0),
    getIndexFromXY(x + 1, y + 1),
    getIndexFromXY(x + 1, y - 1),
    getIndexFromXY(x + 0, y + 1),
    getIndexFromXY(x + 0, y - 2),
    getIndexFromXY(x + 0, y - 1),
    getIndexFromXY(x - 1, y + 0),
    getIndexFromXY(x - 1, y + 1),
    getIndexFromXY(x - 1, y - 1),
  ]

  if(available.rotation==-90 || available.rotation==270 ) return [
    getIndexFromXY(x + 1, y + 0),
    getIndexFromXY(x + 1, y + 1),
    getIndexFromXY(x + 1, y - 1),
    getIndexFromXY(x + 0, y + 1),
    getIndexFromXY(x + 0, y + 2),
    getIndexFromXY(x + 0, y - 1),
    getIndexFromXY(x - 1, y + 0),
    getIndexFromXY(x - 1, y + 1),
    getIndexFromXY(x - 1, y - 1),
  ]
  
  else return [
    getIndexFromXY(x + 1, y + 0),
    getIndexFromXY(x + 1, y + 1),
    getIndexFromXY(x + 1, y - 1),
    getIndexFromXY(x + 0, y + 1),
    getIndexFromXY(x + 0, y - 1),
    getIndexFromXY(x - 1, y + 0),
    getIndexFromXY(x - 1, y + 1),
    getIndexFromXY(x - 1, y - 1),
  ]
}

const SALEUID = 'sala';

const getCovidPixels = (occupied, available) => Object.entries(occupied).reduce((acc, [i, spot]) => ({
  ...acc,
  [i]: spot,
  ...(getClosePlaces(i,available[i]).filter(close => {
    if (!available[close] || available[close].type !== 1) return false;
    if (occupied[close]) return false;
    else return true;
  }).reduce((internalAcc, j) => ({ ...internalAcc, [j]: { type: 'covid' } }), {}))
}), {});

export default function Prenotazioni() {
  const {orario: [orario]} = useSala();
  const {prenotazioni: [, setPrenotazioni]} = useSala();
  console.log(orario)
  const [[gridSize, pixelSize], setSize] = useState([initialGridSize, initialGridSize / cellsNumber]);
  const [data, setData] = useState({});
  const [selected, setSelected] = useState({});

  const DrawingGrid = useRef(null);
  const { height, width } = useWindowSize();

  useEffect(async ()=> {
  try {
        const res = await getUserDocument(SALEUID);
        if (!res) throw "No connection"
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

  const confirm = async () => {
    const covidPixels = getCovidPixels(selected, data);
    const newData = Object.entries(data).reduce((acc, [key, value]) => {
      const selectedSpot = covidPixels[key];
      return {
        ...acc,
        [key]: { ...value, prenotazioni: [
          ...value?.prenotazioni ?? [],
          ...(selectedSpot ? [{ ...selectedSpot, data: orario.data , orario: orario.orario, user: '3495141095' }] : [])
        ] }
      };
    }, {});
    try {
      const res = await updateUserDocument({ uid: SALEUID }, { sale: { SAGRA: newData }});
      console.log('risultato firebase salvataggio dati', res);
    } catch (error) {
      console.log(error);
    }
     setPrenotazioni(newData);
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

const Loading = () => <span>Loading...</span>;

function ObservedPixel({ children }) {
  const ref = useRef();
  const [, setVisible] = useState(false);

  const entry = useIntersectionObserver(ref);
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => { if (isVisible) setVisible(true) }, [isVisible]);
  return isVisible ? children(ref) : <div ref={ref} style={{ backgroundColor: 'hsl(218, 24%, 15%)' }} />;
}