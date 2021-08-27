import styled from "styled-components";


export const Container = styled.div`
    height: 85vh;
    width: 100vw;
    border-radius: 20px;
    overflow: hidden;
    cursor: grab;
    word-wrap: break-word;
  `;

export const ContainerPdf = styled.div`
    height: 75vh;
    margin-top: 10vh;
    width: 100vw;
    border-radius: 20px;
    overflow: hidden;
    cursor: grab;
    overflow: scroll;
    word-wrap: break-word;
    -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      ::-webkit-scrollbar {
       display: none;
  }
`;

export const Blocco = styled.div`
    height: 100vh;
    bottom:0;
    width: 100vw;
    overflow: hidden;
    position: absolute;
    background-color: var(--black-light);
  `;

export const LoginForm = styled.form`
   display: flex;
   flex-direction: row;
   width: 90vw;
   height: 10vh;
   margin-left:5vw;
`;

export const Line = styled.div`
    margin-top: 10px;
    width: 800px;
    display: flex;
`;

export const Linebutton = styled.div`
        position: absolute;
        top: 1vh;
        height: 8vh;
        width: 100vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
`;

export const Button = styled.div`
        width: ${props => props.size};
        height: 100%;
        display: flex;
        font-weight: bold;
        align-items: center;
        justify-content:center;
        
        background-color:${props => props.color};
        border-radius:${props => props.border};
        color: white;
        :hover{
            transform: scale(0.9);
        }
`;

export const Div = styled.div`
      width: 100vw;
      overflow: hidden;
      display: flex;
      flex-direction: row;
`;

export const Tavoli = styled.div`
      overflow: scroll;
      margin-left: 5%;
      margin-right: 5%;
      border-radius: 20px;
      height: 10vh;
      display: flex;
      flex-direction: column;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      ::-webkit-scrollbar {
       display: none;
  }
`;


export const Prenota = styled.div`
        height: 100px;
        bottom:0;
        width: 100px;
        border-radius: 100px;
        overflow: hidden;
        position: absolute;
        bottom: 50px;
        right:10px;
        background-color: #3498DB;
    `;

export const P = styled.p`
line-height: 40px;
padding-left:11px;
color: white;
font-size: 30px;
font-weight: bold;
`;

export const Menuimg = styled.img`
  height: 80%;
  width: 100%;
  border-radius: 10px;
  background-color: white;
`;


export const Pop = styled.div`
  height: 40px;
  width: 40px;
  z-index: 20;
  background-color: var(--line);
  border-radius: 20px;
  color:white;
  margin-top: -20px;
  margin-right: -20px;
  position: absolute;
  display: flex;
  right: 0;
  flex-direction: column;
  
`;

export const Card = styled.div`
    height: 90%;
    margin-left:5%;
    margin-right:5%;
    width: 90%;
    margin-top: 20px;
    padding-top: 20px;
    border-radius: 20px;
    position: relative;
    cursor: grab;
    perspective: 600px;
    display: flex;
    flex-direction: row;
  `;



export const Input = styled.input`

width:80%;
border-radius: 20px 0px 0px 20px;
padding-left: 20px;

:focus { outline: none; }
`;



export const Cerca = styled.button`

width:20%;
border-radius: 0px 20px 20px 0px;
color: white;
background-color: #adaeff;

`;

export const Eliminazione = styled.div`
    height: 90%;
    margin-left:5%;
    margin-right:5%;
    width: 90%;
    padding-top: 20px;
    border-radius: 20px;
    position: relative;
    cursor: grab;
    perspective: 600px;
    display: flex;
    flex-direction: row;
    div{
      width: 100%;
      height: 100%;
      position: relative;
      height: 10vh;
      border-radius:20px ;
      display: flex;
      text-align: center;
      vertical-align: middle;
      justify-content:center;
      align-items: center;
      color: white;
      background-color: var(--line);
      font-size: 10px; 
      font-weight: bold;
      @media only screen and (min-width: 600px) {
        grid-template-columns: 1fr 1fr 1fr  ;
        font-size: 4vw; 
      }
    svg{ 
      right: -15px;
      z-index: 20;
      stroke: red;
      width: 50px;
      height: 50px;
      padding: 10px;
      position: absolute;
      top: -25px;
      backdrop-filter: blur(30px);
      border-radius:50px;
      :hover{
        transform: scale(1.2);
      }
    }

    p{
      padding:30px;
      line-height: 1.6;
    }

    }
`;

export const DeleteTavoli = styled.button`
  position: absolute;
  bottom:2vh;
  left:5vw;
  height: 10vh;
  width: 30vw;
  color: #ffade3;
  font-weight: bold;
  border-radius: 20px;
  background-color: red;
  z-index:10;
`;

