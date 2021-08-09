import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { P, Container , Line, Card , Svg,Pezzo, Buttonline , Infoline , Pop , ButtonTavoli, DeleteTavoli } from "./styled";


export default function Selectdrink (props){

    
    const [{ordine,setOrdine},setData] = useState(props);

    const [drink,setDrink] = useState({
        acquanaturalemezzo:0,
        acquanaturaleuno:0,
        acquagasmezzo:0,
        acquagasuno:0,
        cocapiccola:0,
        cocagrande:0,
        birrapiccola:0,
        birragrande:0,
        vinoquarto:0,
        vinomezzo:0,
        sangiovesefermo:0,
        biancocollifermo:0,
        biancocollifrizzante:0,
        rossocollifermo:0,
        rossorubicone:0

    });

    useEffect(() => {console.log(drink)},[drink])
    
    console.log(ordine)

    return (
       <Container>
           <motion.div drag="x" position="relative" dragConstraints={{ left: -400, right: 0 }}>
           <Line>
               <Cardcomponent drink={drink} setDrink={setDrink} whodrink={"acquanaturalemezzo"} str1={"Acqua naturale"} str2={"1/2"} str3={"litro"}></Cardcomponent>
               <Cardcomponent drink={drink} setDrink={setDrink} whodrink={"acquanaturaleuno"} str1={"Acqua naturale"} str2={"1"} str3={"litro"}></Cardcomponent>
               <Cardcomponent drink={drink} setDrink={setDrink} whodrink={"acquagasmezzo"} str1={"Acqua frizzante"} str2={"1/2"} str3={"litro"}></Cardcomponent>
               <Cardcomponent drink={drink} setDrink={setDrink} whodrink={"acquagasuno"} str1={"Acqua frizzante"} str2={"1"} str3={"litro"}></Cardcomponent>
           </Line>
           </motion.div>
           <motion.div drag="x" position="relative" dragConstraints={{ left: -400, right: 0 }}>
           <Line>
               <Cardcomponent drink={drink} setDrink={setDrink} whodrink={"cocapiccola"} str1={"Coca cola"} str2={"picola"} str3={""}></Cardcomponent>
               <Cardcomponent drink={drink} setDrink={setDrink} whodrink={"cocagrande"} str1={"Coca cola"} str2={"grande"} str3={""}></Cardcomponent>
               <Cardcomponent drink={drink} setDrink={setDrink} whodrink={"birrapiccola"} str1={"Birra"} str2={"piccola"} str3={""}></Cardcomponent>
               <Cardcomponent drink={drink} setDrink={setDrink} whodrink={"birragrande"} str1={"Birra"} str2={"grande"} str3={""}></Cardcomponent>
           </Line>
           </motion.div>
           <motion.div drag="x" position="relative" dragConstraints={{ left: -1000, right: 0 }}>
           <Line>
               <Cardcomponent drink={drink} setDrink={setDrink} whodrink={"vinoquarto"} str1={"Vino"} str2={"1/4"} str3={"litro"}></Cardcomponent>
               <Cardcomponent drink={drink} setDrink={setDrink} whodrink={"vinomezzo"} str1={"Vino"} str2={"1/2"} str3={"litro"}></Cardcomponent>
               <Cardcomponent drink={drink} setDrink={setDrink} whodrink={"sangiovesefermo"} str1={"San Giovese"} str2={"superiore DOC"} str3={"fermo"}></Cardcomponent>
               <Cardcomponent drink={drink} setDrink={setDrink} whodrink={"biancocollifermo"} str1={"Bianco colli"} str2={"imola"} str3={"fermo"}></Cardcomponent>
               <Cardcomponent drink={drink} setDrink={setDrink} whodrink={"biancocollifrizzante"} str1={"Bianco colli"} str2={"imola"} str3={"frizzante"}></Cardcomponent>
               <Cardcomponent drink={drink} setDrink={setDrink} whodrink={"rossocollifermo"} str1={"Rosso colli"} str2={"imola"} str3={"fermo"}></Cardcomponent>
               <Cardcomponent drink={drink} setDrink={setDrink} whodrink={"rossorubicone"} str1={"Rosso rubicone"} str2={"IGP"} str3={"San Biagio"}></Cardcomponent>
           </Line>
           </motion.div>
         <ButtonTavoli>CONTINUA</ButtonTavoli>  
           <DeleteTavoli>
           <Svg onClick={()=>setOrdine(false)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
            </Svg>
           </DeleteTavoli>
       </Container>
    )

}


const Cardcomponent = ({drink,setDrink,whodrink,str1,str2,str3}) => {

    return (

        <Card>
                 <Pop>
                        <p>{drink[whodrink]}</p>
                </Pop>
                <Infoline>
                    <P size={"10px"}>{str1}</P>
                    <P size={"20px"}>{str2}</P>
                    <P size={"10px"}>{str3}</P>
                </Infoline>
               <Buttonline>
                  <Pezzo border={"0px 0px 0px 20px"} color={"#ffade3"} onClick={() => setDrink((current)=> {return {...current,[whodrink]:current[whodrink]+1}})}>
                    <Svg color={"var(--line)"} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </Svg>
                  </Pezzo>
                  <Pezzo border={"0px 0px 20px 0px"} color={"var(--line)"} onClick={() => setDrink((current)=> {return {...current,[whodrink]:current[whodrink]-1}})}>
                    <Svg color={"#ffade3"} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </Svg>
                  </Pezzo>
                </Buttonline>
               </Card>

    );
}