import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { firestore, getdatanumeri, getdatasala, getUserDocument, updatedatasala, updateUserDocument } from "../firebase";
import { Card, Container, Tavoli, TavoliText, Select, Text, Find, LineButton, Selectbig, Testofluo, Allergie, P1, P2, LoginForm, Input, Button, Eliminazione, ButtonTavoli, Testo, Left, P, Menuimg, Menu, Right, Space, TestoBig, Line, Pop, Blocco, Close, Title, Titlelitte, Flex, Svgout, Scroll, See } from './styled';
import { logout } from "../firebase";
import allergie from "./allergie.png"
import Menu0 from "./MENU0.png";
import Menu1 from "./MENU1.png";
import Menu2 from "./MENU2.png";
import Menu3 from "./MENU3.png";
import PlusButton from "../components/PlusButton"
import { useForm } from "react-hook-form";
import { useSala } from "../App";
import Bussola from "./../Bussola"
import { CSVLink, CSVDownload } from "react-csv";


const SALEUID = 'sala';



const menu = [
    { key: 0, menu: "Menu adulti", img: Menu0 },
    { key: 1, menu: "Menu bambini", img: Menu1 },
    { key: 2, menu: "Menu adulti ciliaci", img: Menu3 },
    { key: 3, menu: "Menu bambini ciliaci", img: Menu2 }
]

