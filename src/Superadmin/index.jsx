import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import styled from "styled-components";


const Container = styled.div`
  height: calc(85vh - 20px);
  bottom: 20px;
  position: absolute;
  width: 100vw;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.div`
    
        position: absolute;
        top: 0;
        width: 100vw;
        padding: 20px ;
        line-height: 15vh;
        color: white;
        font-weight: bold;
        font-size: 8vh; 
        
`;

const Scroll = styled.div`
  height: 60vh;
  margin-top: 10vh;
  width: 90vw;
  margin-left: 5vw;
  border-radius: 20px;
  background-color: white;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  background-color: var(--line) ; 
  overflow: hidden;
  p{
      color: var(--white);
      font-weight:bold;
  }
`;

const Total = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  display: flex;
      flex-direction:row;
      align-items:center;
      justify-content: space-around;
  padding: 0px 10px;
  background-color: var(--line) ; 
  overflow: hidden;
  p{
      color: var(--white);
      font-weight:bold;
  }
`;

const Partial = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px 10px;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
  p{
      color: black;
      background-color: #6a6af0;
      border-radius:5px;
      height: 50px;
      width: 95%;
      margin-top: 10px;
      font-weight:bold;
      display: flex;
      flex-direction:row;
      align-items:center;
      justify-content: space-around;
  }
`;

export default function Superadmin() {

    const [data, setData] = useState({});

    useEffect(() => {

        try {
            firestore.collection("admin").doc("stampa").onSnapshot((doc) => {

                const conto = Object.entries(doc.data()).reduce((acc, [chiave, valore]) => {
                    
                     return {
                        ...acc,
                        [chiave.substr(0, 20)]: {
                            ...acc[chiave.substr(0, 20)],
                            [valore.admin]: (acc[chiave.substr(0, 20)]? acc[chiave.substr(0, 20)][valore.admin] ? acc[chiave.substr(0, 20)][valore.admin] : 0 : 0)+ valore.tot,
                            tot: valore.tot + (acc[chiave.substr(0, 20)] ? acc[chiave.substr(0, 20)].tot : 0)
                        }
                    }
                }, {})

                if (conto !== null) setData(conto);

            });

        } catch (error) {

            console.log(error.message);

        }

    }, [])

    console.log(data)

    return (
<>
<Title>CONT 💻</Title>
        <Container>
            {Object.entries(data).map(([key, valore]) =>  (
                <Scroll key={key} >
                   <Header>
                    <p>{key}</p>
                   </Header>
                   <Partial>
                       {Object.entries(data[key]).map(([admin, tot]) =>  (
                           admin!=="tot" ? 
                           <p key={admin} >
                               <span>{admin}</span>
                               <span>{tot} €</span>
                           </p>
                           :null
                        ))}
                   </Partial>
                <Total>
                    <p>Totale</p>
                    <p>{data[key]["tot"]} €</p>
                </Total>
                </Scroll>
            ))}
        </Container>
</>
    );
}