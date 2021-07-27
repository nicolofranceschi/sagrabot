
import { motion } from "framer-motion";
import { Line, Container, ButtonTavoli, Card, Giorni, Mese, Descrizione, Back, Svg, Data, CardBig } from "./styled";
import { Link } from "react-router-dom";
import { useSala } from "../App";
import { useEffect } from "react";


export default function Choose() {

  const { orario: [{ data, orario }, setMomento] } = useSala();

  const giorni = [
    { "giorno": "21", },
    { "giorno": "22", },
    { "giorno": "28", },
    { "giorno": "29", },
  ]

  const orari = [
    { "orario": "12:00", },
    { "orario": "18:30", },
    { "orario": "19:30", }
  ]

  const oraricena = [
    { "orario": "18:30", },
    { "orario": "20:30", }
  ]

  useEffect(() => { console.log(data, orario) }, [data, orario])

  return (
    <Container>
      <Data>{data} {orario}</Data>
      <Link to="/">
        <Back>
          <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </Svg>
        </Back>
      </Link>
      <Descrizione vh="10vh" >Seleziona una data</Descrizione>
      <motion.div drag="x" dragConstraints={{ left: -850, right: 0 }}>
        <Line >
          {giorni.map((b) => (
            data === b.giorno + " Agosto") ? (
            <Card key={b.giorno} color={"#ffade3"} onClick={() => { setMomento({ orario, data: b.giorno + " Agosto" }) }}>
              <Giorni>{b.giorno}</Giorni>
              <Mese>AGOSTO</Mese>
            </Card>
          ) : (
            <Card key={b.giorno} color={"white"} onClick={() => { setMomento({ orario, data: b.giorno + " Agosto" }) }}>
              <Giorni>{b.giorno}</Giorni>
              <Mese>AGOSTO</Mese>
            </Card>
          )
          )}
        </Line>
      </motion.div>
      <Descrizione vh="45vh" >Seleziona un orario</Descrizione>
      <motion.div drag="x" dragConstraints={{ left: -850, right: 0 }}>
        <Line>
          {data === "21 Agosto" || data === "28 Agosto" ? ( oraricena.map((c) => (
            orario === "alle " + c.orario) ? (
            <CardBig key={c.orario} color={"#ffade3"} onClick={() => { setMomento({ orario: "alle " + c.orario, data }) }}>
              <Giorni>{c.orario}</Giorni>
              <Mese>AVVISO: La prenotazione non sarà piu valida con un ritardo di 30 minuti</Mese>
            </CardBig>
          ) : (
            <CardBig key={c.orario} color={"white"} onClick={() => { setMomento({ orario: "alle " + c.orario, data }) }}>
              <Giorni>{c.orario}</Giorni>
              <Mese>AVVISO: La prenotazione non sarà piu valida con un ritardo di 30 minuti</Mese>
            </CardBig>
          ))
          ) : (
            orari.map((c) => (
              orario === "alle " + c.orario) ? (
              <Card key={c.orario} color={"#ffade3"} onClick={() => { setMomento({ orario: "alle " + c.orario, data }) }}>
                <Giorni>{c.orario}</Giorni>
                <Mese>AVVISO: La prenotazione non sarà piu valida con un ritardo di 30 minuti</Mese>
              </Card>
            ) : (
              <Card key={c.orario} color={"white"} onClick={() => { setMomento({ orario: "alle " + c.orario, data }) }}>
                <Giorni>{c.orario}</Giorni>
                <Mese>AVVISO: La prenotazione non sarà piu valida con un ritardo di 30 minuti</Mese>
              </Card>
            )
            ))}
        </Line>
      </motion.div>
      <Link to="/choose">
        <ButtonTavoli>Seleziona i posti</ButtonTavoli>
      </Link>
    </Container>
  );
}