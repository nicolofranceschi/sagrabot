
import { motion } from "framer-motion";
import { Line, Container, ButtonTavoli, Card, Giorni, Mese, Descrizione , Back , Svg } from "./styled";
import { Link } from "react-router-dom";
import { useSala } from "../App";


export default function Choose() {

  const { orario: [{ data, orario }, setMomento] } = useSala();

  const giorni = [
    { "giorno": "20", },
    { "giorno": "27", },
    { "giorno": "30", },
    { "giorno": "29", },
  ]

  const orari = [
    { "orario": "6", },
    { "orario": "8", },
    { "orario": "9", },
    { "orario": "10", }
  ]

  return (
    <Container>
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
            <Card key={b.giorno} color={"black"} onClick={() => { setMomento({ orario, data: b.giorno + " Agosto" }) }}>
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
          {orari.map((c) => (
            orario === "alle " + c.orario) ? (
            <Card key={c.orario} color={"pink"} onClick={() => { setMomento({ orario: "alle " + c.orario, data }) }}>
              <Giorni>{c.orario}</Giorni>
              <Mese>PM</Mese>
            </Card>
          ) : (
            <Card key={c.orario} color={"black"} onClick={() => { setMomento({ orario: "alle " + c.orario, data }) }}>
              <Giorni>{c.orario}</Giorni>
              <Mese>PM</Mese>
            </Card>
          )
          )}
        </Line>
      </motion.div>
      <Link to="/choose">
        <ButtonTavoli>Seleziona i posti</ButtonTavoli>
      </Link>
    </Container>
  );
}