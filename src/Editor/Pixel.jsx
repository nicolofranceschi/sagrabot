import { useState, memo, useCallback } from "react";
import { Pixelstyle } from "./Styled";

const Pixel = memo(({ selectedColor }) => {

    const [pixelColor, setPixelColor] = useState("var(--black-light)");

    const applyColor = useCallback(() => {
        setPixelColor(selectedColor);
    }, [selectedColor]);

    return (
        <Pixelstyle
            onClick={applyColor}
            pixelColor={pixelColor}
            selectedColor={selectedColor}
        />
    );
});

export default Pixel;