import { memo, useCallback } from "react";
import { Pixelstyle, PixelTavolo, OnlyTavolo, Sedia } from "./Styled";
import { Sedia2 } from "./Svg";

const Pixel = memo(({ color ,x , y, type, i, selected, onSelect , getxy }) => {

    const applyColor = useCallback(() => {
        const {x,y} = getxy(i);
        onSelect(i, selected ? undefined : { color, type, x, y })
    }, [color, type, selected, x, y]);

    
    return !selected
    ? <Pixelstyle onClick={applyColor} selectedColor={color} />
    : selected.type === 0
        ? <Pixelstyle onClick={applyColor} pixelColor={selected.color} selectedColor={color} />
        : (
            <PixelTavolo onClick={applyColor}>
                <OnlyTavolo pixelColor={selected.color} selectedColor={color} />
                <Sedia>
                    <Sedia2 color={selected.color} selectedColor={color} />
                </Sedia>
            </PixelTavolo>
        )
});

export default Pixel;