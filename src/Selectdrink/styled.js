import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const Allergie = styled.div`
  margin-top: 2vh;
  margin-left: 2vw;
  margin-right: 2vw;
  width: 95vw;
  height: 9vh;
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-items: center;
`;

export const AllergieText = styled.div`
   padding: 10px;
   border-radius: 20px 0px 0px 20px;
   background-color: #adaeff;
   color: white;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 30%;
   height: 100%;
   font-size:20px;
   font-weight: bold;
`;

export const AllergieContent = styled.div`
   border-radius: 0px 20px 20px 0px;
   background-color: var(--line);
   width: 70%;
   color: white;
   height: 9vh;
   font-size:10px;
   padding:5px;
   :focus { outline: none; }
`;

export const Line = styled.div`
  margin-top: 2vh;
  height: 25vh;
  width: 1400px;
  display: flex;
`;

export const Card = styled.div`
  margin-top: 2vh;
  height: 25vh;
  width: 40vw;
  border-radius:20px;
  margin-left : 5vw;
  margin-right : 5vw;
  background-color: white;
  display: flex;
  flex-direction:column;
`;

export const Buttonline = styled.div`
  height: 10vh;
  width: 40vw;
  border-radius:20px;
  display: flex;
  flex-direction:row;
`;

export const Infoline = styled.div`
  height: 15vh;
  width: 40vw;
  border-radius:20px;
  display: flex;
  flex-direction:column;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Svg = styled.svg`
  margin : auto;
  height: 60%;
  width: 60%;
  stroke: ${props => props.color};
`;

export const P = styled.p`
  font-size: ${props => props.size};
  padding-top: 10px;
  font-weight: bold;
`;

export const Pop = styled.div`
  height: 40px;
  width: 40px;
  z-index: 20;
  background-color: var(--line);
  border-radius: 20px;
  color:white;
  margin-top: -20px;
  margin-left: -20px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  .p{
    font-weight: bold;
  }
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

export const ButtonTavoli = styled.button`
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