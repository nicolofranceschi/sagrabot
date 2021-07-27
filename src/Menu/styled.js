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
  height: 150px;
  width: 50px;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 20px;
  right: 10px;
  z-index:10;
  border-radius: 10px;
`;

export const Line = styled.div`
  height: 35vh;
  width: 1200px;
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
  height: 80%;
  width: 300px;
  background-color: var(--line);
  border-radius: 20px;
  color:white;
  margin: 15vh 40px 40px 40px;
  p{
     color: ${props => props.color};
  }
  :hover{
      p{ 
          color:#ffade3;
      }
  }
`;

export const CardBig = styled.div`
  height: 80%;
  width: 510px;
  background-color: var(--line);
  border-radius: 20px;
  color:white;
  margin: 15vh 40px 40px 40px;
  p{
     color: ${props => props.color};
     padding: 20px;
  }
  :hover{
      p{ 
          color:#ffade3;
      }
  }
`;
export const CardMenu = styled.div`
  height: 80%;
  width: 300px;
  background-color: white;
  border-radius: 20px;
  margin: 20px;
  p{
      z-index: 1;
      margin-top: -20px;
      margin-bottom: 30px;
      border-radius: 20px;
      margin-left:10px;
      font-size: 30px;
      word-wrap: break-word;
      font-family: Arial, Helvetica, sans-serif;
  }
  :hover{
      p{ 
          color:#ffade3;
      }
  }
`;

export const Giorni = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 120px;
  padding-left: 10px;
  color: white;
`;

export const Mese = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  padding-left:10px;
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
  margin:  15px;
  height:20px;
  width:20px;
  stroke: white;
`;

export const P = styled.p`
    line-height: 50px;
`;

export const Pezzo = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 20px;
  backdrop-filter: blur(30px);
  z-index:10;
  font-size: 30px;
  text-align: center;
  color: white;
  margin: 5px;
  :hover{ 
    transform: scale(1.2);
  }
`;


export const ButtonSlider = styled.div`
  top: calc(90% - 20px);
  position: absolute;
  backdrop-filter: blur(30px);
  border-radius: 30px;
  width: 40px;
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
