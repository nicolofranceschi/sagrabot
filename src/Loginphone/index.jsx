
import { Container } from "../Editor/Styled";
import { useForm } from "react-hook-form";
import { numero } from "../firebase";
import { useRef } from "react";

export const button = useRef();

export default function Loginphone(){


    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        numero(data.numero)
        console.log(data.numero)
    };
    
    return(
    <Container id="recaptcha-container">
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input type="tel" {...register("numero")} />  
        
        <input ref={button} type="submit" />
        </form>
        </Container>
    );

}