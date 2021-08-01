import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getUserDocument, updateUserDocument } from "../firebase";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, Container, Tavoli, TavoliText, Svg, Allergie,P1,P2, Svg1, ButtonTavoli, Testo, Left, P, Menuimg, Menu, Right, Space, TestoBig,  Line, Pop, Blocco, Close,  Title, Titlelitte, Flex, Svgout, Scroll } from './styled';
import { logout } from "../firebase";
import { useSala } from "../App";
import allergie from "./allergie.png"
import Menu0 from "./MENU0.png";
import Menu1 from "./MENU1.png";
import Menu2 from "./MENU2.png";
import Menu3 from "./MENU3.png";
import Qr from "./../Qr"


const SALEUID = 'sala';

const menu = [
    { key: 0, menu: "Menu adulti", img: Menu0 },
    { key: 1, menu: "Menu bambini", img: Menu1 },
    { key: 2, menu: "Menu adulti ciliaci", img: Menu3 },
    { key: 3, menu: "Menu bambini ciliaci", img: Menu2 }
]

export default function Home() {

    const [data, setData] = useState(null);
    const [prenotazioni, setPrenotazioni] = useState({});
    const [onlydefault, setOnlyDefault] = useState([]);
    const [deletes, setDeletes] = useState(true);
    const [page, setPage] = useState({
        state: false,
        qr:false,
        data: null,
        counter: [0, 0, 0, 0],
        tavoli : []
    });
    const { user: [user, setUser] } = useSala();

    useEffect(async () => {

        try {
            const res = await getUserDocument("sala");
            if (!res) throw new Error("No connection");
            if (!res.sale['SAGRA']) throw new Error('Errore');
            
            setData(res.sale['SAGRA']);

            const newPrenotazioni = Object.entries(res.sale['SAGRA']).reduce((acc, pixel) => {

                const [key, value] = pixel;
                const { prenotazioni } = value;

                if (!prenotazioni || prenotazioni.length === 0) return acc;

                const temp = value.prenotazioni.reduce((accPrenotazioni, prenotazione) => {
                    if (prenotazione.user !== user) return accPrenotazioni;
                    else return ({
                        ...accPrenotazioni,
                        [`${prenotazione.data}-${prenotazione.orario}`]: { ...prenotazione, pixel: key }
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

        } catch (error) {
            console.log(error)
            toast.error(error, {
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
        console.log(value, data);
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


    const sumMenu = (value) => {

        let state = 0;
        let menu = value[state].menu;

        console.log(value);

        for (let i = 0; i < value.length; i++) {
            if (value[state].menu.toString() !== value[i].menu.toString()) {
                for (let a = 0; a < 4; a++) { menu[a] = value[state].menu[a] + value[i].menu[a]; } state = i;
            }
        }

        let temp = value[0].tavolo;
        let tavoli = [value[0].tavolo];

        for (let i = 0; i < value.length; i++) {

            if (value[i].tavolo !== temp && !tavoli.find(elemento => elemento===value[i].tavolo)) {
               
                tavoli.push(value[i].tavolo);
                temp = [value[i].tavolo]
            }
        }

        setPage({ state: true, qr:false, data: value, counter: menu , tavoli : tavoli});
    }
   if(page.qr) return (

       <Qr page={page} setPage={setPage} user={user} /> 

   )
    if (!page.state && Object.keys(onlydefault).length > 0) return (
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
                <Title size={8}>Ciao 👋🏻</Title>
                <Svgout className="w-6 h-6" fill="none" onClick={() => { logout(); setUser(); }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </Svgout>
            </Flex>
            <Container>
                <Scroll>
                    <Space size={1}></Space>
                    {Object.entries(onlydefault).map(([key, value], i) => (
                        <Card key={i}>
                            <Svg onClick={() => deleteprenotazioni(prenotazioni[key])} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </Svg>
                            <Right onClick={() => sumMenu(value)}>
                                <Testo line={"2vh"} padding={"10px"}>Prenotazione confermata per il</Testo>
                                <TestoBig line={"10vh"} size={"20vw"} padding={"10px"}>{key.substr(0, 2)}</TestoBig>
                                <Testo line={"5vh"} padding={"10px"}>{key.substr(2)} </Testo>
                            </Right>
                            <Left onClick={() => sumMenu(value)}>
                                <TestoBig line={"12vh"} size={"20vw"} padding={"20px"}>{value.length}</TestoBig>
                                <Testo line={"5vh"} padding={"10px"}>POSTI</Testo>
                            </Left>
                        </Card>
                    ))
                    }
                    <Space size={10}></Space>
                </Scroll>
                <Link to="/data">
                    <Svg1 xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#ffade3">
                        <path margin="60px" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </Svg1>
                </Link>
            </Container>
        </div>
    );
    else if (!page.state) return (

        <div>
            <Flex orientation={"row"}>
                <Title size={8}>Ciao 👋🏻</Title>
                <Svgout className="w-6 h-6" fill="none" onClick={() => { logout(); setUser(); }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </Svgout>
            </Flex>
            <Title size={3}>Non hai prenotazioni al momento 😕 , CLICCA sul tasto + per iniziare 😏</Title>

            <Link to="/data">
                <Svg1 xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#ffade3">
                    <path margin="60px" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </Svg1>
            </Link>

        </div>

    ); 
    else return (
        <Blocco>
            <Titlelitte size={3} line={"10vh"}>Riepilogo</Titlelitte >
                <Tavoli>
                        { page.tavoli.map((current) => (
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
           {page.data[0].allergie ? <Allergie>
                <P1 color={"white"} size={"10px"}>Questa è una prenotazione con </P1>
                <img src={allergie}></img>
                <P2 color={"#ee404c"} size={"20px"}>ALLERGIE</P2>
            </Allergie> : <div></div>}
            <ButtonTavoli onClick={() => setPage(c  => {return {...c,qr:true}})} >Crea il mio QR code</ButtonTavoli>
        </Blocco>
    );

}
