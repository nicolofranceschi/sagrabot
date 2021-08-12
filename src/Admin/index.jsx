import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { Container, LoginForm,Admin,  Label, Span,  Divspace } from "./styled";
import { Link } from "react-router-dom";
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
       <Link to="/">
         <Admin>
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
        </svg>
         </Admin>
       </Link>
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