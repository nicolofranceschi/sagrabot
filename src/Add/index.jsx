import { useEffect, useState } from "react";
import { Container, LoginForm, Containerscr, Adds, Bar, Confirm, Backup, Accedi, Version, Label, InputProps, Scroll, Admin, Icona, Span, Accordion, Checkbox, Textconstol, DivCheckbox, Divspace, Back, Svg, Right, Testo, Left, Card, All } from "./styled";
import { Input, Button, Select, ButtonBig } from "../components/Lib";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { firestore, getdatacoda, getdatasala, updatedatacoda, updatedatasala } from '../firebase';
import { toast } from "react-toastify";
import { Divinside, Statebutton } from "../Insidedata/styled";

export default function Add() {

    const { register, handleSubmit } = useForm();

    const [step, setStep] = useState(0);

    const [confirm, setConfirm] = useState({ state: 0 });

    const [data, setData] = useState({});

    const [page, setPage] = useState({ state: "pending", value: {} })

    const history = useHistory();

    useEffect(() => {
        try {
            firestore.collection("admin").doc("coda").onSnapshot((doc) => {

                if (doc.data() !== null) {

                    if (page.state === "pending") {

                        const entrata = Object.entries(doc.data()).reduce((acc, [chiave, valore]) => {
                            if (valore.state === "pending") {
                                return { ...acc, [chiave]: { ...valore } }
                            } else return { ...acc }
                        }, {})

                        setData(entrata);

                    } else if (page.state === "complete") {
                        const cassa = Object.entries(doc.data()).reduce((acc, [chiave, valore]) => {

                            if (valore.state === "complete") {
                                return { ...acc, [chiave]: { ...valore } }
                            }
                            else return { ...acc }
                        }, {})

                        setData(cassa);
                    } else setData({});
                }
            });

        } catch (error) {

            console.log(error.message);

        }

    }, [page.state])


    const onSubmit = async (data, e) => {

        try {

            const dataprenotazione = { [`${data.data}-+39${data.numero}`]: { menu: [0, 0, 0, 0], user: `+39${data.numero}`, nome: data.nome, cognome: data.cognome, allergie: "null", state: "pending", persone: data.persone, data: new Date() } };

            const response = await getdatacoda();

            console.log(dataprenotazione, response)

            if (!response) throw new Error("ERRORE nel prendere nel prendere le prenotazioni 😞, ricarica");

            await updatedatacoda({ ...dataprenotazione, ...response });

            setStep(0);

            e.target.reset();

            toast.success("Prenotazione aggiunta al gestionale 🎉")

        } catch (e) {

            console.log(e)

        }

    };

    const entrata = async () => {


        const pren = await getdatasala();

        if (!pren) throw new Error("ERRORE nel prendere nel prendere le prenotazioni 😞, ricarica");

        await updatedatasala({ ...{[confirm.value.key]:{...confirm.value.value,state:"entrata"}}, ...response });

        const response = await getdatacoda();

        const updateddata = Object.entries(response).reduce((acc, [chiave, valore]) => {

            if (chiave === confirm.value.key) return { ...acc, [confirm.value.key]: { ...valore, state: "entrato" } }
            else return { ...acc, [chiave]: valore }

        }, {})
        try {

            setPage({ state: "pending" });
            await updatedatacoda(updateddata);
            toast.success("Prenotazione spostata in coda 🥳");
            e.target.reset();

        } catch (error) {

            toast.error(error.message);

        }

        setConfirm({ state: 0 });

    }

    const onUpdate = async (data, e) => {

        const response = await getdatacoda();

        const updateddata = Object.entries(response).reduce((acc, [chiave, valore]) => {

            if (chiave === page.value.key) return { ...acc, [page.value.key]: { ...valore, data: new Date(), Ntavoli: data.tavolo.split(" "), state: "complete" } }
            else return { ...acc, [chiave]: valore }

        }, {})
        try {

            setPage({ state: "pending" });
            await updatedatacoda(updateddata);
            toast.success("Prenotazione spostata in coda 🥳");
            e.target.reset();

        } catch (error) {

            toast.error(error.message);

        }

    };

    const next = (e) => {
        e?.preventDefault();
        setStep((step) => step + 1);
    };

    return (
        <>
            <Bar>
                <Statebutton color={page.state === "pending" ? "var(--line)" : "var(--black-light)"} onClick={() => setPage({ state: "pending" })}>
                    <Divinside color={"greenyellow"}></Divinside>
                    <p>pending</p>
                </Statebutton>
                <Statebutton color={page.state === "complete" ? "var(--line)" : "var(--black-light)"} onClick={() => setPage({ state: "complete" })}>
                    <Divinside color={"orange"}></Divinside>
                    <p>complete</p>
                </Statebutton>
            </Bar>
            <Accordion show={step === 0}>
                {page.state === "pending" ?
                    <>
                        <Containerscr>
                            <Scroll>
                                {data ? Object.entries(data).sort((a, b) => b[1].data.seconds - a[1].data.seconds).reverse().map(([key, value]) => (
                                    <Card onClick={() => setPage({ state: "addtable", value: { ...value, key } })} key={key} >
                                        <Right>
                                            <Testo line={"5vh"} size={"1vh"} color={"white"} padding={"10px"}>{new Date(value.data.seconds * 1000).toLocaleTimeString()}</Testo>
                                            <Testo line={"5vh"} size={"3vh"} color={"var(--line)"} padding={"10px"}>{value.nome}</Testo>
                                            <Testo line={"5vh"} size={"3vh"} color={"var(--line)"} padding={"10px"}>{value.cognome}</Testo>
                                        </Right>
                                        <Left>
                                            <Testo key={value} line={"25vh"} size={"5vh"} padding={"10px"}>{value.persone}</Testo>
                                        </Left>
                                    </Card>
                                )) : null}
                            </Scroll>
                        </Containerscr>
                        <Adds onClick={next} type="submit">ADD</Adds>
                    </>
                    : page.state === "addtable" ?
                        <Container>
                            <LoginForm autocomplete="off" onSubmit={handleSubmit(onUpdate)}>
                                <>
                                    <Label>
                                        <Span font={"0.7rem"} bold={"normal"} >1 -</Span>
                                        <Span font={"1.5rem"} bold={"normal"} >Inserisci il </Span>
                                        <Span font={"1.5rem"} bold={"bold"} >tavolo</Span>
                                    </Label>
                                    <Divspace space={"10vh"}></Divspace>
                                    <Input autoComplete={"off"} type="text" {...register("tavolo")} />
                                    <ButtonBig type="submit" margin="5vh 0 0 0" padding="15px 0">AGGIUNGI</ButtonBig>
                                </>
                            </LoginForm>
                        </Container>
                        :
                        <Containerscr>
                            {confirm.state === 0 ? <Scroll>
                                {data ? Object.entries(data).sort((a, b) => b[1].data.seconds - a[1].data.seconds).reverse().map(([key, value]) => (
                                    <Card key={key} onClick={() => setConfirm({ state: 1, value: { key, value } })} >
                                        <Right>
                                            <Testo line={"5vh"} size={"1vh"} color={"white"} padding={"10px"}>{new Date(value.data.seconds * 1000).toLocaleTimeString()}</Testo>
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
                                :
                                <>
                                    <Backup onClick={() => setConfirm({ state: 0 })}>
                                        <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </Svg>
                                    </Backup>
                                    <Confirm onClick={() => entrata()}>ENTRA</Confirm>
                                </>
                            }
                        </Containerscr>
                }
            </Accordion>
            <Container>
                {step === 0 && page.state === "pending" || page.state === "complete" ?
                    <Link to="/">
                        <Back>
                            <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </Svg>
                        </Back>
                    </Link>
                    : page.state === "addtable" ?
                        <Back onClick={() => setPage({ state: "pending", value: {} })}>
                            <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </Svg>
                        </Back>
                        :
                        <Back onClick={() => setStep((step) => step - 1)}>
                            <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </Svg>
                        </Back>

                }

                <LoginForm autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Accordion show={step === 1}>
                        <>
                            <Label>
                                <Span font={"0.7rem"} bold={"normal"} >1 -</Span>
                                <Span font={"1.5rem"} bold={"normal"} >Inserisci il tuo</Span>
                                <Span font={"1.5rem"} bold={"bold"} >nome</Span>
                            </Label>
                            <Divspace space={"10vh"}></Divspace>
                            <Input autoComplete={"off"} type="text" {...register("nome")} />
                            <Button onClick={next} type="submit" margin="5vh 0 0 0" padding="15px 0">AVANTI</Button>
                        </>
                    </Accordion>
                    <Accordion show={step === 2}>
                        <>
                            <Label>
                                <Span font={"0.7rem"} bold={"normal"} >2 -</Span>
                                <Span font={"1.5rem"} bold={"normal"} >Inserisci il tuo</Span>
                                <Span font={"1.5rem"} bold={"bold"} >cognome</Span>
                            </Label>
                            <Divspace space={"10vh"}></Divspace>
                            <Input autoComplete={"off"} type="text" {...register("cognome")} />
                            <Button onClick={next} type="submit" margin="5vh 0 0 0" padding="15px 0">AVANTI</Button>
                        </>
                    </Accordion>
                    <Accordion show={step === 3}>
                        <>
                            <Label>
                                <Span font={"0.7rem"} bold={"normal"} >3 -</Span>
                                <Span font={"1.5rem"} bold={"normal"} >Inserisci il tuo</Span>
                                <Span font={"1.5rem"} bold={"bold"} >numero</Span>
                            </Label>
                            <Divspace space={"10vh"}></Divspace>
                            <Label>
                                <Span font={"1rem"} bold={"normal"} >+39</Span>
                                <Input autoComplete={"off"} type="tel" {...register("numero")} />
                            </Label>
                            <Button onClick={next} type="submit" margin="5vh 0 0 0" padding="15px 0">AVANTI</Button>
                        </>
                    </Accordion>
                    <Accordion show={step === 4}>
                        <>
                            <Label>
                                <Span font={"0.7rem"} bold={"normal"} >4 -</Span>
                                <Span font={"1.5rem"} bold={"normal"} >Inserisci la</Span>
                                <Span font={"1.5rem"} bold={"bold"} >data</Span>
                            </Label>
                            <Divspace space={"10vh"}></Divspace>
                            <Select {...register("data")} >
                                <option value="10 Ottobre-alle 12:00">10 Ottobre-alle 12:00</option>
                                <option value="17 Ottobre-alle 12:00">17 Ottobre-alle 12:00</option>
                                <option value="24 Ottobre-alle 12:00">24 Ottobre-alle 12:00</option>
                                <option value="31 Ottobre-alle 12:00">31 Ottobre-alle 12:00</option>
                            </Select>
                            <Button onClick={next} type="submit" margin="5vh 0 0 0" padding="15px 0">AVANTI</Button>
                        </>
                    </Accordion>
                    <Accordion show={step === 5}>
                        <>
                            <Label>
                                <Span font={"0.7rem"} bold={"normal"} >5 -</Span>
                                <Span font={"1.5rem"} bold={"normal"} >Inserisci n. di</Span>
                                <Span font={"1.5rem"} bold={"bold"} >persone</Span>
                            </Label>
                            <Divspace space={"10vh"}></Divspace>
                            <Input autoComplete={"off"} type="number" {...register("persone")} />
                            <ButtonBig type="submit" margin="5vh 0 0 0" padding="15px 0">GENERA</ButtonBig>
                        </>
                    </Accordion>
                </LoginForm>
            </Container>
        </>
    )
}