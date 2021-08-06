
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const ContainerOpen = styled.div`
    height: 250px;
    bottom: 25px;
    right: 25px;
    width: 60px;
    overflow: hidden;
    position: absolute;
    background-color: var(--line);
    border-radius: 60px;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

export const ContainerClose = styled.div`
    height: 70px;
    bottom: 25px;
    right: 25px;
    width: 60px;
    overflow: hidden;
    position: absolute;
    background-color: var(--line);
    border-radius: 60px;
    display:flex;
    align-items: center;
    justify-content: center;
`;

export const Svg = styled.svg`
    height: 35px;
    width: 35px;
    stroke:white;
    margin-top: 10px;
    margin-bottom: 10px;
    :hover {
        transform: scale(0.9);
    }

    
`;

export const SvgOpen = styled.svg`
    height: 35px;
    width: 35px;
    margin-top: 10px;
    margin-bottom: 10px;
    stroke:${props => props.color};
    :hover {
        transform: scale(0.9);
    }

    
`;


export default function PlusButton(options) {

    const [open,setOpen] = useState(false);

   if (!open) return(

    <ContainerClose>
    <Svg onClick={()=>setOpen(true)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </Svg>
    </ContainerClose>

   );
   else return (
    <ContainerOpen>
    <Link to="/qrreader">
    <SvgOpen color={"white"} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
    </SvgOpen>
    </Link>
    <SvgOpen color={"white"} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </SvgOpen>

    <SvgOpen color={"white"} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </SvgOpen>

    <SvgOpen color={"red"} onClick={()=>setOpen(false)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </SvgOpen>

    </ContainerOpen>
   )

}