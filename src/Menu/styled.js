import styled from "styled-components";


export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  overflow: hidden;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Qty = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: row;
  position:relative;
  bottom:0;
  border-radius: 20px;
  vertical-align: sub;
`;

export const Allergie = styled.div`
  
  display: flex;
  flex-direction: row;
  position:absolute;
  top:13px;
  right:10px;
  border-radius: 20px;
  height: 50px;

  :hover{
    transform: scale(0.9);
  }

  img{
    padding:6px 0px 0px;
    width: 50px;
  }

  p{
    padding: 20px 0px 20px 0px;
    color: #ee404c;
    font-weight: bold;
  }
  
`;



export const Menuimg = styled.img`
  height: 80%;
  width: 100%;
  border-radius: 10px;
  background-color: white;
`;

export const Line = styled.div`
  margin-top: 15vh;
  height: 70vh;
  width: 1400px;
  display: flex;
`;

export const Form = styled.form`
  margin-top: 10vh;
  height: 70vh;
  
`;

export const Button = styled.input`
  
  border-radius:${props => props.border}  ;
  background-color: ${props => props.color};
  color: white;
  font-weight: bold;
  height: 100%;
  width: 50%;
`;

export const Info = styled.button`
  
  border-radius:${props => props.border}  ;
  background-color: ${props => props.color};
  color: white;
  font-weight: bold;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg{ 
    width: 40px;
    height: 40px;
  }
  p{ 
    font-size: 10px;
    color: white;
  }
  a{ 
    color: white;
  }
`;

export const Alert = styled.button`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    font-size: 15px;
    padding: 10px;
    background-color:${props => props.color} ;
    color:white;
    font-weight: bold;
    z-index:10;
`;

export const Alert2 = styled.button`
    width: 30%;
    height: 100%;
    border-radius: 20px 0px 0px 20px;
    font-size: 30px;
    padding: 10px;
    background-color:${props => props.color} ;
    color:#ff9966;
    font-weight: bold;
    z-index:10;
`;
export const ButtonTavoli2 = styled.button`
  width: 100%;
  height: 100%;
  color: #ffade3;
  font-weight: bold;
  border-radius: 0px 20px 20px 0px;
  font-size: 15px;
  background-color: var(--line);
  z-index:10;
`;

export const ButtonFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 16vh;
  position: absolute;
  width: 90vw;
  left: 5vw;
  bottom: 5vh;
  font-size: 25px;
`;

export const ButtonFlexend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 10vh;
  position: absolute;
  width: 90vw;
  left: 5vw;
  bottom: 5vh;
  font-size: 25px;
`;

export const Input = styled.textarea`
  height: 60vh;
  position: absolute;
  width: 96vw;
  left: 2vw;
  top: 15vh;
  font-size: 20px;
  border-radius: 20px ;
  padding: 20px;
  background: var(--line);
  color: white;
  :focus { outline: none; }
`;


export const Logo = styled.div`
  height: 10vh;
  width: 100vw;
  overflow: hidden;
`;

export const Backdrop = styled.div`
  backdrop-filter: blur(10px);
  border-radius: 0px 0px 20px 20px;
`;

export const Card = styled.div`
  height: 90%;
  width: 300px;
  background-color: var(--line);
  border-radius: 20px;
  color:white;
  margin: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  p{
     color: ${props => props.color};
  }
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

export const Giorni = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 120px;
  padding-left: 10px;
  color: white;
`;

export const Testo2 = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 40px;
  width: 80%;
  height: 20%;
  margin-top: -20%;
  z-index: 10;
  backdrop-filter: blur(30px);
  border-radius: 20px;
  font-weight: bold;
  color: white;
`;

export const Testo1 = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 40px;
  width: 80%;
  height: 10%;
  margin-top: -10%;
  z-index: 10;
  backdrop-filter: blur(30px);
  border-radius: 20px;
  font-weight: bold;
  color: white;
`;

export const Testo3 = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 40px;
  width: 80%;
  height: 30%;
  margin-top: -30%;
  z-index: 10;
  backdrop-filter: blur(30px);
  border-radius: 20px;
  font-weight: bold;
  color: white;
`;

export const Descrizione = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  padding-left:10px;
  margin: 10px;
  color: white;
  z-index:3;
  position: fixed;
  top: ${props => props.vh};
  left: 10px;
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
export const ButtonTavoli = styled.button`
  width: 100%;
  height: 100%;
  color: #ffade3;
  font-weight: bold;
  border-radius: 20px;
  font-size: 15px;
  background-color: var(--line);
  z-index:10;
`;

export const ButtonCaricamento = styled.button`
  width: 100%;
  height: 100%;
  color: white;
  font-weight: bold;
  border-radius: 20px;
  font-size: 15px;
  background-color: #ffade3;
  z-index:10;
`;

export const Data = styled.div`
  position: absolute;
  text-align: center;
  vertical-align: middle;
  line-height: 50px;
  color: white;
  top:20px;
  right:10px;
  height: 50px;
  width: 150px;
  border-radius: 20px;
  backdrop-filter: blur(30px);
  z-index:10;
  p{
    padding-left: 10px;
    font-weight: bold;
  }
`;

export const Back = styled.div`
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


export const Svg = styled.svg`
  margin : auto;
  height: 60%;
  width: 60%;
  stroke: ${props => props.color};
`;

export const SvgBack = styled.svg`
  margin:15px;
  height:20px;
  width:20px;
  stroke: white;
`;

export const P = styled.p`
    line-height: 40px;
    padding-left:11px;
    color: white;
    font-size: 30px;
    font-weight: bold;
`;

export const Pezzo = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  border-radius: ${props => props.border};
  font-size: 30px;
  text-align: center;
  background-color: ${props => props.color};
  :hover{ 
    transform: scale(0.95);
  }
`;


export const ButtonSlider = styled.div`
  top: calc(90% - 20px);
  position: absolute;
  backdrop-filter: blur(30px);
  border-radius: 30px;
  width: 70px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  z-index: 2;
  color: white;
`;
