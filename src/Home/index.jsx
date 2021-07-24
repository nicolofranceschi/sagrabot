import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getUserDocument } from "../firebase";
import { Link } from "react-router-dom";
import { useWindowSize } from "../useWindowSize";
import {  Card, Container,  Grid, Svg, Svg1, Testo , Left , Right, TestoBig , Blocco , Close , Title , Flex , Dati} from './styled';

function getHeight(length, height) {
  const totalScroll = length * height / 4;
  return totalScroll;
}

let result = [];

export default function Home() {

    const [data, setData] = useState(null);
    const [page, setPage] = useState({
       state: false,
       data:null
    });
    const { width, height } = useWindowSize();

    useEffect(async () => {
        try {
            const res = await getUserDocument("sala");
            if (!res) throw "No connection"
            setData(res?.sale['SAGRA']);
        } catch (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                draggable: true,
            });
        }
    }, [])

    if (data != null) {

        result = Object.entries(data).reduce((acc, pixel) => {
            const [key, value] = pixel;
            const { prenotazioni } = value;

            if (!prenotazioni || prenotazioni.length === 0) return acc;

            const temp = value.prenotazioni.reduce((accPrenotazioni, prenotazione) => prenotazione.type !== 'default' && prenotazione.user === '3495141095' ? accPrenotazioni : ({
                ...accPrenotazioni,
                [`${prenotazione.data}-${prenotazione.orario}`]: { ...prenotazione, pixel: key }
            }), {});
            return {
                ...acc,
                ...Object.entries(temp).reduce((externalAcc, [id, current]) => ({
                    ...externalAcc,
                    [id]: [...(acc[id] ?? []), current]
                }), {})
            }
        }, {});

        const gianni = Object.entries(result).map(([key, value]) => {
            let disegno=[];
            let x=0;
            for (let a = 0 ; a < value.length*2; a++) {
                  x=x+50;
                for (let i = 0 ; i < value.length*2; i++) {
                    disegno.push(value[0].pixel+i-value.length+x)
                  }
              }
            return disegno;
        })

        console.log(gianni)
    }

    if (!page.state) return (
        <div>
            <ToastContainer
                position="top-right"
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                draggable
                hideProgressBar
            />
            <Flex orientation={"row"}>
    <Title size={27}>Ciao</Title>
    <Flex orientation={"column"}>
    <Dati size={3}>Nicolo</Dati>
    <Dati size={3}>Franceschi</Dati>
            </Flex>
            </Flex>
      <Container>
        <Grid
          style={{
            width,
            height: getHeight(width < 600 ? length : length, height),
            y: scrollY
          }}
          drag="y"
          dragConstraints={{
            top: -getHeight(width < 600 ? length : length, height),
            bottom: 0
          }}
        >
          {Object.entries(result).map(([key,value], i) => (
            <Card onClick={() => setPage({state:true , data:value})} key={i}>
              <Svg onClick={() => {}} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" height="50px" fill="none" viewBox="0 0 24 24" stroke="red">
                <path strokeLinecap="red" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </Svg>
             <Right>
                <TestoBig>{key.substr(0,2)}</TestoBig>
                <Testo>{key.substr(2)}</Testo>
             </Right>
            <Left>
               <TestoBig>{value.length}</TestoBig>
               <Testo>POSTI</Testo>
            </Left>
            </Card>
          ))
          }
          </Grid>
          <Link to="/data">
          <Svg1 xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#ffade3">
            <path margin="60px" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </Svg1>
            </Link>
      </Container>
        </div>
    );
  else return (
      <Blocco>
          <Close onClick={() => setPage({state:false })} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" height="50px" fill="none" viewBox="0 0 24 24" stroke="red">
                <path strokeLinecap="red" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </Close>
      </Blocco>
  );

}
