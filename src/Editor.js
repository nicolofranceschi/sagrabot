import { Title , ZoomButton , Container , Pixel , Grid} from  "./Styled.js";

import  {  useMemo, useRef, useState } from "react";

import { usePinch } from 'react-use-gesture'


const cellsNumber = 70;

export default function Editor() {


  const [gridSize, setgridSize] = useState(4000);
  const [pixelSize, setpixelSize] = useState(gridSize/cellsNumber);

  const myRef = useRef(null)

  // diasabilita pinch del browser
  const useDisablePinchZoomEffect = () => {
    useEffect(() => {
      const disablePinchZoom = (e) => {
        if (e.touches.length > 1) {
          e.preventDefault()
        }
      }
      document.addEventListener("touchmove", disablePinchZoom, { passive: false })
      return () => {
        document.removeEventListener("touchmove", disablePinchZoom)
      }
    }, [])
  }
  document.addEventListener('gesturestart', e => e.preventDefault());
  document.addEventListener('gesturechange', e => e.preventDefault())

  const bind = usePinch(state => {
    const {
      da,          // [d,a] absolute distance and angle of the two pointers
      vdva,        // momentum of the gesture of distance and rotation
      origin, 
      event,     // coordinates of the center between the two touch event
    } = state
    setgridSize((current) => current + vdva[0]*100);
    setpixelSize(gridSize/cellsNumber);
    
    console.log(vdva[0])
  })

  const cells = useMemo(() => [...Array(cellsNumber ** 2)], []);

  const zoomIn = () => {setgridSize((current) => current + 100);setpixelSize(gridSize/cellsNumber)}
  const zoomOut = () => {setgridSize((current) => current - 100);setpixelSize(gridSize/cellsNumber)}

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
      <Container {...bind()}>
        <Grid pixelSize={pixelSize} gridSize={gridSize} >
          {cells.map((_, i) => (
            <Pixel key={i}  />
          ))}
        </Grid>
      </Container>
    </div>
  );
}