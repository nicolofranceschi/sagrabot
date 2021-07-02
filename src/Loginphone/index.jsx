
import { Container } from "../Editor/Styled";
import { useForm } from "react-hook-form";
import { initRecaptcha, signInWithPhoneNumber, sendVerificationCode } from "../firebase";
import { useEffect } from "react";

export default function Loginphone() {
    const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();

    useEffect(() => { initRecaptcha('recaptcha-container') }, []);

    const onSubmit = data => {
        if (!isSubmitted) signInWithPhoneNumber(data.numero);
        else sendVerificationCode(data.code);
    };

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                {!isSubmitted
                    ? <input type="tel" {...register("numero")} />
                    : <input type="number" {...register("code")} />
                }
                <input type="submit" />
                <input id="recaptcha-container" type="hidden" />
            </form>
        </Container>
    );

}