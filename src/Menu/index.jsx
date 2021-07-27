
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Qty, Pezzo, Back, Svg, Pop,P, ButtonTavoli, Line, Descrizione, Card , Testo1, Testo2, Testo3,  Menuimg} from "./styled"
import { Link, Redirect } from "react-router-dom";
import { updateUserDocument } from "../firebase";
import { useSala } from "../App";
import { toast, ToastContainer } from "react-toastify";
import { set } from "react-hook-form";



const cellsNumber = 50;

function getClosePlaces(i, available) {
  const { x, y } = getxy(i);
  const rotation = available.rotation % 360;
  if (rotation === 0) return [
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

  if (rotation === 180 || rotation === -180) return [
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

  if (rotation === 90 || rotation === -270) return [
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

  if (rotation === -90 || rotation === 270) return [
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

const getxy = i => {
  const y = Math.trunc(i / cellsNumber);
  const x = i - (cellsNumber * y)
  return { x, y }
}

const getIndexFromXY = (x, y) => cellsNumber * y + x;

const SALEUID = 'sala';

const getCovidPixels = (occupied, available) => Object.entries(occupied).reduce((acc, [i, spot]) => ({
  ...acc,
  [i]: spot,
  ...(getClosePlaces(i, available[i]).filter(close => {
    if (!available[close] || available[close].type !== 1) return false;
    if (occupied[close]) return false;
    else return true;
  }).reduce((internalAcc, j) => ({ ...internalAcc, [j]: { type: 'covid' } }), {}))
}), {});

export const Menu = () => {

  const { prenotazioni: [temp], user: [user], orario: [orario] } = useSala();

  const menu = [
    { key: 0, menu: "Menu adulti", qty: 0 },
    { key: 1, menu: "Menu bambini", qty: 0 },
    { key: 2, menu: "Menu adulti ciliaci", qty: 0 },
    { key: 3, menu: "Menu bambini ciliaci", qty: 0 }

  ]

  const [counter, setCounter] = useState([0,0,0,0]);

  console.log(counter);

  const confirm = async () => {
    const covidPixels = getCovidPixels(temp[0], temp[1]);
    const newData = Object.entries(data).reduce((acc, [key, value]) => {
      const selectedSpot = covidPixels[key];
      return {
        ...acc,
        [key]: {
          ...value, prenotazioni: [
            ...value?.prenotazioni ?? [],
            ...(selectedSpot ? [{ ...selectedSpot, data: orario.data, orario: orario.orario, user, menu : counter }] : [])
          ]
        }
      };
    }, {});
    try {
      const res = await updateUserDocument({ uid: SALEUID }, { sale: { SAGRA: newData } });
      toast.success("Prenotazione effettuata");
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <Container>
      <ToastContainer
        position="top-right"
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        draggable
        hideProgressBar
      />
      <Descrizione vh="10vh" >Seleziona i menu per la tua prenotazione</Descrizione>
      <motion.div drag="x" position="relative" dragConstraints={{ left: -1000, right: 0 }}>
        <Line >
          {menu.map((current) => (
            <Card key={current.key}>
              <Pop>
                <P>{counter[current.key]}</P>
              </Pop>
              <Menuimg></Menuimg>

             { current.key===0 ? <Testo1>{current.menu}</Testo1> : current.key===1 || current.key===2 ? <Testo2>{current.menu}</Testo2> :  <Testo3>{current.menu}</Testo3>  }
              <Qty>
                <Pezzo onClick={() => {
                  let arr=[];
                  arr=counter;
                  arr[current.key]++;
                  setCounter(arr);
                  console.log(counter[current.key])
                  }}>
                  <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </Svg>
                </Pezzo>
                <Pezzo onClick={() => {
                  let arr=[];
                  arr=counter;
                  arr[current.key]=arr[current.key]-1;
                  setCounter(arr);
                  console.log(counter[current.key])
                  }}>
                  <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </Svg>
                </Pezzo>
              </Qty>
            </Card>))}
        </Line>
      </motion.div>
      <Link to="/choose">
        <Back>
          <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </Svg>
        </Back>
      </Link>
      <Link to="/">
        <ButtonTavoli onClick={() => confirm()}>Completa la prenotazione</ButtonTavoli>
      </Link>
    </Container>
  );
};
