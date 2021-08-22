
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
    z-index:100;
  `;

export const ContainerClose = styled.div`
    height: 70px;
    bottom: 25px;
    right: 25px;
    width: 60px;
    overflow: hidden;
    position: absolute;
    background-color: #adaeff;
    border-radius: 60px;
    display:flex;
    align-items: center;
    justify-content: center;
    z-index:100;
`;

export const Svg = styled.svg`
    height: 35px;
    width: 35px;
    stroke:white;
    margin-top: 10px;
    margin-bottom: 10px;
    z-index:101;
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
    z-index:101;
    :hover {
        transform: scale(0.9);
    }

    
`;


export default function PlusButton(options) {

    const [open, setOpen] = useState(false);

    if (!open) return (

        <ContainerClose>
            <Svg onClick={() => setOpen(true)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </Svg>
        </ContainerClose>

    );
    else return (
        <ContainerOpen>
            <Link to="/edit">
                <SvgOpen xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="orange">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </SvgOpen>
            </Link>
            <Link to="/insidedata">
                <SvgOpen color={"white"} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </SvgOpen>
            </Link >
            <Link to="/map">
                <SvgOpen xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </SvgOpen>
            </Link>
            <SvgOpen color={"red"} onClick={() => setOpen(false)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </SvgOpen>

        </ContainerOpen>
    )

}