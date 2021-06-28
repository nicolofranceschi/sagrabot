import { useWindowSize } from "../useWindowSize";
import { lazy, Suspense, useEffect, useState } from "react";
import { useMotionValue, useTransform } from "framer-motion";
import { Pop, Container, Svgpiu , Svgout ,Svgmap , Utente , TextAlert, Grid } from './styled';

const Editor = lazy(() => import('../Editor'));

function getHeight(length, height) {
    const totalScroll = length * height / 2;
    return totalScroll;
  }

export default  function Sale  () {

const items = ["selected_pixels","add"];

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
        ? items.map((e) => (
            e == "add" ? ( 
            <TextAlert>AGGIUNGI SALE</TextAlert>
            //div che aggiunge un local storage nuovo
            ) 
            : (
         <Suspense key={e} fallback={<div style={{ width: '100%', height: '100%', backgroundColor: 'white', borderRadius: '20px', opacity: 0.7 }} />}>
            <Editor idlocalestorage={e} />
          </Suspense>
          )
        ))
        : (
        <>
        <TextAlert>AGGIUNGI SALE</TextAlert>
        </>
        )
      }
    </Grid>
  </Container>
  </div>
);

}