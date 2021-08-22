
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { firestore, updatedatasala } from '../firebase';
import Selectdrink from "../Selectdrink";
import {Link} from "react-router-dom";
import { Card, Container, State, Statebutton, Divinside, Bar, Tavoli, TavoliText, Find, Allergie, P1, P2, LoginForm, Input, Button, Eliminazione, ButtonTavoli, Testo, Left, P, Menuimg, Menu, Right, Space, TestoBig, Line, Pop, Blocco, Close, Title, Titlelitte, Flex, Svgout, Scroll } from './styled';

export default function Insides({ id, setId }) {

    const [data, setData] = useState({});
    const [page, setPage] = useState("entrata");
    const [ordine, setOrdine] = useState({open:false});
    const dd = window.localStorage.getItem("data");
   

    useEffect(() => {

        try {
            firestore.collection("admin").doc("prenotazioni").onSnapshot((doc) => {
               
                if (doc.data() !== null) {
                   
                    if (page === "entrata") {

                        const entrata = Object.entries(doc.data()).reduce((acc, [chiave, valore]) => {
                            if (valore.state === "entrata" && chiave.startsWith(dd.slice(1, -1))) {
                                return { ...acc, [chiave]: { ...valore } }
                            } else return { ...acc}   
                        }, {})

                        setData(entrata);

                    } else {
                        const cassa = Object.entries(doc.data()).reduce((acc, [chiave, valore]) => {
                           
                            if (valore.state === "cassa" && valore.admin === id && chiave.startsWith(dd.slice(1, -1))) { 
                                return { ...acc, [chiave]: { ...valore } } }
                            else return { ...acc }
                        }, {})
                     
                        setData(cassa);
                    }
                }
            });

        } catch (error) {

            console.log(error.message);

        }

    }, [page])


    const updatestate = async ({ key }) => {

        const updateddata = Object.entries(data).reduce((acc, [chiave, valore]) => {

            if (chiave === key) return { ...acc, [key]: { ...valore, state: "cassa", admin: id } }
            else return { ...acc, [chiave]: valore }

        }, {})

        try {

            await updatedatasala(updateddata);
            toast.success("Prenotazione spostata in cassa 🎉");

        } catch (error) {

            toast.error(error.message);

        }

    }

    if(ordine.open) return (

        <Selectdrink ordine={ordine} setOrdine={setOrdine}></Selectdrink>

    )
    else return (
        <div>
            <Flex orientation={"column"}>
                <Flex orientation={"row"}>
                    <Title size={3}>Ciao admin {id}</Title>
                    <Svgout onClick={()=>setId(null)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </Svgout>
                </Flex>
                <Bar>
                    <Statebutton color={page==="entrata" ? "var(--line)" : "var(--black-light)" } onClick={() => setPage("entrata")}>
                        <Divinside color={"greenyellow"}></Divinside>
                        <p>entrata</p>
                    </Statebutton>
                    <Statebutton color={page==="cassa" ? "var(--line)" : "var(--black-light)" } onClick={() => setPage("cassa")}>
                        <Divinside color={"orange"}></Divinside>
                        <p>cassa  </p>
                    </Statebutton>
                    <Link to="/stampa" >
                    <Statebutton color={"var(--black-light)"}>
                        <Divinside color={"red"}></Divinside>
                        <p>stampa</p>
                    </Statebutton>
                    </Link>
                </Bar>
            </Flex>
            <Container>
                <Scroll>
                    {data ? Object.entries(data).sort((a, b) => b[1].data.seconds - a[1].data.seconds).reverse().map(([key, value]) => (
                        <Card onClick={() => value.state==="entrata" ? updatestate({ value, key }): setOrdine({open:true,value,key})  } key={key} >
                            <State>
                                <Divinside color={value.state==="entrata" ? "greenyellow" : "orange" }></Divinside>
                                <p>{value.state}</p>
                            </State>
                            <Right>
                                <Testo line={"5vh"} size={"1vh"} color={"white"} padding={"10px"}>{new Date(value.data.seconds*1000).toLocaleTimeString() }</Testo>
                                <Testo line={"5vh"} size={"3vh"} color={"var(--line)"} padding={"10px"}>{value.nome}</Testo>
                                <Testo line={"5vh"} size={"3vh"} color={"var(--line)"} padding={"10px"}>{value.cognome}</Testo>
                            </Right>
                            <Left>
                                {value.Ntavoli.map((value) => (
                                    <Testo key={value} line={"25vh"} size={"5vh"} padding={"10px"}>{value}</Testo>
                                ))}
                            </Left>

                        </Card>
                    )) : null}
                </Scroll>
            </Container>
        </div>
    );
}