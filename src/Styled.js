
import styled from 'styled-components';


export const Title = styled.div`
  position: absolute;
  top:0;
  left: 0;
  background-color: transparent;
  backdrop-filter: blur(10px);
  z-index: 2;
  height: 5vh;
  width: 100vw;
  `;

export const ZoomButton = styled.span`
  font-size: 40px;
  cursor: pointer;
  margin-right: 20px;
  `;

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: auto;
  -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      ::-webkit-scrollbar {
        display: none;
      }
  `;

export const Grid = styled.div`
      background-color: var(--black-light);
      height: ${props => props.gridSize}px;
      width: ${props => props.gridSize}px;
      display: grid;
      grid-template-columns: repeat(70,${props => props.pixelSize}px);
      grid-template-rows: repeat(70,${props => props.pixelSize}px);
      
`;

export const Pixel = styled.div`
      border: 1px solid var(--line);
      box-sizing: border-box;
`;
