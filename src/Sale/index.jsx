import { useWindowSize } from "../useWindowSize";
import { lazy, Suspense , useContext } from "react";
import {  Container,  Grid,Card , Testo} from './styled';
import { Link } from "react-router-dom";
import { SaleContext } from '../App';

const Editor = lazy(() => import('../Editor'));

function getHeight(length, height) {
    const totalScroll = length * height / 2;
    return totalScroll;
  }

export default  function Sale  () {

const [sale,setSale] = useContext(SaleContext);

const items = ["selected_pixels","Max 25 ","add"];

const { width , height } = useWindowSize();

return(
    <div style={{ overflow: 'hidden', height: '100vh', position: 'relative' }}>
    <Container whileTap={{ cursor: "grabbing" }}>
    <Grid
      style={{
        width,
        height: getHeight(width < 768 ? length : length / 2, height),
        y: scrollY
      }}
      drag="y"
      dragConstraints={{
        top: -getHeight(width < 768 ? length : length / 2, height),
        bottom: 0
      }}
    >
      { items.length > 0
        ? items.map((e,_id) => (
            e == "add" ? ( 
                <Suspense key={_id} fallback={<div style={{ width: '100%', height: '100%', backgroundColor: 'white', borderRadius: '20px', opacity: 0.7 }} />}>
                   <Link to="/editor">
                      <Card onClick={()=>setSale(e)}>
                        <Testo>AGGIUNGI SALE</Testo>
                      </Card>
                    </Link>
                </Suspense> 
            //div che aggiunge un local storage nuovo
            ) 
            : (
          <Suspense key={_id} fallback={<div style={{ width: '100%', height: '100%', backgroundColor: 'white', borderRadius: '20px', opacity: 0.7 }} />}>
           <Link to="/editor">
            <Card onClick={()=>setSale(e)}>
              <Testo idlocalestorage={e} >{e}</Testo>
            </Card>
            </Link>
          </Suspense>
          

          )
        ))
        : (
        <>
        <Testo>AGGIUNGI SALE</Testo>
        </>
        )
      }
    </Grid>
  </Container>
  </div>
);

}