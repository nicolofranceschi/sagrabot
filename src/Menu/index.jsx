
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, Qty, Pezzo, Back, Svg, Pop, P, SvgBack, Form, Alert,ButtonCaricamento, Alert2, ButtonTavoli2, ButtonFlex, ButtonFlexend, Info, Button, Input, Allergie, ButtonTavoli, Close, Line, Descrizione, Card, Menuimg } from "./styled"
import { Link, Redirect, useHistory } from "react-router-dom";
import { updateUserDocument,firestore } from "../firebase";
import { useSala } from "../App";
import { toast, ToastContainer } from "react-toastify";
import Menu0 from "./MENU0.png";
import Menu1 from "./MENU1.png";
import Menu2 from "./MENU2.png";
import allergie from "./allergie.png"
import { useForm } from "react-hook-form";


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
  const { prenotazioni: [temp,setPrenotazioni], user: [user], orario: [orario] } = useSala();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const onSubmit = ({ data }) => {
    setAllergie({ state: false, value: data });
  };

  useEffect(() => {
    firestore.collection("users").doc("sala").onSnapshot((snapshot) => { 
        setPrenotazioni([snapshot.data()?.sale['SAGRA'],temp[1]]);
    });
  }, []);

  const menu = [
    { key: 0, menu: "Menu marroni 1", img: Menu0, qty: 0 },
    { key: 1, menu: "Menu marroni 2", img: Menu1, qty: 0 },
    { key: 2, menu: "Menu senza marroni", img: Menu2, qty: 0 },
  ]

  const [counter, setCounter] = useState([0, 0, 0, 0]);

  const [numero, setNumero] = useState(0);
  const [load, setLoad] = useState(true);

  const [zoom, setZoom] = useState({ state: false, value: null });

  const [allergiedata, setAllergie] = useState({ state: false, value: "null" });

  if (temp === null || orario.data === undefined || orario.orario === undefined || user === undefined || orario === undefined) {
    toast.error("Hai perso lo stack di prenotazione , RIPROVA");
    history.replace('/');
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
            ...(selectedSpot ? [{ ...selectedSpot, data: orario.data, orario: orario.orario, user, menu: counter, allergie: allergiedata.value }] : [])
          ]
        }
      };
    }, {});

    try {
      setLoad(false);
      if (!newData) throw new Error("Alcuni dei cambi sono problematici , RIPROVA");
      await updateUserDocument({ uid: SALEUID }, { sale: { SAGRA: newData } });
      toast.info("Verifica qui la prenotazione");
      history.replace('/');
      console.log(user);
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Basic QUNiN2JiNDg5YzBmMTk3MDFmNjdmN2E2YzkwZTk5M2M0NDo5MmQ3MzEwMzc5OWQyNDgyMzY3MTk5YmYyZmY3MjZiZg=="
      );
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("To", user);
      urlencoded.append(
        "MessagingServiceSid",
        "MG0aafad06d3bfbf95158cc632ed31bdb0"
      );
      urlencoded.append(
        "Body",
        `PRENOTAZIONE COMPLETATA, verifica la tua prenotazione su sagrarobot.it`
      );

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(
        "https://api.twilio.com/2010-04-01/Accounts/ACb7bb489c0f19701f67f7a6c90e993c44/Messages.json",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log("mesaggio inivato"))
        .catch((error) => console.log("error", error));
        
      setLoad(true);
    } catch (error) {
      toast.error(error.message);
      history.replace('/');
    }
  }

  useEffect(() => {
    const sum = counter.reduce((acc, value) => acc + value);

    if (Object.keys(temp[1]).length !== sum) setNumero(1);
    if (Object.keys(temp[1]).length === sum) setNumero(0);
    if (Object.keys(temp[1]).length > sum * 2) setNumero(2);

  }, counter)

  if (zoom.state) return (
    <Container>
      <Close onClick={() => setZoom({ state: false })} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" height="50px" fill="none" viewBox="0 0 24 24" stroke="red">
        <path strokeLinecap="red" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </Close>
      <img src={zoom.value}></img>
    </Container>
  )
  if (allergiedata.state) {
    return (
      <Container>
        <Close onClick={() => setAllergie({ state: false })} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" height="50px" fill="none" viewBox="0 0 24 24" stroke="red">
          <path strokeLinecap="red" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </Close>
        <Descrizione vh="4vh" >Inserisici i tuoi allergeni</Descrizione>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" {...register("data")} />
          <ButtonFlex>
            <Button border={"20px 0px 0px 20px"} color={"#ffade3"} type="submit"></Button>
            <Info border={"0px 20px 20px 0px"} color={"#adaeff"} type="button">
              <a href="https://sagrealidosiane.files.wordpress.com/2021/08/sagra-del-porcino-allergeni-2021-2-1.pdf" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Informazione sugli alimenti ai consumatori</p>
              </a>
            </Info>
          </ButtonFlex>
        </Form>
      </Container>
    )
  } else return (
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
      <Allergie onClick={() => setAllergie({ state: true })}>
        <img src={allergie}></img>
        <p>ALLERGIE</p>
      </Allergie>
      <Link to="/choose">
        <Back>
          <SvgBack xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </SvgBack>
        </Back>
      </Link>
      <Descrizione vh="10vh" >Seleziona i menu per la tua prenotazione</Descrizione>
      <motion.div drag="x" position="relative" dragConstraints={{ left: -1000, right: 0 }}>
        <Line >
          {menu.map((current) => (
            <Card key={current.key}>
              <Pop>
                <P>{counter[current.key]}</P>
              </Pop>
              <Menuimg onClick={() => setZoom({ state: true, value: current.img })} src={current.img}></Menuimg>
              {current.key == 0 || current.key == 1 ? (
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
              ) : (

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
      {load ? <ButtonFlexend>
        {numero === 0 ? <ButtonTavoli onClick={confirm}>Completa la prenotazione</ButtonTavoli>
          : numero === 1 ?
            <>
              <Alert2 onClick={() => toast.info("Numero dei menù divero rispetto al numero di posti selezionati")} color={"#ffcc00"} > ⚠ </Alert2>
              <ButtonTavoli2 onClick={confirm}>Completa la prenotazione</ButtonTavoli2>
            </>
            : <Alert color={"#ee404c"}>Menu insufficenti</Alert>}
      </ButtonFlexend>
        :
        <ButtonFlexend>
          <ButtonCaricamento>Caricamento...</ButtonCaricamento>
        </ButtonFlexend>
      }
    </Container>
  );
};