export default function HomeAdmin() {

    const [data, setData] = useState(null);
    const [numeri, setnumeri] = useState(null);
    const { admin: [admin, setAdmin] } = useSala();
    const [prenotazioni, setPrenotazioni] = useState({});
    const [onlydefault, setOnlyDefault] = useState({});
    const [deletes, setDeletes] = useState(true);
    const [see, setSee] = useState(true);
    const [deletemode, setDeletemode] = useState(true);
    const [page, setPage] = useState({
        state: false,
        qr: false,
        value: null,
        counter: [0, 0, 0, 0],
        tavoli: []
    });
    const [filter, setFilter] = useState({ filter: "", type: "end" });
    const [filterdata, setFilterdata] = useState({ data: "" });

    const filtered = useMemo(() => Object.entries(onlydefault).reduce((acc, [key, item]) => {

        return {
            ...acc,
            ...(key.startsWith(filterdata.data) ? { [key]: item } : {})
        }
    }, {}), [filterdata, onlydefault]);

    const filteredData = useMemo(() => Object.entries(filtered).reduce((acc, [key, item]) => {

        if (filter.type === "end") return {
            ...acc,
            ...(key.endsWith(filter.filter) ? { [key]: item } : {})
        }; else return {
            ...acc,
            ...(item.some(item => item.tavolo === filter.filter) ? { [key]: item } : {})
        };
    }, {}), [filter, filtered]);

    const { register, handleSubmit } = useForm();

    const onSubmit = data => setFilter({ filter: data.numero, type: data.type });
    const onSubmitdata = data => setFilterdata({ data: data.data });

    useEffect(async () => {

        try {

            firestore.collection("users").doc("sala").onSnapshot((doc) => {

                if (doc.data().sale['SAGRA'] !== null) setData(doc.data().sale['SAGRA']);

                const newPrenotazioni = Object.entries(doc.data().sale['SAGRA']).reduce((acc, pixel) => {

                    const [key, value] = pixel;
                    const { prenotazioni } = value;

                    if (!prenotazioni || prenotazioni.length === 0) return acc;

                    const temp = value.prenotazioni.reduce((accPrenotazioni, prenotazione) => {
                        return ({
                            ...accPrenotazioni,
                            [`${prenotazione.data}-${prenotazione.orario}-${prenotazione.user}`]: { ...prenotazione, pixel: key }
                        });
                    }, {});
                    return {
                        ...acc,
                        ...Object.entries(temp).reduce((externalAcc, [id, current]) => ({
                            ...externalAcc,
                            [id]: [...(acc[id] ?? []), current]
                        }), {})
                    }
                }, {});

                const defaultposti = Object.entries(newPrenotazioni).reduce((acc, current) => {

                    const [key, value] = current;
                    const temp = value.filter((currents) => currents.type === "default");
                    return { ...acc, [key]: temp }
                }, {});

                setOnlyDefault(defaultposti);

                setPrenotazioni(newPrenotazioni);

            });

        } catch (error) {
            console.log(error)
            toast.error(error.message, {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                draggable: true,
            });
        }
    }, [deletes])
    
    const deleteprenotazioni = async (value) => {

        function removePrenotazione(pixel) {
            //const index = pixel.prenotazioni.findIndex(p => p.data === prenotazione.data && p.orario === prenotazione.orario && p.user === prenotazione.user);
            return {
                ...pixel,
                prenotazioni: []
            }
        }

        const newData = Object.entries(data).reduce((acc, [key, pixel]) => {

            
            return {
                ...acc,
                [key]:  removePrenotazione(pixel)
            }
        }, {});
        try {
            const res = await updateUserDocument({ uid: SALEUID }, { sale: { SAGRA: newData } });
            setDeletes(!deletes)
            toast.success("Prenotazione cancellata");
        } catch (error) {
            toast.error(error);
        }
    }


    const sumMenu = ({ value, key }) => {

        console.log(value);

        let state = 0;
        let menu = value[state].menu;

        for (let i = 0; i < value.length; i++) {
            if (value[state].menu.toString() !== value[i].menu.toString()) {
                for (let a = 0; a < 4; a++) { menu[a] = value[state].menu[a] + value[i].menu[a]; } state = i;
            }
        }

        let temp = value[0].tavolo;
        let tavoli = [value[0].tavolo];

        for (let i = 0; i < value.length; i++) {

            if (value[i].tavolo !== temp && !tavoli.find(elemento => elemento === value[i].tavolo && value[i].tavolo !== "TBD")) {


                if (value[i].tavolo !== "TBD") {
                    tavoli.push(value[i].tavolo);
                    temp = [value[i].tavolo];
                }
            }
        }

        setPage({ state: true, value: value, key, counter: menu, tavoli: tavoli });
    }

    const uscita = async (values) => {


        function removePrenotazione(pixel, prenotazione) {
            const index = pixel.prenotazioni.findIndex(p => p.data === prenotazione.data && p.orario === prenotazione.orario && p.user === prenotazione.user);
            return {
                ...pixel,
                prenotazioni: [...pixel.prenotazioni.slice(0, index), ...pixel.prenotazioni.slice(index + 1), { ...prenotazione, entrata: false }]
            }
        }

        const newData = Object.entries(data).reduce((acc, [key, pixel]) => {

            const prenotazione = values.find(v => v.pixel === key);

            return {
                ...acc,
                [key]: !prenotazione ? pixel : removePrenotazione(pixel, prenotazione)
            }
        }, {});

        try {

            setPage(false);

            const responsebig = await updateUserDocument({ uid: SALEUID }, { sale: { SAGRA: newData } });

            toast.info("Tag uscita settato correttamente")

        } catch (error) {
            toast.error(error.message)
        }

    }

    const entra = async (values) => {


        function removePrenotazione(pixel, prenotazione) {
            const index = pixel.prenotazioni.findIndex(p => p.data === prenotazione.data && p.orario === prenotazione.orario && p.user === prenotazione.user);
            return {
                ...pixel,
                prenotazioni: [...pixel.prenotazioni.slice(0, index), ...pixel.prenotazioni.slice(index + 1), { ...prenotazione, entrata: true }]
            }
        }

        const newData = Object.entries(data).reduce((acc, [key, pixel]) => {

            const prenotazione = values.find(v => v.pixel === key);

            return {
                ...acc,
                [key]: !prenotazione ? pixel : removePrenotazione(pixel, prenotazione)
            }
        }, {});

        const { counter, tavoli, value, key } = page;

        const user = value[0].user;

        let temp = value[0].allergie;
        let allergie = [value[0].allergie];

        for (let i = 0; i < value.length; i++) {

            if (value[i].allergie !== temp && !allergie.find(elemento => elemento === value[i].allergie)) {
                allergie.push(value[i].allergie);
                temp = [value[i].allergie];
            }
        }

        try {

            const res = await getUserDocument(user.substr(3));
            if (!res) throw new Error("ERRORE nel prendere i dati utente 😞, ricarica");
            const dataprenotazione = { [key]: { menu: counter, user, Ntavoli: tavoli, nome: res?.nome, cognome: res?.cognome, allergie, state: "entrata", persone: value.length, data: new Date() } };

            const response = await getdatasala();
            if (!response) throw new Error("ERRORE nel prendere nel prendere le prenotazioni 😞, ricarica");

            console.log("dataprenotazione", dataprenotazione, "response", response)

            await updatedatasala({ ...dataprenotazione, ...response });

            setPage(false);

            const responsebig = await updateUserDocument({ uid: SALEUID }, { sale: { SAGRA: newData } });

            toast.success("Prenotazione aggiunta al gestionale 🎉")
            toast.info("Tag uscita settato correttamente")

        } catch (error) {
            toast.error(error.message)
        }

    }

    
    const getnumber = async () => {
        const num = await getdatanumeri();
        setnumeri(num);
    }
    useEffect (() => {getnumber();},[])
    
    const csv = [["numero"],...Object.keys(onlydefault).map(key => [key.substring(24)])];

    if (!page.state && Object.keys(filteredData).length > 0) return (
        <div>
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
            <Flex orientation={"row"}>
                <Title size={6}>Admin 🧑‍💻</Title>
                <Svgout className="w-6 h-6" fill="none" onClick={() => { logout(); setAdmin() }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </Svgout>
            </Flex>
            <Container>
                <Scroll>
                
                    <LineButton>
                        <See>
                            {see ?
                                <Find onClick={() => setSee(false)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="lightgreen">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </Find>
                                :
                                <Find onClick={() => setSee(true)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </Find>
                            }
                        </See>
                    </LineButton>
                    <LoginForm onSubmit={handleSubmit(onSubmitdata)}>
                        <Selectbig {...register("data")}>
                            <option value="">ALL</option>
                            <option value="10 Ottobre-alle 12:00">10 Ottobre-alle 12:00</option>
                            <option value="17 Ottobre-alle 12:00">17 Ottobre-alle 12:00</option>
                            <option value="24 Ottobre-alle 12:00">24 Ottobre-alle 12:00</option>
                            <option value="31 Ottobre-alle 12:00">31 Ottobre-alle 12:00</option>
                        </Selectbig>
                        <Button type="submit" margin="5vh 0 0 0" padding="15px 0">
                            <Find xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </Find>
                        </Button>
                    </LoginForm>
                    <LoginForm onSubmit={handleSubmit(onSubmit)}>
                        <Input placeholder="Inserisci numero" type="text" {...register("numero")} />
                        <Select {...register("type")}>
                            <option value="end">NUM</option>
                            <option value="tav">TAV</option>
                        </Select>
                        <Button type="submit" margin="5vh 0 0 0" padding="15px 0">
                            <Find xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </Find>
                        </Button>
                    </LoginForm>
                    <Space size={1}></Space>
                    <PlusButton></PlusButton>
                    {Object.entries(filteredData).map(([key, value], i) => (
                        <div key={i}>
                            {value[0].entrata !== true ?
                                <Card >
                                    <Right color={"#ffade3"} onClick={() => sumMenu({ value, key })}>
                                        <TestoBig line={"10vh"} size={"20vw"} padding={"10px"}>{key.substr(0, 2)}</TestoBig>
                                        <Testo line={"5vh"} padding={"10px"}>{key.substr(2)} </Testo>
                                    </Right>
                                    <Left onClick={() => sumMenu({ value, key })}>
                                        <TestoBig line={"12vh"} size={"20vw"} padding={"20px"}>{value.length}</TestoBig>
                                        <Testo line={"5vh"} padding={"10px"}>POSTI</Testo>
                                    </Left>
                                </Card>
                                : see === true ?
                                    <Card >
                                        <Right color={"var(--line)"} onClick={() => sumMenu({ value, key })}>
                                            <Testofluo line={"5vh"} padding={"10px"}>ENTRATO</Testofluo>
                                            <TestoBig line={"12vh"} size={"20vw"} padding={"20px"}>{key.substr(0, 2)}</TestoBig>
                                        </Right>
                                        <Left onClick={() => sumMenu({ value, key })}>
                                            <TestoBig line={"12vh"} size={"20vw"} padding={"20px"}>{value.length}</TestoBig>
                                            <Testo line={"5vh"} padding={"10px"}>POSTI</Testo>
                                        </Left>
                                    </Card>
                                    : null}
                        </div>
                    ))}
                    <Space size={10}></Space>
                </Scroll>
            </Container>
        </div>
    );
    else if (!page.state) return (

        <div>
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

            <Flex orientation={"row"}>
                <Title size={6}>Admin 🧑‍💻</Title>
                <Svgout className="w-6 h-6" fill="none" onClick={() => { logout(); setAdmin(); }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </Svgout>
            </Flex>
            <LoginForm onSubmit={handleSubmit(onSubmitdata)}>
                <Selectbig {...register("data")}>
                <option value="">ALL</option>
                <option value="10 Ottobre-alle 12:00">10 Ottobre-alle 12:00</option>
                <option value="17 Ottobre-alle 12:00">17 Ottobre-alle 12:00</option>
                <option value="24 Ottobre-alle 12:00">24 Ottobre-alle 12:00</option>
                <option value="31 Ottobre-alle 12:00">31 Ottobre-alle 12:00</option>
                </Selectbig>
                <Button type="submit" margin="5vh 0 0 0" padding="15px 0">
                    <Find xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </Find>
                </Button>
            </LoginForm>
            <LoginForm onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Inserisci numero" type="text" {...register("numero")} />
                <Select {...register("type")}>
                    <option value="end">NUM</option>
                    <option value="tav">TAV</option>
                </Select>
                <Button type="submit" margin="5vh 0 0 0" padding="15px 0">
                    <Find xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </Find>
                </Button>
            </LoginForm>
            <Title size={3}>Nessuna prenotazione per questo filtro 😕</Title>
            <PlusButton></PlusButton>
        </div>

    );
    else return (
        <Blocco>
            <Titlelitte size={3} line={"10vh"}>Riepilogo</Titlelitte >
            <Tavoli>
                <TavoliText >
                    <Text size={"3vw"}>Tavolo numero</Text>
                    <Text size={"10vw"}  >

                        {page.tavoli.map((current) => (
                            <p key={current}>{current}</p>
                        ))}
                    </Text>
                </TavoliText>
            </Tavoli>
            <Bussola page={page}></Bussola>
            <Close onClick={() => setPage({ state: false })} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" height="50px" fill="none" viewBox="0 0 24 24" stroke="red">
                <path strokeLinecap="red" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </Close>
            {page.value.find(elemento => elemento.allergie !== "null") ? <Allergie>
                <P1 color={"white"} size={"10px"}>Questa è una prenotazione con </P1>
                <img src={allergie}></img>
                <P2 color={"#ee404c"} size={"20px"}>ALLERGIE</P2>
            </Allergie> : <div></div>}
            {
                page.value[0].entrata !== true ?
                    <ButtonTavoli onClick={() => entra(prenotazioni[page.key])}>ENTRA</ButtonTavoli>
                    :
                    <ButtonTavoli onClick={() => uscita(prenotazioni[page.key])}>USCITA</ButtonTavoli>
            }
        </Blocco>
    );

}
