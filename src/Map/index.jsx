import { useRef, useState,  useEffect, memo } from "react";
import { usePinch } from 'react-use-gesture';
import useIntersectionObserver from "../useIntersectionObserver";
import { useWindowSize } from "../useWindowSize.js";
import { Container, Grid, LoadingDiv , Title } from "./Styled";
import { getUserDocument } from "../firebase";
import PixelSettings from "./PixelSettings";
import Pixel from './Pixel';
import { useHistory } from "react-router-dom";
import { Controller } from "react-hook-form";

const initialGridSize = 1000;
const cellsNumber = 50;
const cells = [...Array(cellsNumber ** 2)];

const SALEUID = 'sala';

export default function Map () {
  const history = useHistory();
  const [data, setData] = useState({});

  useEffect(() => {
    async function doStuff () {
      try {
        const res = await getUserDocument(SALEUID);
        if (!res) throw new Error("ERRORE 😞, ricarica");
        setData(res?.sale['SAGRA']);
      } catch (error) {
        history.replace('/');
      }
    }
    doStuff();
  }, []);
  if (Object.keys(data).length === 0) return <Loading />;
  return <MappaPrenotazioni data={data} />
}

function MappaPrenotazioni ({ data }) {
  
  const { height, width } = useWindowSize();
  
  const [[gridSize, pixelSize], setSize] = useState([initialGridSize, initialGridSize / cellsNumber]);
  
  const [selected, setSelected] = useState({});

  const [orario,setOrario] = useState({data:"21 Agosto",orario:"alle 18:30"});

  const statics = Object.entries(data).reduce((acc,[key,value])=>{
    if (value.prenotazioni.some(data=>data.data===orario.data && data.orario===orario.orario && data.type==="default")===true){
      return {...acc,[key]:value.prenotazioni.filter(data=>data.data===orario.data && data.orario===orario.orario && data.type==="default")}
    } else return { ...acc}
  },{})

  const staticscovid = Object.entries(data).reduce((acc,[key,value])=>{
    if (value.prenotazioni.some(data=>data.data===orario.data && data.orario===orario.orario && data.type==="covid")===true){
      return {...acc,[key]:value.prenotazioni.filter(data=>data.data===orario.data && data.orario===orario.orario && data.type==="covid")}
    } else return { ...acc}
  },{})

  let controller = [];

  const menustatics = Object.entries(statics).reduce((acc,[,value])=>{
    
    if (!controller.some(data=>data===value[0].user)){

      controller.push(value[0].user);
    return{ 
      menusum:acc.menusum+value[0].menu[0]+value[0].menu[1]+value[0].menu[2]+value[0].menu[3]
    }
  }else return { ...acc}
  },{menusum:0})

  const datistatistici = {posticovid:Object.keys(staticscovid).length,posti:Object.keys(statics).length,menu:menustatics.menusum}
  console.log(datistatistici)
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

  const pixelsContainerRef = useRef();

  const entry = useIntersectionObserver(pixelsContainerRef);
  const isVisible = !!entry?.isIntersecting;

  return (
    <>
      { !isVisible && <Loading />}
      { isVisible && <PixelSettings datistatistici={datistatistici} setOrario={setOrario} selected={selected} setSize={setSize} gridSize={gridSize} pixelSize={pixelSize} />}
      <Container ref={DrawingGrid}>
        <Grid gridSize={gridSize} pixelSize={pixelSize} tabIndex={0} ref={pixelsContainerRef}>
          <Pixels data={data} selected={selected} setSelected={setSelected} orario={orario}  />
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
