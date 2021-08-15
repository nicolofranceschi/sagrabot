
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { firestore, updatestampa } from '../firebase';
import { Link } from "react-router-dom";
import Pdf from "react-to-pdf";
import pineapp from "./pineapp.png"
import { Card, Container, ContainerPdf, Table, Product,Tablecucina,Leftstampato,Productcucina, Linebutton, Button, PineApp, Field, Prezzo, Quantita, Tot, Statebutton, Header, PP, Datiprenotazione, Numerotavolo, ButtonPdf, DeleteTavoli, Svg, Foglio, Divinside, Bar, Testo, Left, Right, Rightstampato, P, Title, Flex, Svgout, Scroll, Leftstampado } from './styled';

export default function Stampa() {

    const [data, setData] = useState({});
    const [page, setPage] = useState(false);
    const [pdfoglio, setPdf] = useState("cliente");

    const pdf = useRef(null);

    useEffect(() => {

        try {
            firestore.collection("admin").doc("stampa").onSnapshot((doc) => {
 
                if (doc.data() !== null) setData(doc.data());

            });

        } catch (error) {

            console.log(error.message);

        }

    }, [page])


    const updatestate = async ({ key, toPdf }) => {

        const updateddata = Object.entries(data).reduce((acc, [chiave, valore]) => {

            if (chiave === key) return { ...acc, [key]: { ...valore, state: "stampato" } }
            else return { ...acc, [chiave]: valore }

        }, {})

        try {

            await updatestampa(updateddata);
            toPdf();
            toast.success("Prenotazione in stampa 🖨");

        } catch (error) {

            toast.error(error.message);

        }

    }

    if (page.state) return (
        <>
            <ContainerPdf>
                <Linebutton>
                    <Button border={"20px 0px 0px 20px"} color={"#5957e4"} onClick={() => setPdf("cliente")}>CLIENTE 🧑🏻‍🦱</Button>
                    <Button border={"0px 20px 20px 0px"} color={"#3c9c3c"} onClick={() => setPdf("cucina")}>CUCINA 🧑🏻‍🍳</Button>
                </Linebutton>
                <Foglio ref={pdf}>
                    {
                        pdfoglio === "cliente" ?

                            <Fogliocliente page={page}></Fogliocliente>
                            :
                            <Fogliocucina page={page}></Fogliocucina>
                    }
                </Foglio>
            </ContainerPdf>
            <Pdf targetRef={pdf} filename={pdfoglio === "cliente" ? page.key + "-cliente.pdf" : page.key + "-cucina.pdf"}>
                {({ toPdf }) => <ButtonPdf onClick={() => updatestate({...page,toPdf})}>Genera PDF</ButtonPdf>}
            </Pdf>
            <DeleteTavoli>
                <Svg onClick={() => setPage(false)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                </Svg>
            </DeleteTavoli>
        </>

    ); else return (
        <div >
            <Flex orientation={"column"}>
                <Flex orientation={"row"}>
                    <Title size={3}> Print 🖨</Title>

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
                    {data ? Object.entries(data).map(([key, value]) => (
                        <Card key={key} >
                            {value.state === "stampato" ?
                                <>
                                    <Rightstampato>
                                        <Testo line={"1vh"} size={"1vh"} color={"white"} padding={"10px"}>STAMPATO</Testo>
                                        <Testo line={"1vh"} size={"3vh"} color={"white"} padding={"10px"}>{value.nome}</Testo>
                                        <Testo line={"1vh"} size={"3vh"} color={"white"} padding={"10px"}>{value.cognome}</Testo>
                                    </Rightstampato>
                                    <Leftstampado onClick={() => setPage({ state: true, value, key })} >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="green">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                        </svg>
                                    </Leftstampado>
                                </>
                                :
                                <>
                                    <Right>
                                        <Testo line={"5vh"} size={"1vh"} color={"white"} padding={"10px"}>{key}</Testo>
                                        <Testo line={"5vh"} size={"3vh"} color={"var(--line)"} padding={"10px"}>{value.nome}</Testo>
                                        <Testo line={"5vh"} size={"3vh"} color={"var(--line)"} padding={"10px"}>{value.cognome}</Testo>
                                    </Right>
                                    <Left onClick={() => setPage({ state: true, value, key })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                        </svg>
                                    </Left>
                                </>
                            }

                        </Card>
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

    const cucina = Object.entries(page.value.listing).reduce((acc, [key, value]) => {

        if (key === "menusenzaporcini") {
            return {
                ...acc,
                primi: {
                    ...acc.primi,
                    tagliatellealragu: value.qty
                },
                secondi: {
                    ...acc.secondi,
                    filettodimaialeconpatate: value.qty
                }
            }
        }
        else if (key === "menusenzaporcininoglutine") {
            return {
                ...acc,
                primi: {
                    ...acc.primi,
                    tagliatellealraguSENZAGLUTINE: value.qty
                },
                secondi: {
                    ...acc.secondi,
                    filettodimaialeconpatateSENZAGLUTINE: value.qty
                }
            }
        }
        else if (key === "menuporcininoglutine") {
            return {
                ...acc,
                antipasti: {
                    ...acc.antipasti,
                    crostinimistiSENZAGLUTINE: value.qty,
                    cestinodipatateSENZAGLUTINE: value.qty,
                    insalatadiporciniSENZAGLUTINE: value.qty
                },
                primi: {
                    ...acc.primi,
                    tagliatelleallaboscaiolaSENZAGLUTINE: value.qty
                },
                secondi: {
                    ...acc.secondi,
                    filettdimaialeaiporciniSENZAGLUTINE: value.qty

                }, caffe: acc.caffe + value.qty
            }
        }
        else if (key === "menuporcini") {
            return {
                ...acc,
                antipasti: {
                    ...acc.antipasti,
                    crostinimisti: value.qty,
                    cestinodipatate: value.qty,
                    insalatadiporcini: value.qty
                },
                primi: {
                    ...acc.primi,
                    tagliatelleallaboscaiola: value.qty,
                    tortellidipatate: value.qty
                },
                secondi: {
                    ...acc.secondi,
                    porcinifritti: value.qty,
                    filettdimaialeaiporcini: value.qty

                }, caffe: acc.caffe + value.qty
            }
        } else return {
            ...acc,
            bere: {
                ...acc.bere,
                [key]: value.qty
            }

        }
    }, { caffe: 0 })

    return (
        <>
            <Header>
                <Datiprenotazione>
                    <PP size={"15px"}>{page.value.nome} {page.value.cognome}</PP>
                    <PP size={"10px"}>{page.value.user}</PP>
                    <PP size={"10px"}>Posti: {page.value.persone}</PP>
                    <PP size={"10px"}>Admin: {page.value.admin}</PP>
                    <PP size={"10px"}>Allergie: {page.value.note}</PP>
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
            <Tablecucina>
                <Product>
                    <Field size={"bold"}>Antipasti</Field>
                    <Quantita size={"bold"}>
                        <PP size={"10px"}>Qty</PP>
                    </Quantita>
                    <Prezzo>
                    <PP size={"10px"}>Check</PP>
                    </Prezzo>
                </Product>
                {Object.entries(cucina.antipasti).map(([key, value]) => (
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
                    <Field size={"bold"}>Primi</Field>
                    <Quantita size={"bold"}>
                        <PP size={"10px"}>Qty</PP>
                    </Quantita>
                    <Prezzo>
                    <PP size={"10px"}>Check</PP>
                    </Prezzo>
                </Product>
                {Object.entries(cucina.primi).map(([key, value]) => (
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
                {Object.entries(cucina.secondi).map(([key, value]) => (
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
                {Object.entries(cucina.bere).map(([key, value]) => (
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
            </Tablecucina>
        </>

    )
}