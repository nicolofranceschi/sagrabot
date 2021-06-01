
import styled from 'styled-components';


export const Title = styled.div`
  height: 10vh;
  width: 100vw;
  `;

export const ZoomButton = styled.span`
  font-size: 40px;
  cursor: pointer;
  margin-right: 20px;
  `;

export const Container = styled.div`
  height: 90vh;
  width: 100vw;
  overflow: auto;
  border-radius: 20px;
  -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      ::-webkit-scrollbar {
        display: none;
      }
  `;

export const Grid = styled.div`
      height: 6000px;
      width: 6000px;
      display: grid;
      grid-template-columns: repeat(${props => props.num},1fr);
      grid-template-rows: repeat(${props => props.num},1fr);
      
`;

export const Pixel = styled.div`
      border: 1px solid var(--line);
      box-sizing: border-box;
`;
