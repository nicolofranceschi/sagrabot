import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { getdatasala, updatedatasala } from '../firebase';
import { toast } from "react-toastify";

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

const Entra = styled.button`
    width: 90%;
    margin-left: 5%;
    height:15vh;
    display: flex;
    align-items: center;
    justify-content: center; 
    text-align: center;
    z-index:1000;
    vertical-align: middle;
    background-color: orange ;
    color: var(--white);
    border-radius:20px;
    font-weight: bold;
    .hover{
    transform: scale(1.2);
    }
`;

const Flex = styled.div`
    height: 15vh;
    width: 100vw;
    margin-top: 40px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    cursor: grab;
    word-wrap: break-word;
`;

const Crea = styled.form`
    padding-top: 12vh;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    cursor: grab;
    word-wrap: break-word;
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

export const Input = styled.input`

    width:90%;
    border-radius: 5px ;
    margin-left: 5%;
    padding-left: 20px;
    margin-bottom: 2vh;
    height: 5vh;
    :focus { outline: none; }
    
  `;

export const Tavolo = styled.input`

     width:90%;
     border-radius: 5px ;
        margin-left: 5%;
        padding-left: 20px;
        margin-bottom: 2vh;
        height: 10vh;
        :focus { outline: none; }

`;

const Data = styled.select`

  background-color:fuchsia;
  border-radius: 5px ;
  margin-left: 5%;
  padding-left: 20px;
  margin-bottom: 2vh;
  height: 10vh;
  padding: 10px;
  width: 90%;
  -webkit-appearance: none;
  :focus{outline: none;}
  p{
    padding-left: 10px;
    font-weight: bold;
  }
`;


export default function Add() {

    const { register, handleSubmit } = useForm();

    const history = useHistory();

    const onSubmit = async data => {

        try {

            const dataprenotazione = { [`${data.data}-+39${data.numero}`]: { menu: [0, 0, 0, 0], user: `+39${data.numero}`, Ntavoli: [data.tavolo], nome: data.nome, cognome: data.cognome, allergie: "null", state: "entrata", persone: data.persone, data: new Date() } };

            const response = await getdatasala();

            if (!response) throw new Error("ERRORE nel prendere nel prendere le prenotazioni 😞, ricarica");

            await updatedatasala({ ...dataprenotazione, ...response });

            history.replace('/');

            toast.success("Prenotazione aggiunta al gestionale 🎉")

        } catch (e) {

            console.log(e)

        }



    };

    return (
        <Container>
            <Link to="/">
                <Back>
                    <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </Svg>
                </Back>
            </Link>
            <Crea onSubmit={handleSubmit(onSubmit)}>
                <Data {...register("data")} >
                <option value="10 Ottobre-alle 12:00">10 Ottobre-alle 12:00</option>
                <option value="17 Ottobre-alle 12:00">17 Ottobre-alle 12:00</option>
                <option value="24 Ottobre-alle 12:00">24 Ottobre-alle 12:00</option>
                <option value="31 Ottobre-alle 12:00">31 Ottobre-alle 12:00</option>
                </Data>
                <Input type="text" placeholder="Inserisci il nome " {...register("nome")} />
                <Input type="text" placeholder="Inserisci il cogome " {...register("cognome")} />
                <Input type="text" placeholder="Inserisci il numero " {...register("numero")} />
                <Tavolo type="text" placeholder="Inserisci il tavolo " {...register("tavolo")} />
                <Tavolo type="text" placeholder="N. Persone " {...register("persone")} />
                <Flex>
                    <Entra type="submit" >GENERA</Entra>
                </Flex>
            </Crea>
        </Container>
    )
}