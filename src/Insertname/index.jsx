import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "../components/Lib";
import useLocalStorage from "../useLocalStorage";
import Insidedata from "../Insidedata";

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
    word-wrap: break-word;
  `;

const LoginForm = styled.div`
    height: 20vh;
    width: 80vw;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    cursor: grab;
    word-wrap: break-word;
`;

const Button = styled.button`
  width: 50vw;
  max-width: 200px;
  height:6vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2vh; 
  text-align: center;
  z-index:1000;
  vertical-align: middle;
  background-color: #ffade3 ;
  color: var(--white);
  border-radius: var(--border-radius);
  font-weight: bold;
  .hover{
     transform: scale(1.2);
  }
`;


export default function Insertname() {

    const { register, handleSubmit } = useForm();
    const [id, setId] = useLocalStorage("id", null);

    const onSubmit = data => {
        console.log(data);
        setId(data.id);
    };

    if (id===null) return (

        <Container>
            <LoginForm onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" placeholder="Inserisci il tuo ID" {...register("id")} />
                <Button type="submit" onClick={handleSubmit(onSubmit)}> ENTRA COME CASSA </Button>
            </LoginForm>
        </Container>

    );else return <Insidedata id={id} setId={setId} />
}