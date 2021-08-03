import styled from "styled-components";
import QRCode from "react-qr-code";

const LoadingDiv = styled.div`
        height: 100vh;
        width: 100vw;
        display: flex;
        align-content: space-around;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: "Inter", sans-serif;

`;

const Title = styled.div`
    
        width: 100%;
        padding: 20px ;
        margin-top: 20px;
        align-items: center;
        display: flex;
        justify-content: center;
        color: #ffade3;
        font-weight: bold;
        font-size: ${props => props.size}vh; 
        
`;

const Svg = styled.svg`
  margin:15px;
  height:20px;
  width:20px;
  stroke: white;
  stroke-width:0;
  :hover{
    transform: scale(1.1);
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


export default function Qr({page,setPage,user}) {
  
    

    const code = user+"/"+page.data[0].data.substr(0,2)+"/"+page.data[0].orario.substr(5)+"/"+page.data.length+"/"+page.tavoli.toString()+"/"+page.counter.toString();

    

    return (
        <>
            <Back onClick={() => setPage(c  => {return {...c,qr:false}})}>
                <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </Svg>
            </Back>
            <LoadingDiv>
                <QRCode value={code} level="H" size={250} fgColor="var(--line)" bgColor="var(--black-light)" />
                <Title size={2}>Buon appetito da Sagrabot 🤙🏻</Title>
            </LoadingDiv>
        </>
    );


}