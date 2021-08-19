import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { firestore,  getdatasala, getUserDocument, updatedatasala, updateUserDocument } from "../firebase";
import { motion } from "framer-motion";
import { Card, Container, Tavoli, TavoliText,Select,  Find, ButtonCancella,Testofluo, Allergie, P1, P2, LoginForm, Input, Button, Eliminazione, ButtonTavoli, Testo, Left, P, Menuimg, Menu, Right, Space, TestoBig, Line, Pop, Blocco, Close, Title, Titlelitte, Flex, Svgout, Scroll } from './styled';
import { logout } from "../firebase";
import allergie from "./allergie.png"
import Menu0 from "./MENU0.png";
import Menu1 from "./MENU1.png";
import Menu2 from "./MENU2.png";
import Menu3 from "./MENU3.png";
import PlusButton from "../components/PlusButton"
import { useForm } from "react-hook-form";
import { useSala } from "../App";

const SALEUID = 'sala';

const menu = [
    { key: 0, menu: "Menu adulti", img: Menu0 },
    { key: 1, menu: "Menu bambini", img: Menu1 },
    { key: 2, menu: "Menu adulti ciliaci", img: Menu3 },
    { key: 3, menu: "Menu bambini ciliaci", img: Menu2 }
]

export default function HomeAdmin() {

    const [data, setData] = useState(null);
    const { admin : [admin, setAdmin] } = useSala();
    const [prenotazioni, setPrenotazioni] = useState({});
    const [onlydefault, setOnlyDefault] = useState({});
    const [deletes, setDeletes] = useState(true);
    const [page, setPage] = useState({
        state: false,
        qr: false,
        value: null,
        counter: [0, 0, 0, 0],
        tavoli: []
    });
    const [filter, setFilter] = useState('');
    const filteredData = useMemo(() => Object.entries(onlydefault).reduce((acc, [key, item]) => {  
    if (filter.type==="end") return {
        ...acc,
        ...(key.endsWith(filter.filter) ? { [key]: item } : {})
    };else if (filter.type==="tav")return{
        ...acc,
        ...(item.some(item=>item.tavolo===filter.filter) ? { [key]: item } : {})
    };else return {
        ...acc,
        ...(key.startsWith(filter.filter) ? { [key]: item } : {})
    }
    }, {}), [filter, onlydefault]);

    const { register, handleSubmit } = useForm();

    const onSubmit = data => setFilter({filter:data.numero,type:data.type});

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

            if (value[i].tavolo !== temp && !tavoli.find(elemento => elemento === value[i].tavolo && value[i].tavolo !== "TBD" )) {

             
                if (value[i].tavolo !== "TBD")
                {
                tavoli.push(value[i].tavolo);
                temp = [value[i].tavolo];
            }}
        }

        setPage({ state: true, value: value, key, counter: menu, tavoli: tavoli });
    }

    const uscita = async (values) => {

        
        function removePrenotazione(pixel, prenotazione) {
            const index = pixel.prenotazioni.findIndex(p => p.data === prenotazione.data && p.orario === prenotazione.orario && p.user === prenotazione.user);
            return {
                ...pixel,
                prenotazioni: [...pixel.prenotazioni.slice(0, index), ...pixel.prenotazioni.slice(index + 1),{...prenotazione,entrata:false}]
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
                prenotazioni: [...pixel.prenotazioni.slice(0, index), ...pixel.prenotazioni.slice(index + 1),{...prenotazione,entrata:true}]
            }
        }
        
        const newData = Object.entries(data).reduce((acc, [key, pixel]) => {
            
            const prenotazione = values.find(v => v.pixel === key);
           
            return {
                ...acc,
                [key]: !prenotazione ? pixel : removePrenotazione(pixel, prenotazione)
            }
        }, {});
        
        const {counter, tavoli, value , key} = page;

        const user = value[0].user;

        let temp = value[0].allergie;
        let allergie = [value[0].allergie];

        for (let i = 0; i < value.length; i++) {

            if (value[i].allergie !== temp && !allergie.find(elemento => elemento === value[i].allergie )) {
                allergie.push(value[i].allergie);
                temp = [value[i].allergie];
            }
        }

        try {

          const res = await getUserDocument(user.substr(3));
          if (!res) throw new Error("ERRORE nel prendere i dati utente 😞, ricarica");
          const dataprenotazione = {[key]:{menu:counter,user,Ntavoli:tavoli,nome:res?.nome,cognome:res?.cognome,allergie,state:"entrata",persone:value.length}};
          
          const response = await getdatasala();
          if (!response) throw new Error("ERRORE nel prendere nel prendere le prenotazioni 😞, ricarica");

          console.log("dataprenotazione",dataprenotazione,"response",response)
          
          await updatedatasala({...dataprenotazione,...response});

          setPage(false);
          
          const responsebig = await updateUserDocument({ uid: SALEUID }, { sale: { SAGRA: newData } });

          toast.success("Prenotazione aggiunta al gestionale 🎉")
          toast.info("Tag uscita settato correttamente")

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
                <Svgout className="w-6 h-6" fill="none" onClick={() => { logout();setAdmin() }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </Svgout>
            </Flex>
            <Container>
                <Scroll>
                    <LoginForm onSubmit={handleSubmit(onSubmit)}>
                        <Input placeholder="Inserisci numero" type="text" {...register("numero")} />
                        <Select {...register("type")}>
                            <option value="end">NUM</option>
                            <option value="start">DATA</option>
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
                        value.length > 0 ? <Card key={i}>
                            {value[0].entrata!==true ? 
                            <Right color={"#ffade3"} onClick={() => sumMenu({value,key})}>
                                <TestoBig line={"10vh"} size={"20vw"} padding={"10px"}>{key.substr(0, 2)}</TestoBig>
                                <Testo line={"5vh"} padding={"10px"}>{key.substr(2)} </Testo>
                            </Right>
                            :
                            <Right color={"var(--line)"} onClick={() => sumMenu({value,key})}>
                                <Testofluo line={"5vh"} padding={"10px"}>ENTRATO</Testofluo>
                                <TestoBig line={"12vh"} size={"20vw"} padding={"20px"}>{key.substr(0, 2)}</TestoBig>
                            </Right>
                            }
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
                <Svgout className="w-6 h-6" fill="none" onClick={() => { logout(); setAdmin(); }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </Svgout>
            </Flex>
            <LoginForm onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Inserisci numero" type="text" {...register("numero")} />
                <Select {...register("type")}>
                            <option value="end">NUM</option>
                            <option value="start">DATA</option>
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
            {page.value.find(elemento => elemento.allergie !== "null") ? <Allergie>
                <P1 color={"white"} size={"10px"}>Questa è una prenotazione con </P1>
                <img src={allergie}></img>
                <P2 color={"#ee404c"} size={"20px"}>ALLERGIE</P2>
            </Allergie> : <div></div>}
            {
              page.value[0].entrata !==true ?
             <ButtonTavoli onClick={()=>entra(prenotazioni[page.key])}>ENTRA</ButtonTavoli>
                :
             <ButtonTavoli onClick={()=>uscita(prenotazioni[page.key])}>USCITA</ButtonTavoli>
                }
            <ButtonCancella onClick={() => deleteprenotazioni(prenotazioni[page.key])} >Cancella</ButtonCancella>
        </Blocco>
    );

}
