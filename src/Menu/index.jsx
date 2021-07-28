
import { useState} from "react";
import { motion} from "framer-motion";
import { Container, Qty, Pezzo, Back, Svg, Pop,P, SvgBack, ButtonTavoli, Line, Descrizione, Card , Testo1, Testo2, Testo3,  Menuimg} from "./styled"
import { Link, Redirect } from "react-router-dom";
import { updateUserDocument } from "../firebase";
import { useSala } from "../App";
import { toast, ToastContainer } from "react-toastify";
import Menu0 from "./MENU0.png";
import Menu1 from "./MENU1.png";
import Menu2 from "./MENU2.png";
import Menu3 from "./MENU3.png";

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
    { key: 0, menu: "Menu adulti",img: Menu0, qty: 0 },
    { key: 1, menu: "Menu bambini",img: Menu1, qty: 0 },
    { key: 2, menu: "Menu adulti ciliaci",img: Menu3, qty: 0 },
    { key: 3, menu: "Menu bambini ciliaci",img: Menu2, qty: 0 }
  ]

  const [counter, setCounter] = useState([0,0,0,0]);

  if(temp===null) {
    toast.error("Hai perso lo stack di prenotazione , RIPROVA")
    return <Redirect to="/"></Redirect>
  }

  const confirm = async () => {
    const covidPixels = getCovidPixels(temp[1], temp[0]);
    const newData = Object.entries(temp[0]).reduce((acc, [key, value]) => {
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
              <Menuimg src={current.img}></Menuimg>
              {current.key==0 || current.key==2 ? (
              <Qty>
                <Pezzo border={"0px 0px 0px 20px"} color={"#ffade3"} onClick={() => setCounter(c => [...c.slice(0, current.key), c[current.key] + 1, ...c.slice(current.key + 1)])}>
                  <Svg color={"var(--line)"} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </Svg>
                </Pezzo>
                <Pezzo border={"0px 0px 20px 0px"} color={"var(--line)"} onClick={() => setCounter(c => [...c.slice(0, current.key), c[current.key] - 1, ...c.slice(current.key + 1)])}>
                  <Svg color={"#ffade3"} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </Svg>
                </Pezzo>
              </Qty>
              ):(

                <Qty>
                <Pezzo border={"0px 0px 0px 20px"} color={"#adaeff"} onClick={() => setCounter(c => [...c.slice(0, current.key), c[current.key] + 1, ...c.slice(current.key + 1)])}>
                  <Svg color={"var(--line)"} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </Svg>
                </Pezzo>
                <Pezzo border={"0px 0px 20px 0px"} color={"var(--line)"} onClick={() => setCounter(c => [...c.slice(0, current.key), c[current.key] - 1, ...c.slice(current.key + 1)])}>
                  <Svg color={"#adaeff"} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </Svg>
                </Pezzo>
              </Qty>

              )
              }
            </Card>))}
        </Line>
      </motion.div>
      <Link to="/choose">
        <Back>
          <SvgBack xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </SvgBack>
        </Back>
      </Link>
      <Link to="/">
        <ButtonTavoli onClick={confirm}>Completa la prenotazione</ButtonTavoli>
      </Link>
    </Container>
  );
};
