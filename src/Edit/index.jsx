import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { controllUser, generateUserDocument } from "../firebase";
import { useState } from "react";

const Container = styled.div`
    height: 50vh;
    width: 100vw;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
    word-wrap: break-word;
  `;

export const Input = styled.input`

    width:90%;
    border-radius: 20px ;
    padding-left: 20px;
    margin-bottom: 2vh;
    height: 5vh;
    :focus { outline: none; }
    
  `;

const Text = styled.div`
margin-top: 10vh;
height: 50vh;
width: 100vw;
border-radius: 20px;
padding: 20px;
overflow: scroll;
cursor: grab;
word-wrap: break-word;
-ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
p{
  color: white;
  padding: 10px;
  span{
  color: orange;
  font-weight: bold;
}
}

`;

const Textlittle = styled.div`
margin-top: 10vh;
height: 30vh;
width: 100vw;
border-radius: 20px;
padding: 20px;
overflow: scroll;
cursor: grab;
word-wrap: break-word;
-ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
p{
  color: white;
  padding: 10px;
  span{
  color: orange;
  font-weight: bold;
}
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

const LoginForm = styled.form`
    height: 30vh;
    width: 80vw;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    cursor: grab;
    word-wrap: break-word;
`;

const Crea = styled.form`
    height: 70vh;
    width: 80vw;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    cursor: grab;
    word-wrap: break-word;
`;

const Flex = styled.div`
    height: 15vh;
    width: 80vw;
    margin-top: 40px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
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

const Entra = styled.button`
  width: 50%;
  height:15vh;
  display: flex;
  align-items: center;
  justify-content: center; 
  text-align: center;
  z-index:1000;
  vertical-align: middle;
  background-color: orange ;
  color: var(--white);
  border-radius:20px 0px 0px 20px;
  font-weight: bold;
  .hover{
     transform: scale(1.2);
  }
`;

const Esci = styled.button`
  width: 50%;
  height:15vh;
  display: flex;
  align-items: center;
  justify-content: center; 
  text-align: center;
  z-index:1000;
  vertical-align: middle;
  background-color: #0099ff ;
  color: var(--white);
  border-radius:0px 20px 20px 0px;
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



export default function Edit(props) {

  const { register, handleSubmit } = useForm();

  const [ceck, setceck] = useState({state:0});

  const onSubmit = async data => {

    const verification = await controllUser(data.id);
    if (verification !== null) {

      setceck({verification,state:1})

    }else setceck(false)
    
  };

  const createuserdocument = async data => {
    const all = { numero: data.numero, nome: data.nome, cognome: data.cognome, greenpass: true, privacy: true, covid: true }
    await generateUserDocument(data.numero, all)
    const verification = await controllUser(data.numero);
    setceck(verification)
  };



  if (!ceck) return (
    <>
      <Link to="/">
        <Back>
          <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </Svg>
        </Back>
      </Link>
      <Textlittle>
        <p>
          <span>ATTENZIONE !! ⚠️☢️</span> UTENTE NON TROVATO
          <br /><br /> Crea un nuovo utente per continuare
        </p>
      </Textlittle>
      <Container>
        <Link to="/">
          <Back>
            <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </Svg>
          </Back>
        </Link>
        <Crea onSubmit={handleSubmit(createuserdocument)}>
          <Input type="text" placeholder="Inserisci il nome " {...register("nome")} />
          <Input type="text" placeholder="Inserisci il cogome " {...register("cognome")} />
          <Input type="text" placeholder="Inserisci il numero " {...register("numero")} />
          <Flex>
          <Entra type="submit" >GENERA</Entra>
          <Esci onClick={() => setceck({state:0})}>CAMBIA UTENTE</Esci>
          </Flex>
        </Crea>
      </Container>
    </>
  ); else if (ceck.state===1) return (
    <>
      <Text>
        <p>
          <span>UTENTE TROVATO</span>
          <br /><br /><span>Nome: </span> {ceck.verification.nome}
          <br /><br /><span>Cognome: </span> {ceck.verification.cognome}
          <br /><br /><span>Numero: </span> {ceck.verification.numero}
        </p>
      </Text>
      <Container>
        <Link to="/">
          <Back>
            <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </Svg>
          </Back>
        </Link>
        <Flex>
          <Entra onClick={() => props.setUser("+39"+ceck.verification.numero)}>ENTRA</Entra>
          <Esci onClick={() => setceck({state:0})}>CAMBIA UTENTE</Esci>
        </Flex>
      </Container>
    </>

  ); else return (
    <>
      <Text>
        <p>
          <span>ATTENZIONE !! ⚠️☢️</span> (leggere con attenzione)
          <br /><br />Stai per modificare la prenotazione di un utente
          <br /><br /><span>Controlla</span> che il numero NON abbia il prefisso , nel caso il numero sia sbagliato il sistema non avrà problemi ma invece di modificare la prenotazione verra creata una nuova prenotaione con il nuovo numero. Per verificare che il numero è coretto controlla che nella pagine di ripiloog ci siano le prenotazioni dell utente
          <br /><br /><span>Una volta completato</span> esegui il logout() dall utente , verrai rederizzato alla schermata di login per sicurezza, riesegui il login per tornare nella sezione admin
          <br /><br /><span>NON USARE QUESTO SISTEMA PER FARE NUOVE PRENOTAZIONI</span>
          <br /><br /><span>P.S</span> per favore fate i bravi 🤪
        </p>
      </Text>
      <Container>
        <Link to="/">
          <Back>
            <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </Svg>
          </Back>
        </Link>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" placeholder="Inserisci il numero " {...register("id")} />
          <Flex>
            <Button type="submit" > ENTRA COME UTENTE </Button>
          </Flex>
        </LoginForm>
      </Container>
    </>
  );
}