import { memo, useCallback , useRef , useEffect} from "react";
import { Pixelstyle, PixelTavolo, OnlyTavolo, HoverablePixelTavolo, RotationContainer } from "./Styled";
import { Sedia } from "./Svg";
import useDoubleClick from 'use-double-click';


const Pixel = memo(({ color, x, y, type, rotation, i, selected, onSelect, getxy }) => {
  
    const fun = useCallback((e) => {
        if(e.key=="ArrowLeft") {
            rotation++;
            console.log(rotation)
        }
        const { x,y } = getxy(i);
        onSelect(i, (selected && selected.color === color && selected.type === type) ? undefined : { color, type, x, y , rotation })
    }, [color, type, selected, x, y]);

   const pixelRef = useRef();

    const applyColor = useCallback(() => {
        const { x,y } = getxy(i);
        onSelect(i, (selected && selected.color === color && selected.type === type) ? undefined : { color, type, x, y , rotation })
    }, [color, type, selected, x, y]);

    const rotationfun = useCallback(() => window.addEventListener("keydown",fun, true ),[]);

    useEffect(()=>{
        window.removeEventListener("keydown",fun ,true);
    },[selected])

    const PixelNonSelezionatoTipo0 = () => <Pixelstyle ref={pixelRef}  rotation={rotation} selectedColor={color} />;
    const PixelNonSelezionatoTipo1 = () => (
        <HoverablePixelTavolo ref={pixelRef} rotation={rotation} selectedColor={color}>
            <OnlyTavolo />
            <Sedia color={color} selectedColor={color} />
        </HoverablePixelTavolo>
    );
    const PixelSelezionatoTipo0 = () => <Pixelstyle ref={pixelRef} rotation={rotation} pixelColor={selected?.color} selectedColor={color} />;
    const PixelSelezionatoTipo1 = () => (
        <PixelTavolo ref={pixelRef} rotation={rotation} selectedColor={color}>
            <OnlyTavolo pixelColor={selected?.color} />
            <Sedia color={selected?.color} selectedColor={color} />
        </PixelTavolo>
    );

    useDoubleClick({ 
        onSingleClick: applyColor,
        onDoubleClick: rotationfun,
        ref: pixelRef,
        latency: 250
      });

    if (!selected && type === 1) return <PixelNonSelezionatoTipo1  />;
    if (!selected && type === 0) return <PixelNonSelezionatoTipo0 />;
    if (selected) return (
        <RotationContainer>
            {selected.type === 0
                ? <PixelSelezionatoTipo0 ref={pixelRef} />
                : <PixelSelezionatoTipo1 ref={pixelRef} />
            }
            <div />
        </RotationContainer>
    )
    else return null;
});

export default Pixel;