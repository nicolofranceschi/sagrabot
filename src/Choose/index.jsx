
import { motion } from "framer-motion";
import { useState , useEffect } from "react";
import { Line, Container, ButtonTavoli, Card, Giorni , Mese ,  Descrizione} from "./styled";
import { Link } from "react-router-dom";


export default function Choose() {

    const giorni = [
        {
            "giorno": "20",
        },
        {
            "giorno": "27",
        },
        {
            "giorno": "30",
        },
        {
            "giorno": "29",
        },
    ]

    const orari = [
        {
            "orario": "6",
        },
        {
            "orario": "8",
        },
        {
            "orario": "9",
        },
        {
            "orario": "10",
        }
    ]

    const [{data , orario}, setMomento]= useState({});

    useEffect(() => {console.log(data,orario)},[orario,data])

    return (
        <Container>
            <Descrizione vh="5vh" >Seleziona una data</Descrizione>
            <motion.div drag="x" dragConstraints={{ left: -850, right: 0 }}>
                <Line > 
                    {giorni.map((b) => (
                        data === b.giorno) ? (
                        <Card  key={b.giorno} color={"pink"} onClick={ () => {setMomento({ orario, data : b.giorno})}}>
                            <Giorni>{b.giorno}</Giorni>
                            <Mese>AGOSTO</Mese>
                        </Card>
                        ):(
                            <Card key={b.giorno}  color={"black"} onClick={ () => {setMomento({ orario, data : b.giorno})}}>
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
                        <Card key={c.orario} onClick={ () => {setMomento({ orario : c.orario, data })}}>
                            <Giorni>{c.orario}</Giorni>
                            <Mese>PM</Mese>
                        </Card>
                    ))}
                </Line>
            </motion.div>
            <Link to="/choose">
        <ButtonTavoli>Seleziona i posti</ButtonTavoli>
        </Link>
        </Container>
    );
}