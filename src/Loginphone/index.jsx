
import { Container ,  LoginForm , Label , InputProps , Animation , Span , Accordion , ButtonStart , Checkbox , Textconstol , DivCheckbox , Divspace, Back , Svg} from "./styled";
import { Input, Button } from "../components/Lib";
import { useForm } from "react-hook-form";
import { initRecaptcha, signInWithPhoneNumber, sendVerificationCode  } from "../firebase";
import { useEffect , useState} from "react";
import Restaurant from './Animations.json';
import { toast } from "react-toastify";


export default function Loginphone(setUser) {

    const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();

    const [step, setStep] = useState(0);

    const [{privacy,covid,pass}, setClausole] = useState({privacy:false,covid:false,pass:false});

    useEffect(() => { initRecaptcha('recaptcha-container') }, []);

    const onSubmit = data => {
       try{ 
        if (!isSubmitted) signInWithPhoneNumber(data.numero);
        else sendVerificationCode(data.code);
        setUser(data);
       }catch(error){
       toast.error(error);
       }
    };

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: Restaurant,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

      const back = (e) => {
        e?.preventDefault();
        setStep((step) => step - 1);
      };
      const next = (e) => {
        e?.preventDefault();
        if(step===2 && (privacy===false || covid===false || pass===false)){
           toast.error("Devi accettare tutti i campi")
        }else setStep((step) => step + 1);
      };

    return (
        <>
        <Container>
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
                        <Span font={"0.7rem"} bold={"normal"} >1 -</Span>
                        <Span font={"1.5rem"} bold={"normal"} >Inserisci il tuo</Span>
                        <Span font={"1.5rem"} bold={"bold"} >nome</Span>
                        </Label>
                        <Divspace space={"10vh"}></Divspace>
                        <Input {...InputProps} autocomplete={"name"} type="text" {...register("nome")} />
                        <Button onClick={next} type="submit" margin="5vh 0 0 0" padding="15px 0">AVANTI</Button>
                    </>
            </Accordion>
            <Accordion show={step === 1}>
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
            <Accordion show={step === 2}>
                    <>
                        <Label>
                        <Span font={"0.7rem"} bold={"normal"} >3 -</Span>
                        <Span font={"1.5rem"} bold={"normal"} >Accetta le</Span>
                        <Span font={"1.5rem"} bold={"bold"} >clausole</Span>
                        </Label>
                        <Span font={"0.5rem"} bold={"bold"} >Sei obbligato ad accettare le clausole per poter procedere</Span>
                        <Divspace space={"3vh"}></Divspace>
                        <DivCheckbox>
                        <Checkbox onClick={()=>setClausole({privacy:!privacy,covid,pass})} type="checkbox" {...register("privacy",{ required: true })} ></Checkbox>
                        <Textconstol  font={"0.7rem"} bold={"bold"} >Dichiaro di aver letto le condizioni sulla Privacy</Textconstol>
                        {errors.lastName && "Last name is required"}
                        </DivCheckbox>
                        <DivCheckbox>
                        <Checkbox onClick={()=>setClausole({privacy,covid:!covid,pass})} type="checkbox" {...register("covid",{ required: true })} ></Checkbox>
                        <Textconstol  font={"0.7rem"} bold={"bold"} >Dichiaro di aver letto il regolamento COVID-19</Textconstol>
                        </DivCheckbox>
                        <DivCheckbox>
                        <Checkbox onClick={()=>setClausole({privacy,covid,pass:!pass})} type="checkbox" {...register("greenpass",{ required: true })} ></Checkbox>
                        <Textconstol  font={"0.7rem"} bold={"bold"} >Dichiaro di aessere munito di Green-Pass</Textconstol>
                        </DivCheckbox>
                        <Button onClick={next} type="submit" margin="5vh 0 0 0" padding="15px 0">AVANTI</Button>
                    </>
            </Accordion>
             <Accordion show={step === 3}>
                    <>
                        <Label>
                        <Span font={"0.7rem"} bold={"normal"} >4 -</Span>
                        <Span font={"1.5rem"} bold={"normal"} >Inserisci il tuo</Span>
                        <Span font={"1.5rem"} bold={"bold"} >numero</Span>
                        </Label>
                        <Divspace space={"10vh"}></Divspace>
                        <Input {...InputProps}  type="tel" {...register("numero")} />
                        <Button onClick={()=>setStep((step) => step + 1)} type="submit" margin="5vh 0 0 0" padding="15px 0">AVANTI</Button>
                        <input id="recaptcha-container" type="hidden" />
                    </>
                </Accordion>
                <Accordion show={step === 4 }>
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