
import { Container, LoginForm, Accedi, Label, InputProps, Icona, Span, Accordion,  Divspace, Back, Svg } from "./styled";
import { Input, Button, ButtonBig } from "../components/Lib";
import { useForm } from "react-hook-form";
import { initRecaptcha, signInWithPhoneNumber, sendVerificationCode , Controlluser } from "../firebase";
import { useEffect, useState } from "react";
import Restaurant from './Animations.json';
import { toast } from "react-toastify";
import icon from "./icon.png";


export default function AccediForm ({set}){
   

    const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();

    const [step, setStep] = useState(0);

    const onSubmit = async data => {
        try {
           if (!isSubmitted) {
              const verification =  await Controlluser(data.numero);
              console.log(verification)
              if (verification!==null){
                signInWithPhoneNumber(data.numero);
              }else {
                  toast.error("Registrati prima di accedere");
                  set(false);
              }
           }else sendVerificationCode(data.code);

        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => { initRecaptcha('recaptcha-container') }, []);

    const back = (e) => {
        e?.preventDefault();
        setStep((step) => step - 1);
    };
    
    
 return (
    <Container>
         <Icona src={icon}></Icona>
        {step > 0 ?
                    <Back onClick={back}>
                        <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </Svg>
                    </Back>
                    : <Back onClick={()=>set(false)}>
                    <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </Svg>
                </Back>}
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Accordion show={step === 0}>

            <Label>
                <Span font={"0.7rem"} bold={"normal"} >1 -</Span>
                <Span font={"1.5rem"} bold={"normal"} >Inserisci il tuo</Span>
                <Span font={"1.5rem"} bold={"bold"} >numero</Span>
            </Label>
            <Divspace space={"10vh"}></Divspace>
            <Input {...InputProps} type="tel" {...register("numero")} />
            <Button onClick={() => setStep((step) => step + 1)} type="submit" margin="5vh 0 0 0" padding="15px 0">AVANTI</Button>
            <input id="recaptcha-container" type="hidden" />

        </Accordion>
        <Accordion show={step === 1}>

            <Label>
                <Span font={"0.7rem"} bold={"normal"} >2 -</Span>
                <Span font={"1.5rem"} bold={"normal"} >Inserisci il </Span>
                <Span font={"1.5rem"} bold={"bold"} >codice OTP</Span>
            </Label>
            <Span font={"0.5rem"} bold={"bold"} >Inserisci il codice che ti verra inviato per mesaggio</Span>
            <Divspace space={"10vh"}></Divspace>
            <Input  {...InputProps} type="number" {...register("code")} />
            <Button type="submit" margin="5vh 0 0 0" padding="15px 0">AVANTI</Button>
            <input id="recaptcha-container" type="hidden" />

        </Accordion>
</LoginForm>
</Container>

);

 }
