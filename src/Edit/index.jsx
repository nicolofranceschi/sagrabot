import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "../components/Lib";
import { Link } from "react-router-dom";

const Container = styled.div`
    height: 40vh;
    width: 100vw;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
    word-wrap: break-word;
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
    height: 20vh;
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
    height: 10vh;
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

  const onSubmit = data => {

    props.setUser(data.id)

  };

  return (
    <>
      <Text>
        <p>
          <span>ATTENZIONE !! ⚠️☢️</span> (leggere con attenzione)
          <br /><br />Stai per modificare la prenotazione di un utente 
          <br /><br /><span>Controlla</span> che il numero abbia il prefisso , nel caso il numero sia sbagliato il sistema non avrà problemi ma invece di modificare la prenotazione verra creata una nuova prenotaione con il nuovo numero. Per verificare che il numero è coretto controlla che nella pagine di ripiloog ci siano le prenotazioni dell utente   
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