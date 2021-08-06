
import { useState } from 'react';
import { Qr , Back, Svg , Title , P , Space , Blocco , ContainerClose  , Svglight} from "./styled"
import { Link } from 'react-router-dom';

export default function QrReadercp() {

    const [data, setData] = useState("Data from reading");

    const [error, setError] = useState("Error from reading");

    const [acceso, setAcceso] = useState(false);

    const handleScan = data => {
        if (data) {
            console.log("data", data);
            setData(data);
        }
    }

    const handleError = err => {
        console.error("data", err);
        setError(err);
    }

    return (
        <Blocco color={acceso ? "white" : "var(--black-light)"}>
            <Title color={acceso ? "black" : "white"} size={5}>Scan Qr 🎉</Title>
            <ContainerClose>
            <Svglight onClick={()=>setAcceso((current)=>!current)} color={acceso ? "yellow" : "white"} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </Svglight>
            </ContainerClose>
            <Link to="/">
                <Back>
                <Svg color={acceso ? "black" : "white"}  xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </Svg>
                </Back>
            </Link>
            <Qr delay={300} onError={handleError} onScan={handleScan} />
            <Space></Space>
        <P color={acceso ? "black" : "white"}>{data}</P>
        <P color={acceso ? "black" : "white"}> {error}</P>
        </Blocco>

    );

}