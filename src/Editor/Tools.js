
import { CirclePicker } from 'react-color'

import { BottomPopup , Action, Color , Svg , InfoText , Infodiv , Icon , Text } from "./Styled"

import { useWindowSize } from "../SIze.js";

import { useState } from 'react';




export function Tools (props) {

    const {height,width} = useWindowSize();

    const [closedPopupHeight, setClosedPopupHeight]= useState(50);

    const [{H,W,B}, setAnimation ] = useState (
        {
            H: "50px",
            W: "50px",
            B:0

        }
    );
  
    const openPopupHeight = - height + closedPopupHeight;

    return  width >= 768 ? (

   <>

    { B==1 ? ( 

    <BottomPopup

            drag
            dragConstraints={{ top: 0, bottom: height-height/100*60-30 , left: -width+width/100*30+30  , right: 0 }}
            dragElastic={0}
            dragTransition={{ bounceStiffness: 1300, bounceDamping: 20 }}
            width={W}
            height={H}
    
          >

           <Action onClick={ () =>

                    setAnimation(

                        {
                            H: "50px",
                            W: "50px",
                            B:0

                        }
                    )
                    }>

            <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </Svg>   
            </Action>
                <Color>
                <InfoText>Seleziona Colore</InfoText>
                    <CirclePicker width={"100%"} onChangeComplete={(color) => {
                        console.log(color.hex);
                        props.setpixelcolor(color.hex);
                    }}/>
                </Color>
    </BottomPopup>   
):(
    <BottomPopup

            drag
            dragConstraints={{ top: 0, bottom: height-80 , left: -width-80  , right: 0 }}
            dragElastic={0}
            dragTransition={{ bounceStiffness: 1300, bounceDamping: 20 }}
            width={W}
            height={H}
    
          >
                    <Action onClick={ () =>

                                setAnimation(

                                    {
                                        H: "60vh",
                                        W: "30vw",
                                        B:1
    
                                    }
                                )
                                }> 

                    <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </Svg> 
                    </Action>
                    
        </BottomPopup>

                )}

      </> 

    ):(

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
           <Color>
           <InfoText>Seleziona Colore</InfoText>
                    <CirclePicker width={"100%"} onChangeComplete={(color) => {
                        console.log(color.hex);
                        props.setpixelcolor(color.hex);
                    }}/>

                </Color>

       </BottomPopup>
    );
}