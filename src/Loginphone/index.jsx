
import { Container, LoginForm, Accedi, Label, InputProps,Scroll, Icona, Span, Accordion, Checkbox, Textconstol, DivCheckbox, Divspace, Back, Svg } from "./styled";
import { Input, Button, ButtonBig } from "../components/Lib";
import { useForm } from "react-hook-form";
import { initRecaptcha, signInWithPhoneNumber, sendVerificationCode } from "../firebase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import icon from "./icon.png";
import AccediForm from "./AccediForm"



export default function Loginphone() {

    
    const [step, setStep] = useState(0);

    const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();


    const [accedi, setAccedi] = useState(false);

    const [{ privacy, covid, pass }, setClausole] = useState({ privacy: false, covid: false, pass: false });

    useEffect(() => { initRecaptcha('recaptcha-container') }, []);

    const onSubmit = data => {
        try {
            if (!isSubmitted) signInWithPhoneNumber("+39"+data.numero)
            else sendVerificationCode(data.code,data)
        } catch (error) {
            toast.error(error);
        }
    };

    const back = (e) => {
        e?.preventDefault();
        setStep((step) => step - 1);
    };

    const next = (e) => {
        e?.preventDefault();
        if (step === 3 && (privacy === false || covid === false || pass === false)) {
            toast.error("Devi accettare tutti i campi")
        } else setStep((step) => step + 1);
    };

    if (accedi) {

       return <AccediForm set={setAccedi} ></AccediForm>

    } else return (
        <>
            <Container>
                <Icona src={icon}></Icona>
                {step > 0 ?
                    <Back onClick={back}>
                        <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </Svg>
                    </Back>
                    : <div></div>}
                <LoginForm onSubmit={handleSubmit(onSubmit)}>
                    <Accordion show={step === 0}>
                        <>
                            <Label>
                                <Span font={"1.5rem"} bold={"normal"} >Benvenuto in</Span>
                                <Span font={"1.5rem"} bold={"bold"} >SagraBot </Span>
                            </Label>
                            <Divspace space={"10vh"}></Divspace>
                            <ButtonBig onClick={next} type="submit" margin="5vh 0 0 0" padding="15px 0">PRENOTA</ButtonBig>
                            <Accedi onClick={() => setAccedi(true)} type="submit" margin="5vh 0 0 0" padding="15px 0">Accedi</Accedi>
                        </>
                    </Accordion>
                    <Accordion show={step === 1}>
                        <>
                            <Label>
                                <Span font={"0.7rem"} bold={"normal"} >1 -</Span>
                                <Span font={"1.5rem"} bold={"normal"} >Inserisci il tuo</Span>
                                <Span font={"1.5rem"} bold={"bold"} >nome</Span>
                            </Label>
                            <Divspace space={"10vh"}></Divspace>
                            <Input {...InputProps} autocomplete={"name"} type="text" {...register("nome")} />
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
                            <Input {...InputProps} autocomplete={"name"} type="text" {...register("cognome")} />
                            <Button onClick={next} type="submit" margin="5vh 0 0 0" padding="15px 0">AVANTI</Button>
                        </>
                    </Accordion>
                    <Accordion show={step === 3}>
                        <>
                            <Label>
                                <Span font={"0.7rem"} bold={"normal"} >3 -</Span>
                                <Span font={"1.5rem"} bold={"normal"} >Accetta le</Span>
                                <Span font={"1.5rem"} bold={"bold"} >clausole</Span>
                            </Label>
                            <Span font={"0.5rem"} bold={"bold"} >Sei obbligato ad accettare le clausole per poter procedere</Span>
                            <Divspace space={"3vh"}></Divspace>
                            <Scroll>
                            <DivCheckbox>
                                <Checkbox onClick={() => setClausole({ privacy: !privacy, covid, pass })} type="checkbox" {...register("privacy", { required: true })} ></Checkbox>
                                <Textconstol font={"0.7rem"} bold={"bold"} >Ai sensi e per gli effetti degli artt. 13 e 23 del D. L.gs. n. 196/2003, con l’accettazione del presente
                                modulo esprimo il mio consenso al trattamento dei miei dati personali, secondo le modalità e nei
                                limiti di cui all’informativa <a href="https://sagrealidosiane.files.wordpress.com/2021/07/informativa-privacy-rev-2021.pdf" target="_blank">(INFORMATIVA PRIVACY)</a> </Textconstol>
                            </DivCheckbox>
                            <DivCheckbox>
                                <Checkbox onClick={() => setClausole({ privacy, covid: !covid, pass })} type="checkbox" {...register("covid", { required: true })} ></Checkbox>
                                <Textconstol font={"0.7rem"} bold={"bold"} > Confermo di aver letto le  <a href="https://sagrealidosiane.files.wordpress.com/2021/07/rispetto-linee-guide-covid.pdf" target="_blank">Linee guida</a> di gestione emergenza Covid: indicazioni per le sagre e le fiere locali organizzate
                                da Proloco Alidosiana e che sono a conoscenza che il rispetto di tale linea guida è condizione
                                essenziale per ricevere i servizi richiesti e poter accedere alle aree dove si svlgono le sagre indicate .</Textconstol>
                            </DivCheckbox>
                            <DivCheckbox>
                                <Checkbox onClick={() => setClausole({ privacy, covid, pass: !pass })} type="checkbox" {...register("greenpass", { required: true })} ></Checkbox>
                                <Textconstol font={"0.7rem"} bold={"bold"} > Alla luce degli obblighi introdotti con <a href="https://sagrealidosiane.files.wordpress.com/2021/07/atto-completo-___.pdf" target="_blank">DECRETO-LEGGE 23 luglio 2021, n. 105</a> con la presente confermo di conoscerne i contenuti e che al momento dell’accesso allo
                                stand alimentare dell’area Feste io e le persone per cui ho eseguito la prenotazione saranno in regola con
                                quanto previsto dal DECRETO-LEGGE 23 luglio 2021, n. 105 , con l’esclusione dei casi indicati esse saranno
                                dotati di Certificazioni verdi Covid 19 , ovvero a richiesta delle autorità potranno dimostrare di possedere il
                                Green Pass .</Textconstol>
                            </DivCheckbox>
                            </Scroll>
                            <Button onClick={next} type="submit" margin="5vh 0 0 0" padding="15px 0">AVANTI</Button>
                        </>
                    </Accordion>
                    <Accordion show={step === 4}>
                        <>
                            <Label>
                                <Span font={"0.7rem"} bold={"normal"} >4 -</Span>
                                <Span font={"1.5rem"} bold={"normal"} >Inserisci il tuo</Span>
                                <Span font={"1.5rem"} bold={"bold"} >numero</Span>
                            </Label>
                            <Divspace space={"10vh"}></Divspace>
                            <Label>
                            <Span font={"1rem"} bold={"normal"} >+39</Span>
                            <Input {...InputProps} type="tel" {...register("numero")} />
                            </Label>
                            <Button onClick={() => setStep((step) => step + 1)} type="submit" margin="5vh 0 0 0" padding="15px 0">AVANTI</Button>
                            <input id="recaptcha-container" type="hidden" />
                        </>
                    </Accordion>
                    <Accordion show={step === 5}>
                        <>
                            <Label>
                                <Span font={"0.7rem"} bold={"normal"} >5 -</Span>
                                <Span font={"1.5rem"} bold={"normal"} >Inserisci il </Span>
                                <Span font={"1.5rem"} bold={"bold"} >codice OTP</Span>
                            </Label>
                            <Span font={"0.5rem"} bold={"bold"} >Inserisci il codice che ti verra inviato per mesaggio</Span>
                            <Divspace space={"10vh"}></Divspace>
                            <Input  {...InputProps} type="number" {...register("code")} />
                            <Button type="submit" margin="5vh 0 0 0" padding="15px 0">AVANTI</Button>
                            <input id="recaptcha-container" type="hidden" />
                        </>
                    </Accordion>
                </LoginForm>
            </Container>
        </>
    );

}