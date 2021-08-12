import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "../components/Lib";
import useLocalStorage from "../useLocalStorage";
import Insidedata from "../Insidedata";
import { Link } from "react-router-dom";

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

const Back = styled.div`
position: absolute;
top:20px;
left:10px;
height: 50px;
width: 50px;
border-radius: 20px;
backdrop-filter: blur(30px);
z-index:10;
:hover{ 
  transform: scale(1.2);
}
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
const Svg = styled.svg`
  margin:15px;
  height:20px;
  width:20px;
  stroke: white;
  stroke-width:0;
  :hover{
    transform: scale(0.9);
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
            <Link to="/">
        <Back>
          <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </Svg>
        </Back>
      </Link>
            <LoginForm onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" placeholder="Inserisci il tuo ID" {...register("id")} />
                <Button type="submit" onClick={handleSubmit(onSubmit)}> ENTRA COME CASSA </Button>
            </LoginForm>
        </Container>

    );else return <Insidedata id={id} setId={setId} />
}