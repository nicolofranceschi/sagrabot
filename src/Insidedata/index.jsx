
import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { Card, Container, State ,Tavoli, TavoliText,  Find, Allergie, P1, P2, LoginForm, Input, Button, Eliminazione, ButtonTavoli, Testo, Left, P, Menuimg, Menu, Right, Space, TestoBig, Line, Pop, Blocco, Close, Title, Titlelitte, Flex, Svgout, Scroll } from './styled';

export default function Insides(options) {

    const [data,setData] = useState({});

    useEffect(() => {

        try {

            firestore.collection("admin").doc("prenotazioni").onSnapshot((doc) => {
                console.log(doc.data())
                if (doc.data() !== null) setData(doc.data());
            });

        }catch(error) {

            console.log(error.message);

        }

    },[])



    return (
        <div>
        <Title size={6}>Listig data 🥳</Title>
        <Container>
         <Scroll>
          { Object.entries(data).map(([key, value]) => (
              <Card key={key} >
                  <State>
                      <div color={"greenyellow"}></div>
                      <p>{value.state}</p>
                      </State>
                  <Right>
                  <Testo line={"5vh"} size={"1vh"} color={"white"} padding={"10px"}>{key}</Testo>
                  <Testo line={"5vh"} size={"3vh"} color={"var(--line)"}padding={"10px"}>{value.nome}</Testo>
                  <Testo line={"5vh"} size={"3vh"} color={"var(--line)"}padding={"10px"}>{value.cognome}</Testo>
                  </Right>
                  <Left>
                      {value.Ntavoli.map((value) => (
                           <Testo key={value} line={"25vh"}  size={"5vh"} padding={"10px"}>{value}</Testo>
                      ))}
                  </Left>
              
              </Card>
          )) }
        </Scroll>
        </Container>
        </div>
    );
}