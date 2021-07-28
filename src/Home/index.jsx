import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getUserDocument, updateUserDocument } from "../firebase";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, Container, Svg, Svg1, Testo, Left, P, Menuimg, Menu, Right, Space, TestoBig, Qr, Line, Pop, Blocco, Close, Div, Title, Titlelitte, Flex, Svgout, Scroll } from './styled';
import { logout } from "../firebase";
import { useSala } from "../App";
import QRCode from "react-qr-code";
import Menu0 from "./MENU0.png";
import Menu1 from "./MENU1.png";
import Menu2 from "./MENU2.png";
import Menu3 from "./MENU3.png";

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
        data: null,
        counter: [0, 0, 0, 0]
    });
    const { user: [user, setUser] } = useSala();

    useEffect(async () => {

        try {
            const res = await getUserDocument("sala");
            if (!res) throw new Error("No connection");
            if (!res.sale['SAGRA']) throw new Error('Errore');
            console.log('firebase obj', res.sale['SAGRA']);
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
            console.log(newData);
        } catch (error) {
            toast.error(error);
        }
    }


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
                <Title size={20}>Ciao 👋🏻</Title>
                <Svgout className="w-6 h-6" fill="none" onClick={() => { logout(); setUser(); }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </Svgout>
            </Flex>
            <Container>
                <Scroll>
                    <Space size={1}></Space>
                    {Object.entries(onlydefault).map(([key, value], i) => (
                        <Card key={i}>
                            <Svg onClick={() => deleteprenotazioni(prenotazioni[key])} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" height="50px" fill="none" viewBox="0 0 24 24" stroke="red">
                                <path strokeLinecap="red" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </Svg>
                            <Right onClick={() => setPage({ state: true, data: value, counter: value[0].menu })}>
                                <Testo line={"2vh"} padding={"10px"}>Prenotazione confermata per il</Testo>
                                <TestoBig line={"10vh"} size={"20vw"} padding={"10px"}>{key.substr(0, 2)}</TestoBig>
                                <Testo line={"5vh"} padding={"10px"}>{key.substr(2)} </Testo>
                            </Right>
                            <Left onClick={() => setPage({ state: true, data: value, counter: value[0].menu })}>
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
                <Title size={20}>Ciao 👋🏻</Title>
                <Svgout className="w-6 h-6" fill="none" onClick={() => { logout(); setUser(); }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </Svgout>
                </Flex>  
                <Title size={6}>Non hai prenotazioni al momento 😕 , CLICCA SUL TASTO  ✚  PER INIZIARE 😏</Title>

            <Link to="/data">
                <Svg1 xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#ffade3">
                    <path margin="60px" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </Svg1>
            </Link>

        </div>

    );
    else return (
        <Blocco>
            <Titlelitte size={3} line={"10vh"}>Repilogo</Titlelitte >
            <Testo line={"5vh"}>Mostra il QR CODE all' entrata</Testo>
            <Div>
                <Qr>
                    <QRCode value="id" level="H" size={200} fgColor="var(--line)" bgColor="var(--black-light)" />
                </Qr>
            </Div>
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
        </Blocco>
    );

}
