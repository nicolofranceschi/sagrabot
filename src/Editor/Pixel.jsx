import { useState, memo, useCallback } from "react";
import { Pixelstyle , PixelTavolo ,OnlyTavolo ,Sedia} from "./Styled";
import { Sedia2 , Block } from "./Svg"

const Pixel = memo(({ color , type , i ,cells }) => {

    const [currentcolor,setcurrencolor] = useState("var(--black-light)")

    let bool=0;

    const applyColor = useCallback(() => {
        bool=1;
        setcurrencolor(color)
        cells[i]={color:color,type};
        localStorage.setItem('Grid', JSON. stringify(cells));
        console.log(cells)
    }, [color,type]);
    
   
    return (
    <>
    { cells[i]==undefined ?

        ( 
            <Pixelstyle
            onClick={applyColor}
            pixelColor={"var(--black-light)"}
            selectedColor={"var(--black-light)"}/>

        ):( cells[i].type==0 ? 
            (
            <Pixelstyle
            onClick={applyColor}
            pixelColor={bool==0?cells[i].color:currentcolor}
            selectedColor={currentcolor}
            />
            ):(
                <PixelTavolo onClick={applyColor}>
                <OnlyTavolo pixelColor={bool==0?cells[i].color:currentcolor}
                 selectedColor={currentcolor}/>
                    <Sedia>
                        <Sedia2 color={bool==0?cells[i].color:currentcolor} />
                    </Sedia>
                </PixelTavolo>
            )
        )
    }
    </>
    )
});

export default Pixel;