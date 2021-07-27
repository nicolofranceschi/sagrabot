import styled from "styled-components";


export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Qty = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  flex-direction: row;
  position:relative;
  bottom:0;
  border-radius: 20px;
  vertical-align: sub;
`;

export const Menuimg = styled.img`
  height: 80%;
  width: 100%;
  border-radius: 10px;
  background-color: white;
`;

export const Line = styled.div`
  margin-top: 15vh;
  height: 75vh;
  width: 1400px;
  display: flex;
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
  p{
     color: white;
  }
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
export const ButtonTavoli = styled.button`
  position: absolute;
  bottom:2vh;
  left:5vw;
  height: 6vh;
  width: 90vw;
  color: white;
  border-radius: 20px;
  background-color: var(--line);
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
  margin : 20%;
  height: 60%;
  width: 60%;
  stroke: white;
`;

export const P = styled.p`
    line-height: 40px;
    padding-left:10px;
    font-size: 30px;
`;

export const Pezzo = styled.div`
  height: 100%;
  width: 50%;
  border-radius: 20px;
  font-size: 30px;
  text-align: center;
  color: white;
  margin: 5px;
  background-color: #ffade3;
  :hover{ 
    transform: scale(1.1);
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
