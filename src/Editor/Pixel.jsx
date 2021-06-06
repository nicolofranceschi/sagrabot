import { useState, memo, useCallback } from "react";
import { Pixelstyle } from "./Styled";

const Pixel = memo(({ color , type , i ,cells }) => {

    const [currentcolor,setcurrencolor] = useState("var(--black-light)")

    let bool=0;

    const applyColor = useCallback(() => {
        bool=1;
        setcurrencolor(color)
        cells[i]={color:color,type};
        localStorage.setItem('Grid', JSON. stringify(cells));
    }, [color]);
    
   
    return (
    <>
    { cells[i]==undefined ?

        ( 
            <Pixelstyle
            onClick={applyColor}
            pixelColor={"var(--black-light)"}
            selectedColor={"var(--black-light)"}/>
        ):(
            <Pixelstyle
            onClick={applyColor}
            pixelColor={bool==0?cells[i].color:currentcolor}
            selectedColor={currentcolor}
            />
        )
    }
    </>
    )
});

export default Pixel;