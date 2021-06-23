import { memo, useCallback } from "react";
import { Pixelstyle, PixelTavolo, OnlyTavolo, HoverablePixelTavolo, RotationContainer } from "./Styled";
import { Sedia } from "./Svg";

const Pixel = memo(({ color, x, y, type,  i, selected, onSelect, getxy }) => {
    const applyColor = useCallback(() => {
        const { x,y } = getxy(i);
        onSelect(i, (selected && selected.color === color && selected.type === type) ? undefined : { color, type, x, y })
    }, [color, type, selected, x, y]);
    const PixelNonSelezionatoTipo0 = () => <Pixelstyle onClick={applyColor} selectedColor={color} />;
    const PixelNonSelezionatoTipo1 = () => (
        <HoverablePixelTavolo onClick={applyColor} selectedColor={color}>
            <OnlyTavolo />
            <Sedia color={color} selectedColor={color} />
        </HoverablePixelTavolo>
    );
    const PixelSelezionatoTipo0 = () => <Pixelstyle onClick={applyColor} pixelColor={selected?.color} selectedColor={color} />;
    const PixelSelezionatoTipo1 = () => (
        <PixelTavolo onClick={applyColor} selectedColor={color}>
            <OnlyTavolo pixelColor={selected?.color} />
            <Sedia color={selected?.color} selectedColor={color} />
        </PixelTavolo>
    );

    if (!selected && type === 1) return <PixelNonSelezionatoTipo1 />;
    if (!selected && type === 0) return <PixelNonSelezionatoTipo0 />;
    if (selected) return (
        <RotationContainer>
            {selected.type === 0
                ? <PixelSelezionatoTipo0 />
                : <PixelSelezionatoTipo1 />
            }
            <div />
        </RotationContainer>
    )
    else return null;
});

export default Pixel;