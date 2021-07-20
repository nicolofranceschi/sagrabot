

import { Widget } from '@typeform/embed-react'

import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export default function TypeForm() {
   

    return (
        <Container>
            <Widget id="xbDeXcjB" style={{ width: '100%' , height: '100%'}} onSubmit={console.log("ciao")} />
        </Container>
    );

}