export const Menu = styled.div`
    height: 80%;
    margin-left:20px;
    margin-right:20px;
    width: 200px;
    border-radius: 20px;
    position: relative;
`;

export const Foglio = styled.div`
    height: 1200px;
    width: 800px;
    background-color: white;
    padding: 40px;
`;

export const Header= styled.div`
  height:10%;
  width:100%;
  display: flex;
  flex-direction: row;
`;

export const PP= styled.div`
  
      padding:5px;
      color:black;
      font-size:${props => props.size};
      font-weight:bold;
  
`;

export const PineApp= styled.img`
     height:150px;
     width:150px;
`;

export const Numerotavolo= styled.div`
  width: 50%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  border-radius:20px;
  overflow: scroll;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #ffade3;
  p{
      display: flex;
      align-items: center;
      justify-content: center;
      color:black;
      padding: 20px;
      font-size:20px;
      font-weight:bold;
      height: 10%;
  }
`;

export const Datiprenotazione= styled.div`
  height:20%;
  width: 50%;
  padding:10px;
  display: flex;
  flex-direction: column;
`;

export const Table = styled.div`
  margin-top: 40px;
  height:60%;
  width:100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      ::-webkit-scrollbar {
       display: none;
  }
`;

export const Tablecucina = styled.div`
  margin-top: 40px;
  height:83%;
  width:100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      ::-webkit-scrollbar {
       display: none;
  }
`;

export const Product = styled.div`
  height:5%;
  width:100%;
  display: flex;
  background-color: white;
  border-radius: 20px;
  flex-direction: row;
`;

export const Productcucina = styled.div`
  height:3%;
  width:100%;
  display: flex;
  background-color: white;
  border-radius: 20px;
  flex-direction: row;
`;

export const Field = styled.div`
  width:70%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color:black;
  font-weight:${props => props.size};
`;

export const Quantita = styled.div`
  width:15%;
  flex-direction:column;
  display: flex;
  align-items: center;
  justify-content: center;
  color:black;
  border-radius:20px 0px 0px 20px;
  font-weight:${props => props.size};
`;

export const Prezzo = styled.div`
  width:15%;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  color:black;
  border-radius: 0px 20px 20px 0px;
  font-weight:${props => props.size};
`;

export const Tot = styled.div`
  
  width:80%;
  display: flex;
  flex-direction:column;
  align-items: flex-end;
  justify-content: center;
  color:black;
  font-weight: bold;
  border-radius: 20px;
`;


export const Testo = styled.div`
    text-align: center;
    vertical-align: middle;
    position: relative;
    width: 100%;
    padding: ${props => props.padding} ;
    line-height: ${props => props.line};
    color: ${props => props.color};
    font-weight: bold;
    font-size: ${props => props.size}; 
    @media only screen and (min-width: 600px) {
      grid-template-columns: 1fr 1fr 1fr  ;
      font-size: 1vw; 
    }
  `;

export const TestoBig = styled.div`
        text-align: center;
        vertical-align: middle;
        position: relative;
        width: 100%;
        padding: ${props => props.padding} ;
        line-height: ${props => props.line};
        color: white;
        font-weight: bold;
        font-size: ${props => props.size}; 
        @media only screen and (min-width: 600px) {
            grid-template-columns: 1fr 1fr 1fr  ;
            font-size: 5vw; 
  }
`;




export const Space = styled.div`
        height: ${props => props.size}vh;
`;

export const Scroll = styled.div`
  max-height: 80vh;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Bar = styled.div`
display: flex;
 flex-direction:row;
  align-items: flex-start;
  justify-content: center;
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 1vw;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Title = styled.div`
    
        padding: 5px ;
        left: 10px;
        color: white;
        font-weight: bold;
        font-size: ${props => props.size}vh; 
        
`;

export const Allergie = styled.div`
  
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  border-radius: 20px;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  align-items:center;
  max-width: 400px;

  :hover{
    transform: scale(0.9);
  }

  img{
    padding:6px 0px 0px;
    width: 50px;
  }
  
  
`;

export const P1 = styled.div`
    
    padding: 20px 0px 20px 0px;
    color: white;
    font-size: 12px;
    font-weight: bold;
    width: 60%;
       
`;

export const P2 = styled.div`
    
    padding: 20px 0px 20px 0px;
    color: #ee404c;
    font-size: 20px;
    font-weight: bold;
       
`;


export const Titlelitte = styled.div`
    
        width: 100%;
        padding: 20px ;
        line-height: ${props => props.line}vh;
        color: white;
        font-weight: bold;
        font-size: ${props => props.size}em; 
       
`;

