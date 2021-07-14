
import { useState } from "react";
import { Calendar , utils } from "react-modern-calendar-datepicker";
import { Line , Container , Logo , LineMenu  , Card , Grid} from "./styled";

export default function Choose () {

    const menu = [
        {
            "nome":"manubimbo",
            "prezzo":"100"
        },
        {
            "nome":"gigidag",
            "prezzo":"100"
        },
        {
            "nome":"zannabiancasuprema",
            "prezzo":"100"
        }
    ]

    const giorni = [
        {
            "giorno":"20 agosto",
        },
        {
            "giorno":"27 agosto",
        },
        {
            "giorno":"29 agosto",
        },
    ]

    const orari = [
        {
            "orario":"6",
        },
        {
            "orario":"8",
        },
        {
            "orario":"7",
        },
    ]

    return(
        <Container>
            <Logo></Logo>
            <Grid drag="x" dragConstraints={{
                left: -550,
                right: 0,
                }}>
            <LineMenu>
                {menu.map((a) => (
                    <Card key={a.nome} ></Card>
                ))}
            </LineMenu>
            </Grid>
            <Grid drag="x" dragConstraints={{
                left: -550,
                right: 0,
                }}>
            <Line>
                {giorni.map((b) => (
                    <Card key={b.giorno} ></Card>
                ))}
            </Line>
            </Grid>
            <Grid drag="x" dragConstraints={{
                left: -550,
                right: 0,
                }}>
            <Line>
                {orari.map((c) => (
                    <Card key={c.orario} ></Card>
                ))}
            </Line>
            </Grid>
    </Container>
    );
}