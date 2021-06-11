import { CirclePicker } from 'react-color'
import { BottomPopup, Action, Positiondiv, Svg, InfoText, Infodiv, Icon, Text, SelezionaOggetto, Tavolo, Quadrato, Posto, Sedia } from "./Styled"
import { useWindowSize } from "../useWindowSize.js";
import { useState, memo } from 'react';
import { Sedia2, Block } from "./Svg"

const openDrawerSize = {
    H: "60vh",
    W: "30vw",
    B: 1
}

const closeDrawerSize = {
    H: "50px",
    W: "50px",
    B: 0
}

const Tools = memo(({ setStyle, color, type }) => {

    const { height, width } = useWindowSize();

    const closedPopupHeight = 50;

    const [{ H, W, B }, setAnimation] = useState(closeDrawerSize);

    const changeColor = (color) => setStyle({ color: color.hex, type });
    const closeDrawer = () => setAnimation(closeDrawerSize);
    const openDrawer = () => setAnimation(openDrawerSize);

    const openPopupHeight = - height + closedPopupHeight;

    return width >= 768 ? (
        <>
            {B == 1 ? (
                <BottomPopup
                    drag
                    dragConstraints={{ top: 0, bottom: height - height / 100 * 60 - 30, left: -width + width / 100 * 30 + 30, right: 0 }}
                    dragElastic={0}
                    dragTransition={{ bounceStiffness: 1300, bounceDamping: 20 }}
                    width={W}
                    height={H}
                >
                    <Action onClick={closeDrawer}>
                        <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                        </Svg>
                    </Action>
                    <Positiondiv>
                        <InfoText>Seleziona Colore</InfoText>
                        <CirclePicker width={"100%"} onChangeComplete={changeColor} />
                    </Positiondiv>
                    <Positiondiv>
                        <InfoText>Seleziona Oggetto</InfoText>
                        <SelezionaOggetto>
                            <Quadrato onClick={() => setStyle({ color, type: 0 })}></Quadrato>
                            <Tavolo onClick={() => setStyle({ color, type: 1 })}>
                                <Block />
                                <Sedia>
                                    <Sedia2 />
                                </Sedia>
                            </Tavolo>
                        </SelezionaOggetto>
                    </Positiondiv>
                </BottomPopup>
            ) : (
                <BottomPopup
                    drag
                    dragConstraints={{ top: 0, bottom: height - 80, left: -width - 80, right: 0 }}
                    dragElastic={0}
                    dragTransition={{ bounceStiffness: 1300, bounceDamping: 20 }}
                    width={W}
                    height={H}
                >
                    <Action onClick={openDrawer}>
                        <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </Svg>
                    </Action>
                </BottomPopup>
            )}
        </>
    ) : (
        <BottomPopup
            drag="y"
            dragConstraints={{ top: openPopupHeight, bottom: 0 }}
            dragElastic={0}
            dragTransition={{ bounceStiffness: 1300, bounceDamping: 20 }}
            bottom={openPopupHeight}
            marginBottom={closedPopupHeight}
            width={"100vw"}
            height={"100vh"}
        >
            <Infodiv>
                <Icon>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </Icon>
                <Text>strumenti di disegno</Text>
            </Infodiv>
            <Positiondiv>
                <InfoText>Seleziona Colore</InfoText>
                <CirclePicker width={"100%"} onChangeComplete={changeColor} />
            </Positiondiv>
            <Positiondiv>
                <InfoText>Seleziona Oggetto</InfoText>
                <SelezionaOggetto>
                    <Quadrato></Quadrato>
                    <Tavolo>
                        <Posto></Posto>
                        <Sedia>
                            <Sedia2 />
                        </Sedia>
                    </Tavolo>
                </SelezionaOggetto>
            </Positiondiv>
        </BottomPopup>
    );
})

export default Tools;