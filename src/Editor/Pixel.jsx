import { memo, useCallback , useMemo} from "react";
import { Pixelstyle, PixelTavolo, OnlyTavolo, HoverablePixelTavolo, RotationContainer } from "./Styled";
import { Sedia } from "./Svg";

const Pixel = memo(({ color, x, y, type, rotation, borderRadius, i, selected, onSelect, getxy }) => {
    const applyColor = useCallback(() => {
        const { x,y } = getxy(i);
        onSelect(i, (selected && selected.color === color && selected.type === type) ? undefined : { color, type, x, y })
    }, [color, type, selected, x, y]);

    const PixelNonSelezionatoTipo0 = useMemo(() => <Pixelstyle onClick={applyColor} selectedColor={color} />, [color]);
    const PixelNonSelezionatoTipo1 = useMemo(() => (
        <HoverablePixelTavolo onClick={applyColor} selectedColor={color}>
            <OnlyTavolo />
            <Sedia color={color} selectedColor={color} />
        </HoverablePixelTavolo>
    ), [color]);
    const PixelSelezionatoTipo0 = useMemo(() => <Pixelstyle onClick={applyColor} pixelColor={selected.color} selectedColor={color} />, [selected.color, color]);
    const PixelSelezionatoTipo1 = useMemo(() => (
        <PixelTavolo onClick={applyColor} selectedColor={color}>
            <OnlyTavolo pixelColor={selected.color} />
            <Sedia color={selected.color} selectedColor={color} />
        </PixelTavolo>
    ), [selected.color, color]);

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