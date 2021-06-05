import { useState } from "react";

import { Pixelstyle } from "./Styled"

export  function Pixel(props) {

    const { selectedColor } = props;

    const [pixelColor, setPixelColor] = useState("var(--black-ligh)");

    const [oldColor, setOldColor] = useState(pixelColor);

    const [canChangeColor, setCanChangeColor] = useState(true);

    function applyColor() {
        setPixelColor(selectedColor);
        setCanChangeColor(false);
    }

    function changeColorOnHover() {
        setOldColor(pixelColor);
        setPixelColor(selectedColor);
    }

    function resetColor() {
        if (canChangeColor) {
            setPixelColor(oldColor);
        }

        setCanChangeColor(true);
    }

    return (

        <Pixelstyle
        
            onClick={applyColor}
            onMouseEnter={changeColorOnHover}
            onMouseLeave={resetColor}
            style={{ backgroundColor: pixelColor }}
        >
            </Pixelstyle>
    );
}