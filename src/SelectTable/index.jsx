import { useRef, useState,  useEffect, memo } from "react";
import { usePinch } from 'react-use-gesture';
import useIntersectionObserver from "../useIntersectionObserver";
import { useWindowSize } from "../useWindowSize.js";
import { Container, Grid, LoadingDiv , Title } from "./Styled";
import { firestore } from "../firebase";
import PixelSettings from "./PixelSettings";
import Pixel from './Pixel';
import { toast } from 'react-toastify';
import { useSala } from "../App";
import { useHistory } from "react-router-dom";
import Loadingani from "./Animation.json"

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: Loadingani,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const initialGridSize = 1000;
const cellsNumber = 50;
const cells = [...Array(cellsNumber ** 2)];

const getxy = i => {
  const y = Math.trunc(i / cellsNumber);
  const x = i - (cellsNumber * y)
  return { x, y }
}

const SALEUID = 'sala';


export default function Prenotazioni () {
  const [data, setData] = useState({});
  useEffect(() => {
    firestore.collection("users").doc("sala").onSnapshot((snapshot) => {  
        setData(snapshot.data()?.sale['SAGRA']);
    });
  }, []);
  if (Object.keys(data).length === 0) return <Loading />;
  return <MappaPrenotazioni data={data} />
}

function MappaPrenotazioni ({ data }) {
  const history = useHistory();
  const { height, width } = useWindowSize();
  const { prenotazioni: [, setPrenotazioni], user: [user], orario: [orario] } = useSala();
  const [selected, setSelected] = useState({});
  const [[gridSize, pixelSize], setSize] = useState([initialGridSize, initialGridSize / cellsNumber]);
  
  const DrawingGrid = useRef(null);

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

  const select = ({i,data}) => {
    const tavolonumero = getnumber(i);
    setSelected(current => ({ ...current, [i]: { type: 'default' , tavolo : tavolonumero  } }));
  };

  const getnumber = (i) => {
    let a=i;
    const giavisti=[i];
    while (data[a]?.type!==2){
      if(data[a+50]!==undefined && data[a+50]?.color!=="hsl(218, 24%, 15%)" && !giavisti.some(elemento => elemento===a+50)) {a=a+50;giavisti.push(a);}
      else if(data[a+49]!==undefined && data[a+49]?.color!=="hsl(218, 24%, 15%)" && !giavisti.some(elemento => elemento===a+49)) {a=a+49;giavisti.push(a);}
      else if(data[a+51]!==undefined && data[a+51]?.color!=="hsl(218, 24%, 15%)" && !giavisti.some(elemento => elemento===a+51)) {a=a+51;giavisti.push(a);}
      else if(data[a+1]!==undefined && data[a+1]?.color!=="hsl(218, 24%, 15%)" && !giavisti.some(elemento => elemento===a+1)) {a=a+1;giavisti.push(a);}
      else if(data[a-1]!==undefined && data[a-1]?.color!=="hsl(218, 24%, 15%)" && !giavisti.some(elemento => elemento===a-1)) {a=a-1;giavisti.push(a);}
      else if(data[a-50]!==undefined && data[a-50]?.color!=="hsl(218, 24%, 15%)" && !giavisti.some(elemento => elemento===a-50)) {a=a-50;giavisti.push(a);}
      else if(data[a-51]!==undefined && data[a-51]?.color!=="hsl(218, 24%, 15%)" && !giavisti.some(elemento => elemento===a-51)) {a=a-51;giavisti.push(a);}
      else if(data[a-49]!==undefined && data[a-49]?.color!=="hsl(218, 24%, 15%)" && !giavisti.some(elemento => elemento===a-49)) {a=a-49;giavisti.push(a);}
      else break
    }
    if(data[a]?.text===undefined) return "TBD"
    else return data[a]?.text
  };

  const confirm = () => {
    setPrenotazioni([data, selected]);
  }
  
  if (!orario.data || !user) {
    toast.error("Hai perso lo stack di prenotazione, RIPROVA");
    console.log("ERRORE, REDIRECT")
    history.replace('/');
  }

  const pixelsContainerRef = useRef();

  const entry = useIntersectionObserver(pixelsContainerRef);
  const isVisible = !!entry?.isIntersecting;

  return (
    <>
      { !isVisible && <Loading />}
      { isVisible && <PixelSettings onClick={confirm} data={orario} selected={selected} setSize={setSize} gridSize={gridSize} pixelSize={pixelSize} />}
      <Container ref={DrawingGrid}>
        <Grid gridSize={gridSize} pixelSize={pixelSize} tabIndex={0} ref={pixelsContainerRef}>
          <Pixels data={data} selected={selected} setSelected={setSelected} orario={orario} onSelect={select} />
        </Grid>
      </Container>
    </>
  );
}

const Pixels = memo(({ data, selected, setSelected, orario, onSelect }) => (
  <>
  {cells.map((_, i) => (
    <ObservedPixel key={i}>
      {ref => <Pixel i={i} data={data[i]} selected={selected[i]} setSelected={setSelected} orario={orario} onSelect={onSelect} ref={ref} />}
    </ObservedPixel>
  ))}
  </>
));

const Loading = () => (
  <LoadingDiv>
    <Title>Caricamento ... </Title>
  </LoadingDiv>
);

function ObservedPixel({ children }) {
  const ref = useRef();
  const [, setVisible] = useState(false);

  const entry = useIntersectionObserver(ref);
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => { if (isVisible) setVisible(true) }, [isVisible]);
  return isVisible ? children(ref) : <div ref={ref} style={{ backgroundColor: 'hsl(218, 24%, 15%)', borderColor: 'var(--line)' }} />;
}
