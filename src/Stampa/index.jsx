
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { firestore, updatestampa } from '../firebase';
import { Link } from "react-router-dom";
import Pdf from "react-to-pdf";
import pineapp from "./pineapp.png"
import { Card, Container, ContainerPdf, Table,DatiAllergie, Product,LoginForm,Cerca,Find,Input, Tablecucina,  Productcucina, Linebutton, Button, PineApp, Field, Prezzo, Quantita, Tot, Statebutton, Header, PP, Datiprenotazione, Numerotavolo, ButtonPdf, DeleteTavoli, Svg, Foglio, Divinside, Bar, Testo, Left, Right, Rightstampato, P, Title, Flex, Svgout, Scroll, Leftstampado } from './styled';
import { useForm } from 'react-hook-form';
import print from 'print-js'

export default function Stampa() {

    const [data, setData] = useState({});
    const [see, setSee] = useState(false);
    const [page, setPage] = useState(false);
    const [pdfoglio, setPdf] = useState("cucina");
    const dd = window.localStorage.getItem("data");

    const pdf = useRef(null);
    const pdf1 = useRef(null);

    const [filter, setFilter] = useState({filter:""});

    const { register, handleSubmit } = useForm();

    const onSubmit = data => setFilter({filter:data.nome});

    const filteredData = useMemo(() => Object.entries(data).reduce((acc, [key, item]) => {  
        
    return {
        ...acc,
        ...(item.nome?.toLowerCase().includes(filter.filter) || item.cognome?.toLowerCase().includes(filter.filter) || item.Ntavoli.some(tavolo => tavolo===filter.filter ) ? { [key]: item } : {})
    }
    }, {}), [filter, data]);

    useEffect(() => {

        try {
            firestore.collection("admin").doc("stampa").onSnapshot((doc) => {

                if (doc.data() !== null) {
                    
                    const entrata = Object.entries(doc.data()).reduce((acc, [chiave, valore]) => {
                        if (chiave.startsWith(dd.slice(1, -1))) {
                            return { ...acc, [chiave]: { ...valore } }
                        } else return { ...acc}   
                    }, {})

                    setData(entrata)
                }

            });

        } catch (error) {

            console.log(error.message);

        }

    }, [page])


    const updatestate = async ({ key, toPdf  }) => {

        const updateddata = Object.entries(data).reduce((acc, [chiave, valore]) => {

            if (chiave === key) return  { ...acc, [key]: { ...valore, state: valore.state + 1  } } 
            else return { ...acc, [chiave]: valore }

        }, {})

        try {

            await updatestampa(updateddata);
            await toPdf();
            toast.success("Prenotazione in stampa 🖨");
            setPage(false);

        } catch (error) {

            toast.error(error.message);

        }

    }
    
    if (page.state===1) return (
        <>
            <ContainerPdf>
                <Linebutton>
                    <Button size={"80%"} border={"20px 0px 0px 20px"} color={"#3c9c3c"} onClick={() => setPdf("cucina")}>CUCINA 🧑🏻‍🍳</Button>
                    <Button size={"20%"}  border={"0px 20px 20px 0px"} color={"#5957e4"} onClick={() => setPdf("cliente")}>🧑🏻‍🦱</Button>
                </Linebutton>
                <Foglio ref={pdf} id="printJS-form">
                    {
                        pdfoglio === "cliente" ?

                            <Fogliocliente page={page}></Fogliocliente>
                            :
                            <Fogliocucina page={page}></Fogliocucina>
                    }
                </Foglio>
            </ContainerPdf>
            <Pdf targetRef={pdf} filename={pdfoglio === "cliente" ? page.key + "-cliente.pdf" : page.key + "-cucina.pdf"}>
                {({ toPdf }) => <ButtonPdf onClick={() => updatestate({ ...page, toPdf })}>Genera PDF</ButtonPdf>}
            </Pdf>
            <DeleteTavoli>
                <Svg onClick={() => setPage(false)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                </Svg>
            </DeleteTavoli>
        </>
    );else  return (
        <div >
            <Flex orientation={"column"}>
                <Flex orientation={"row"}>
                    <Title size={3}>Print 🖨</Title>
                    {see ?
                        <Svgout onClick={() => setSee(false)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="lightgreen">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </Svgout>
                        :
                        <Svgout onClick={() => setSee(true)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </Svgout>
                    }
                </Flex>
                <Bar>
                    <Link to="/insidedata">
                        <Statebutton color={"var(--black-light)"}>
                            <Divinside color={"greenyellow"}></Divinside>
                            <p>entrata</p>
                        </Statebutton>
                    </Link>
                    <Link to="/insidedata">
                        <Statebutton color={"var(--black-light)"}>
                            <Divinside color={"orange"}></Divinside>
                            <p>cassa  </p>
                        </Statebutton>
                    </Link>
                    <Statebutton color={"var(--line)"}>
                        <Divinside color={"red"}></Divinside>
                        <p>stampa</p>
                    </Statebutton>
                </Bar>
            </Flex>
            <Container>
                <Scroll>
                <LoginForm onSubmit={handleSubmit(onSubmit)}>
                        <Input placeholder="Inserisci nome o tavolo" type="text" {...register("nome")} />
                        <Cerca type="submit" margin="5vh 0 0 0" padding="15px 0">
                            <Find xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </Find>
                        </Cerca>
                    </LoginForm>
                    {data ? Object.entries(filteredData).sort((a, b) =>  b[1].data.seconds - a[1].data.seconds ).reverse().map(([key, value]) => (
                       <div key={key}>
                            {value.state < 1 ?
                                 <Card  >
                                    <Right >
                                        <Testo line={"5vh"} size={"1.5vh"} color={"white"} padding={"10px"}>{new Date(value.data.seconds*1000).toLocaleTimeString()}</Testo>
                                        <Testo line={"5vh"} size={"3vh"} color={"var(--line)"} padding={"10px"}>{value.nome}</Testo>
                                        <Testo line={"5vh"} size={"3vh"} color={"var(--line)"} padding={"10px"}>{value.cognome}</Testo>
                                    </Right>
                                    <Left onClick={() => setPage({ state: 1, value, key })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                        </svg>
                                    </Left>
                                    </Card>
                                : see === true ?
                                <Card  >
                                        <Rightstampato >
                                            <Testo line={"1vh"} size={"1vh"} color={"white"} padding={"10px"}>STAMPATO</Testo>
                                            <Testo line={"1vh"} size={"3vh"} color={"white"} padding={"10px"}>{value.nome}</Testo>
                                            <Testo line={"1vh"} size={"3vh"} color={"white"} padding={"10px"}>{value.cognome}</Testo>
                                        </Rightstampato>
                                        <Leftstampado onClick={() => setPage({ state: 1, value, key })} >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="green">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                            </svg>
                                        </Leftstampado>
                                        </Card>
                                : null
                            }
                            </div>
                    )) : null}
                </Scroll>
            </Container>
        </div>
    );
}


const Fogliocliente = ({ page }) => (
    <>
        <Header>
            <Datiprenotazione>
                <PP size={"30px"}>Buon appetito 🍄,</PP>
                <PP size={"20px"}>{page.value.nome} {page.value.cognome}</PP>
                <PP size={"15px"}>{page.value.user}</PP>
                <PP size={"8px"}>{new Date().toString()}</PP>
            </Datiprenotazione>
            <Numerotavolo>
                <PP size={"15px"}>Tavolo numero</PP>
                {page.value.Ntavoli.map((value) => (
                    value !== "TBD" ?
                        <p key={value}>{value}</p>
                        :
                        <p key={value}></p>
                )
                )}
            </Numerotavolo>
        </Header>
        <Table>
            <Product>
                <Field size={"bold"}>Descrizione</Field>
                <Quantita size={"bold"}>
                    <PP size={"10px"}>Qty</PP>
                </Quantita>
                <Prezzo size={"bold"}>
                    <PP size={"10px"}>Price</PP>
                </Prezzo>
            </Product>
            {Object.entries(page.value.listing).map(([key, value]) => (
                <Product key={key}>
                    <Field>{key}</Field>
                    <Quantita>
                        <p size={"25px"}>{value.qty}</p>
                    </Quantita>
                    <Prezzo>
                        <p size={"25px"}>{value.price} €</p>
                    </Prezzo>
                </Product>
            ))}
        </Table>
        <Product >
            <Field size={"bold"}>Totale</Field>
            <Tot>
                <PP size={"25px"}>{page.value.tot} €</PP>
            </Tot>
        </Product>
        <PineApp src={pineapp}></PineApp>
    </>

)

const Fogliocucina = ({ page }) => {

    let contfiletto = 0;
    let contchees = 0;

    console.log(Object.entries(page.value.listing)) 
    const cucina = Object.entries(page.value.listing).reduce((acc, [key, value]) => {
        console.log(key,value)
        if (key === "menumarrone1") {
            console.log("1")
            contfiletto=contfiletto+value.qty
            contchees=contchees+value.qty
            return {
                ...acc,
                primi: {
                    ...acc.primi,
                    Capaltèz: value.qty
                },
                secondi: {
                    ...acc.secondi,
                    FILETTO_DI_MAIALE: contfiletto
                }, 
                dolci: {
                    ...acc.dolci,
                    CHEESECAKE: contchees
                }, 
            }
        }
        if (key === "menumarrone2") {
            console.log("2")
            contfiletto=contfiletto+value.qty
            contchees=contchees+value.qty
            return {
                ...acc,
                primi: {
                    ...acc.primi,
                    TAGLIATELLE: value.qty  
                },
                secondi: {
                    ...acc.secondi,
                    FILETTO_DI_MAIALE: contfiletto
                }, 
                dolci: {
                    ...acc.dolci,
                    CHEESECAKE: contchees
                }, 
            }
        }
        if (key === "menunomarrone") {
            console.log("0")
            return {
                ...acc,
                primi: {
                    ...acc.primi,
                    FICATTOLA: value.qty
                }
            }
        } else return {
            ...acc,
            bere: {
                ...acc.bere,
                [key]: value.qty
            }

        }
    },{})

    return (
        <>
            <Header>
                <Datiprenotazione>
                    <PP size={"15px"}>{page.value.nome} {page.value.cognome}</PP>
                    <PP size={"10px"}>{page.value.user}</PP>
                    <PP size={"10px"}>Posti: {page.value.persone}</PP>
                    <PP size={"10px"}>Admin: {page.value.admin}</PP>
                    <PP size={"8px"}>{new Date().toString()}</PP>
                </Datiprenotazione>
                <Numerotavolo>
                    <PP size={"15px"}>Tav</PP>
                    {page.value.Ntavoli.map((value) => (
                        value !== "TBD" ?
                            <p key={value}>{value}</p>
                            :
                            <p key={value}></p>
                    )
                    )}
                </Numerotavolo>
            </Header>
            <Tablecucina>
               
                <Product>
                    <Field size={"bold"}>Primi</Field>
                    <Quantita size={"bold"}>
                        <PP size={"10px"}>Qty</PP>
                    </Quantita>
                    <Prezzo>
                        <PP size={"10px"}>Check</PP>
                    </Prezzo>
                </Product>
                {cucina.primi && Object.entries(cucina.primi).map(([key, value]) => (
                    <Productcucina key={key}>
                        <Field>{key}</Field>
                        <Quantita>
                            <p size={"25px"}>{value}</p>
                        </Quantita>
                        <Prezzo>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 100 100" stroke="currentColor">
                                <rect width="10" height="10"></rect>
                            </svg>
                        </Prezzo>
                    </Productcucina>
                ))}
                <Product>
                    <Field size={"bold"}>Secondi</Field>
                    <Quantita size={"bold"}>
                        <PP size={"10px"}>Qty</PP>
                    </Quantita>
                    <Prezzo>
                        <PP size={"10px"}>Check</PP>
                    </Prezzo>
                </Product>
                {cucina.secondi && Object.entries(cucina.secondi).map(([key, value]) => (
                    <Productcucina key={key}>
                        <Field>{key}</Field>
                        <Quantita>
                            <p size={"25px"}>{value}</p>
                        </Quantita>
                        <Prezzo>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 100 100" stroke="currentColor">
                                <rect width="10" height="10"></rect>
                            </svg>
                        </Prezzo>
                    </Productcucina>
                ))}
                 <Product>
                    <Field size={"bold"}>Dolci</Field>
                    <Quantita size={"bold"}>
                        <PP size={"10px"}>Qty</PP>
                    </Quantita>
                    <Prezzo>
                        <PP size={"10px"}>Check</PP>
                    </Prezzo>
                </Product>
                {cucina.dolci && Object.entries(cucina.dolci).map(([key, value]) => (
                    <Productcucina key={key}>
                        <Field>{key}</Field>
                        <Quantita>
                            <p size={"25px"}>{value}</p>
                        </Quantita>
                        <Prezzo>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 100 100" stroke="currentColor">
                                <rect width="10" height="10"></rect>
                            </svg>
                        </Prezzo>
                    </Productcucina>
                ))}
                <Product>
                    <Field size={"bold"}>Bere</Field>
                    <Quantita size={"bold"}>
                        <PP size={"10px"}>Qty</PP>
                    </Quantita>
                    <Prezzo>
                        <PP size={"10px"}>Check</PP>
                    </Prezzo>
                </Product>
                {cucina.bere && Object.entries(cucina.bere).map(([key, value]) => (
                    <Productcucina key={key}>
                        <Field>{key}</Field>
                        <Quantita>
                            <p size={"25px"}>{value}</p>
                        </Quantita>
                        <Prezzo>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 100 100" stroke="currentColor">
                                <rect width="10" height="10"></rect>
                            </svg>
                        </Prezzo>
                    </Productcucina>
                ))}
            <DatiAllergie>
            <PP size={"30px"}>Allergie:{page.value.note}</PP>
            </DatiAllergie>
            </Tablecucina>

        </>

    )
}