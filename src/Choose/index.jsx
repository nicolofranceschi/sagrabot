
import { motion } from "framer-motion";
import { Line, Container, Logo, LineMenu, Card, Grid } from "./styled";

const motionDivProps = {
    drag: 'x',
    dragConstraints: {
        left: '-100', right: '100'
    }
}

export default function Choose() {

    const menu = [
        {
            "nome": "manubimbo",
            "prezzo": "100"
        },
        {
            "nome": "gigidag",
            "prezzo": "100"
        },
        {
            "nome": "zannabiancasuprema",
            "prezzo": "100"
        }
    ]

    const giorni = [
        {
            "giorno": "20 agosto",
        },
        {
            "giorno": "27 agosto",
        },
        {
            "giorno": "29 agosto",
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
            "orario": "7",
        },
    ]

    return (
        <Container>
            <Logo></Logo>
            <motion.div {...motionDivProps}>
                <LineMenu>
                    {menu.map((a) => (
                        <Card key={a.nome} ></Card>
                    ))}
                </LineMenu>
            </motion.div>
            <motion.div {...motionDivProps}>
                <Line>
                    {giorni.map((b) => (
                        <Card key={b.giorno} ></Card>
                    ))}
                </Line>
            </motion.div>
            <motion.div {...motionDivProps}>
                <Line>
                    {orari.map((c) => (
                        <Card key={c.orario}></Card>
                    ))}
                </Line>
            </motion.div>
        </Container>
    );
}