import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getUserDocument , updateUserDocument } from "../firebase";
import { Link } from "react-router-dom";
import { Card, Container,  Svg, Svg1, Testo, Left, Right,Space, TestoBig, Blocco, Close, Title, Flex,  Svgout , Scroll } from './styled';
import { logout } from "../firebase";
import { useSala } from "../App";
import { set } from "react-hook-form";

const SALEUID = 'sala';

export default function Home() {

    const [data, setData] = useState(null);
    const [prenotazioni, setPrenotazioni] = useState({});
    const [onlydefault, setOnlyDefault] = useState([]);
    const [deletes, setDeletes] = useState(true);
    const [page, setPage] = useState({
        state: false,
        data: null
    });
    const { user: [user,setUser] } = useSala();

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

            const defaultposti = Object.entries(newPrenotazioni).reduce((acc,current)=> {
                
                const [key, value] = current;
                const temp = value.filter((currents)=> currents.type==="default");
                return {...acc,[key]: temp}
            },{});

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

            function removePrenotazione (pixel, prenotazione) {
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


    if (!page.state) return (
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
                <Title size={20}>Ciao</Title>
                <Svgout className="w-6 h-6" fill="none" onClick={()=>{ logout(); setUser(); }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </Svgout>
            </Flex>
            <Container>
                <Scroll>
                    {Object.entries(onlydefault).map(([key, value], i) => (
                        <Card key={i}>
                            <Svg onClick={() => deleteprenotazioni(prenotazioni[key])} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" height="50px" fill="none" viewBox="0 0 24 24" stroke="red">
                                <path strokeLinecap="red" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </Svg>
                            <Right onClick={() => setPage({ state: true, data: value })}>
                                <Testo line={"2vh"}>Prenotazione confermata per il</Testo>
                                <TestoBig line={"10vh"}>{key.substr(0, 2)}</TestoBig>
                                <Testo line={"5vh"}>{key.substr(2)}</Testo>
                            </Right>
                            <Left onClick={() => setPage({ state: true, data: value })}>
                                <TestoBig line={"15vh"}>{value.length}</TestoBig>
                                <Testo line={"5vh"}>POSTI</Testo>
                            </Left>
                        </Card>
                    ))
                    }
                <Space></Space>
                </Scroll>
                <Link to="/data">
                    <Svg1 xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#ffade3">
                        <path margin="60px" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </Svg1>
                </Link>
            </Container>
        </div>
    );
    else return (
        <Blocco>
            <Close onClick={() => setPage({ state: false })} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" height="50px" fill="none" viewBox="0 0 24 24" stroke="red">
                <path strokeLinecap="red" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </Close>
        </Blocco>
    );

}
