import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { firestore,  getdatasala, getUserDocument, updatedatasala, updateUserDocument } from "../firebase";
import { motion } from "framer-motion";
import { Card, Container, Tavoli, TavoliText,  Find, ButtonCancella, Allergie, P1, P2, LoginForm, Input, Button, Eliminazione, ButtonTavoli, Testo, Left, P, Menuimg, Menu, Right, Space, TestoBig, Line, Pop, Blocco, Close, Title, Titlelitte, Flex, Svgout, Scroll } from './styled';
import { logout } from "../firebase";
import allergie from "./allergie.png"
import Menu0 from "./MENU0.png";
import Menu1 from "./MENU1.png";
import Menu2 from "./MENU2.png";
import Menu3 from "./MENU3.png";
import PlusButton from "../components/PlusButton"
import { useForm } from "react-hook-form";

const SALEUID = 'sala';

const menu = [
    { key: 0, menu: "Menu adulti", img: Menu0 },
    { key: 1, menu: "Menu bambini", img: Menu1 },
    { key: 2, menu: "Menu adulti ciliaci", img: Menu3 },
    { key: 3, menu: "Menu bambini ciliaci", img: Menu2 }
]

export default function HomeAdmin() {

    const [data, setData] = useState(null);
    const [user, setUser] = useState(null);
    const [prenotazioni, setPrenotazioni] = useState({});
    const [onlydefault, setOnlyDefault] = useState({});
    const [deletes, setDeletes] = useState(true);
    const [page, setPage] = useState({
        state: false,
        qr: false,
        data: null,
        counter: [0, 0, 0, 0],
        tavoli: []
    });
    const [filter, setFilter] = useState('');
    const filteredData = useMemo(() => Object.entries(onlydefault).reduce((acc, [key, item]) => ({
        ...acc,
        ...(key.endsWith(filter) ? { [key]: item } : {})
    }), {}), [filter, onlydefault]);

    const { register, handleSubmit } = useForm();

    const onSubmit = data => setFilter(data.numero);

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

        function removePrenotazione(pixel, prenotazione) {
            const index = pixel.prenotazioni.findIndex(p => p.data === prenotazione.data && p.orario === prenotazione.orario && p.user === prenotazione.user);
            return {
                ...pixel,
                prenotazioni: [...pixel.prenotazioni.slice(0, index), ...pixel.prenotazioni.slice(index + 1)]
            }
        }

        const newData = Object.entries(data).reduce((acc, [key, pixel]) => {

            const prenotazione = value.find(v => v.pixel === key);
            return {
                ...acc,
                [key]: !prenotazione ? pixel : removePrenotazione(pixel, prenotazione)
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


    const sumMenu = ({value,key}) => {

        

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

            if (value[i].tavolo !== temp && !tavoli.find(elemento => elemento === value[i].tavolo && value[i].tavolo !== "TBD" )) {

             
                if (value[i].tavolo !== "TBD")
                {
                tavoli.push(value[i].tavolo);
                temp = [value[i].tavolo];
            }}
        }

        setPage({ state: true,  data: value, key, counter: menu, tavoli: tavoli });
    }

    const entra = async () => {

        const {counter, tavoli, data , key} = page;
        const user = data[0].user;

        let temp = data[0].allergie;
        let allergie = [data[0].allergie];

        for (let i = 0; i < data.length; i++) {

            if (data[i].allergie !== temp && !allergie.find(elemento => elemento === data[i].allergie )) {
                allergie.push(data[i].allergie);
                temp = [data[i].allergie];
            }
        }

        try {
            const res = await getUserDocument(user.substr(3));
            if (!res) throw new Error("ERRORE 😞, ricarica");
            const dataprenotazione = {[key]:{menu:counter,user,Ntavoli:tavoli,nome:res?.nome,cognome:res?.cognome,allergie,state:"entrata"}};
            
            const response = await getdatasala();
            if (!response) throw new Error("ERRORE 😞, ricarica");
            
            await updatedatasala({...dataprenotazione,...response});
            
            toast.success("Prenotazione aggiunta al gestionale 🎉")
          } catch (error) {
            toast.error(error.message)
          }
    
    }

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
                <Svgout className="w-6 h-6" fill="none" onClick={() => { logout(); }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </Svgout>
            </Flex>
            <Container>
                <Scroll>
                    <LoginForm onSubmit={handleSubmit(onSubmit)}>
                        <Input placeholder="Inserisci numero" type="text" {...register("numero")} />
                        <Button type="submit" margin="5vh 0 0 0" padding="15px 0">
                            <Find xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </Find>
                        </Button>
                    </LoginForm>
                    <Space size={1}></Space>
                    <PlusButton></PlusButton>
                    {Object.entries(filteredData).map(([key, value], i) => (
                        value.length > 0 ? <Card key={i}>
                            <Right onClick={() => sumMenu({value,key})}>
                                <TestoBig line={"10vh"} size={"20vw"} padding={"10px"}>{key.substr(0, 2)}</TestoBig>
                                <Testo line={"5vh"} padding={"10px"}>{key.substr(2)} </Testo>
                            </Right>
                            <Left onClick={() => sumMenu({value,key})}>
                                <TestoBig line={"12vh"} size={"20vw"} padding={"20px"}>{value.length}</TestoBig>
                                <Testo line={"5vh"} padding={"10px"}>POSTI</Testo>
                            </Left>
                        </Card> :
                            <Eliminazione>
                                <div>
                                    <svg onClick={() => deleteprenotazioni(prenotazioni[key])} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <p>Prenotazione in fase di cancellazione , clicca nuovamente 🗑 per confermare</p>
                                </div>
                            </Eliminazione>
                    ))
                    }
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
                <Svgout className="w-6 h-6" fill="none" onClick={() => { logout(); setUser(); }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </Svgout>
            </Flex>
            <LoginForm onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Inserisci numero" type="text" {...register("numero")} />
                <Button type="submit" margin="5vh 0 0 0" padding="15px 0">
                    <Find xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </Find>
                </Button>
            </LoginForm>
            <Title size={3}>Nessuna prenotazione per questo numero 😕</Title>
            <PlusButton></PlusButton>
        </div>

    );
    else return (
        <Blocco>
            <Titlelitte size={3} line={"10vh"}>Riepilogo</Titlelitte >
            <Tavoli>
                {page.tavoli.map((current) => (
                    <TavoliText key={current} >
                        <Testo line={"2vh"} padding={"10px"}>Tavolo numero</Testo>
                        <TestoBig line={"10vh"} size={"20vw"} padding={"10px"}>{current}</TestoBig>
                    </TavoliText>
                ))}
            </Tavoli>
            <Titlelitte size={1.5} line={3}>Menu selezionati</Titlelitte>
            <motion.div drag="x" position="relative" dragConstraints={{ left: -500, right: 0 }}>
                <Line >
                    {menu.map((current) => (
                        <Menu key={current.key}>
                            <Pop>
                                <P>{page.counter[current.key]}</P>
                            </Pop>
                            <Menuimg src={current.img}></Menuimg>
                        </Menu>
                    ))}
                </Line>
            </motion.div>
            <Close onClick={() => setPage({ state: false })} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" height="50px" fill="none" viewBox="0 0 24 24" stroke="red">
                <path strokeLinecap="red" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </Close>
            {page.data.find(elemento => elemento.allergie !== "null") ? <Allergie>
                <P1 color={"white"} size={"10px"}>Questa è una prenotazione con </P1>
                <img src={allergie}></img>
                <P2 color={"#ee404c"} size={"20px"}>ALLERGIE</P2>
            </Allergie> : <div></div>}
            <ButtonTavoli onClick={()=>entra()}>ENTRA</ButtonTavoli>
            <ButtonCancella onClick={() => deleteprenotazioni(prenotazioni[page.key])} >Cancella</ButtonCancella>
        </Blocco>
    );

}
