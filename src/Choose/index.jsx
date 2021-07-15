
import { motion } from "framer-motion";
import { Line, Container, Logo, LineMenu, Card, CardMenu , Giorni , Mese , Immagine, Backdrop , Descrizione} from "./styled";
import funghi from './funghi.jpeg'; 
import { Slider } from "./Slider";

export default function Choose() {

    const menu = [
        {
            "nome": "Menu Adulti",
            "prezzo": "200",
            
        },
        {
            "nome": "MenuBimbi",
            "prezzo": "100",
            
        }
    ]

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


    return (
        <Container>
            <LineMenu>
            <Slider/>
            </LineMenu>
                <Descrizione vh="45vh" >Seleziona una data</Descrizione>
            <motion.div drag="x" dragConstraints={{ left: -450, right: 0 }}>
                <Line > 
                    {giorni.map((b) => (
                        <Card key={b.giorno} >
                            <Giorni>{b.giorno}</Giorni>
                            <Mese>AGOSTO</Mese>
                        </Card>
                    ))}
                </Line>
            </motion.div>
                <Descrizione vh="70vh" >Seleziona un orario</Descrizione>
            <motion.div drag="x" dragConstraints={{ left: -450, right: 0 }}>
                <Line>
                    {orari.map((c) => (
                        <Card key={c.orario}>
                            <Giorni>{c.orario}</Giorni>
                            <Mese>PM</Mese>
                        </Card>
                    ))}
                </Line>
            </motion.div>
        </Container>
    );
}