export const Svgout = styled.svg`

      margin-right: 3vw;
      width: 30px;
      border-radius: 20px;
      overflow: hidden;
      :hover{
        transform: scale(0.9);
      }
`;

export const Dati = styled.div`
    
        width: 100%;
        padding: 2px ;
        padding-right:40px;
        color: white;
        font-weight: bold;
        font-size: ${props => props.size}vw; 
        @media only screen and (min-width: 600px) {
            grid-template-columns: 1fr 1fr 1fr  ;
            font-size: 1vw; 
  }
`;
export const Flex = styled.div`
    
        display: flex;
        flex-direction:${props => props.orientation};
        width: 96vw;
        align-items: center;
        justify-content: space-between;
        margin-top: 2vh;
        margin-left: 2vw;
`;

export const Svg = styled.svg`
   margin : auto;
    height: 60%;
    width: 60%;
    stroke: ${props => props.color};
`;

export const State = styled.div`
    right: -15px;
    z-index: 20;
    color: white;
    width: 120px;
    height: 50px;
    padding: 10px;
    position: absolute;
    top: 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(30px);
    border-radius:50px;
    :hover{
    transform: scale(1.2);
    }
    p{
        color: white;
        font-size: 20px;
        font-weight: bold;
    }
`;

export const Divinside = styled.div`
    
        background-color: ${props => props.color};
        height: 20px;
        width: 20px;
        border-radius: 20px;
        margin-right: 10px;
`;


export const Statebutton = styled.div`
    color: white;
    width: 120px;
    height: 50px;
    display: flex;
    margin: 2px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.color};
    backdrop-filter: blur(30px);
    border-radius:50px;
    :hover{
    transform: scale(0.9);
    }
    p{
        color: white;
        font-size: 20px;
        font-weight: bold;
    }
`;

export const Svg1 = styled.svg`
        height: 100px;
        width: 100px;
        border-radius: 100px;
        overflow: hidden;
        position: absolute;
        bottom: 50px;
        backdrop-filter: blur(30px);
        right:20px;
        :hover{ 
        transform: rotate(150deg);
        transform: scale(1.2);
  }

`;

export const Close = styled.svg`
        right: 15px;
        z-index: 20;
        fill: red;
        width: 40px;
        height: 40px;
        position: absolute;
        top: 15px;
        backdrop-filter: blur(30px);
        border-radius:20px;
        :hover{
        transform: scale(1.2);
        }
`;

export const Find = styled.svg`
        height: 30px;
        width: 30px;
        :hover{
        transform: scale(1.2);
        }
`;



export const Left = styled.div`
    width: 30%;
    height: 30vh;
    position: relative;
    overflow: scroll;
    border-radius: 5px 20px 20px 5px;
    background-color: var(--line);
    color:white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-weight: bold;
    text-transform: uppercase;
    :focus { outline: none; }
    -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      ::-webkit-scrollbar {
       display: none;
  }
  svg{ 
      width:50px;
      height:50px;
      }
  `;

export const Leftstampado = styled.div`
    width: 30%;
    height: 15vh;
    position: relative;
    overflow: scroll;
    border-radius: 5px 20px 20px 5px;
    background-color: var(--line);
    color:white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-weight: bold;
    text-transform: uppercase;
    :focus { outline: none; }
    -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      ::-webkit-scrollbar {
      display: none;
    }
    svg{ 
      width:50px;
      height:50px;
      }
`;

export const Right = styled.div`
    width: 70%;
    height: 30vh;
    overflow: scroll;
    position: relative;
    border-radius:20px 5px 5px 20px;
    text-align: center;
    vertical-align: middle;
    color: white;
    background-color: #ffade3;
    font-size: 20vw; 
    font-weight: bold;
    text-transform: uppercase;
    -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      ::-webkit-scrollbar {
       display: none;
  }
   
  `;

export const Rightstampato = styled.div`

    width: 70%;
    height: 15vh;
    overflow: scroll;
    position: relative;
    border-radius:20px 5px 5px 20px;
    text-align: center;
    vertical-align: middle;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--line);
    font-size: 20vw; 
    font-weight: bold;
    text-transform: uppercase;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    ::-webkit-scrollbar {
    display: none;
    }

`;

export const TavoliText = styled.div`

    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    vertical-align: middle;
    display: flex;
    align-items: center;
    color: white;
    background-color: #ffade3;
    font-size: 20vw; 
    font-weight: bold;
    text-transform: uppercase;
    
  `;

export const ButtonPdf = styled.button`
  position: absolute;
  bottom:2vh;
  right:5vw;
  height: 10vh;
  width: 70vw;
  color: #ffade3;
  font-weight: bold;
  border-radius: 20px;
  background-color: var(--line);
  z-index:10;
`;


