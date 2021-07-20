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
  height: 120px;
  width: 50px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20px;
  right: 10px;
  z-index:10;
  border-radius: 10px;
`;

export const Back = styled.div`
  position: absolute;
  top:20px;
  left:10px;
  height: 50px;
  width: 50px;
  border-radius: 20px;
  backdrop-filter: blur(30px);
  z-index:11;
  :hover{ 
    transform: scale(1.2);
  }
`;

export const Svg = styled.svg`
  margin:15px;
  height:20px;
  width:20px;
  stroke: white;
`;

export const Pezzo = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 20px;
  backdrop-filter: blur(30px);
  z-index:10;
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

export const Next = styled(ButtonSlider)`
    right: 10px;
`;

export const Prev = styled(ButtonSlider)`
  left: 10px;
  transform: scale(-1);
`;

