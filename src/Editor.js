import { Title , ZoomButton , Container , Pixel , Grid} from  "./Styled.js";

import  {  useMemo, useEffect, useState } from "react";



const gridSize = 2000;


export default function Editor() {
  const [cellsNum, setcellsNum] = useState(100);
  const setnum = () => { return [...Array(cellsNum ** 2)];}
  useEffect(() => setnum() ,[cellsNum])
  const zoomIn = () => setcellsNum((current) => current + 10);
  const zoomOut = () => setcellsNum((current) => current - 10);

  return (
    <div>
      <Title>
        <ZoomButton  onClick={zoomIn}>
          +
        </ZoomButton>
        <ZoomButton  onClick={zoomOut}>
          -
        </ZoomButton>
      </Title>
      <Container>
        <Grid num={cellsNum} >
          {setnum().map((_, i) => (
            <Pixel key={i}  />
          ))}
        </Grid>
      </Container>
    </div>
  );
}