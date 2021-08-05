import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { Container, LoginForm,  Label, Span,  Divspace } from "./styled";
import { InputAdmin, Button } from "../components/Lib";

export default function Adimn() {

    const { register, handleSubmit } = useForm();

    const onSubmit = async ({ email, password }) => {
        try{
            console.log(email, password);
    
          await auth.signInWithEmailAndPassword("sagradelporcino@gmail.com", password);
    
        }catch (error) {
          console.log(error.message);
        }
      }


    return (
     <Container>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <Label>
                <Span font={"1.5rem"} bold={"normal"} >Area</Span>
                <Span font={"1.5rem"} bold={"bold"} >admin</Span>
            </Label>
            <Divspace space={"10vh"}></Divspace>
            <InputAdmin  placeholder="password"  type="text" {...register("password")} />
            <Button type="submit" margin="5vh 0 0 0" padding="15px 0">ACCEDI</Button>
        </LoginForm>
        </Container>
    );
}