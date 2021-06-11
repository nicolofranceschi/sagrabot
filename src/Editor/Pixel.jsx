import { memo, useCallback } from "react";
import { Pixelstyle, PixelTavolo, OnlyTavolo, Sedia } from "./Styled";
import { Sedia2 } from "./Svg";

const Pixel = memo(({ color, type, i, selected, onSelect }) => {

    const applyColor = useCallback(() => onSelect(i, selected ? undefined : { color, type }), [color, type, selected]);

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