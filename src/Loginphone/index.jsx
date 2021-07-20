
import { Container ,  LoginForm , Label , InputProps , Animation} from "./styled";
import { Input, Button } from "../components/Lib";
import { useForm } from "react-hook-form";
import { initRecaptcha, signInWithPhoneNumber, sendVerificationCode , generateUserDocument } from "../firebase";
import { useEffect } from "react";
import Restaurant from './Animations.json';
import { Widget } from '@typeform/embed-react'

export default function Loginphone() {
    const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();

    useEffect(() => { initRecaptcha('recaptcha-container') }, []);

    const onSubmit = data => {
        if (!isSubmitted) signInWithPhoneNumber(data.numero);
        else sendVerificationCode(data.code);
    };

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: Restaurant,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    return (
        <>
        <Container>
            <Animation options={defaultOptions} />
            <LoginForm onSubmit={handleSubmit(onSubmit)}>
                {!isSubmitted
                    ?   <Label>
                            <span>Numero di telefono</span>
                            <Input {...InputProps} type="tel" {...register("numero")} />
                        </Label>
                    : <Label>
                            <span>Codice di verifica</span>
                            <Input  {...InputProps} type="number" {...register("code")} />
                        </Label>
                }
                <Button type="submit" margin="5vh 0 0 0" padding="15px 0">PRENOTA</Button>
                <input id="recaptcha-container" type="hidden" />
            </LoginForm>
        </Container>
        </>
    );

}