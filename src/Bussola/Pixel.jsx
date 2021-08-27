import { memo, useCallback, forwardRef } from "react";
import { OnlyTavolo, Pixelstyle, PixelTavolo, TestoPixel } from "./Styled";
import { Sedia } from "./Svg";

const PixelNonSelezionatoTipo0 = forwardRef((props, ref) => <Pixelstyle ref={ref} {...props} />);
const PixelSelezionatoTipo0 = forwardRef(({ color, ...props }, ref) => <div style={{ overflow: 'hidden' }}><Pixelstyle {...props} ref={ref} pixelColor={color} /></div>);
const PixelSelezionatoTipo1 = forwardRef(({ selectPixel, border, color, ...props }, ref) => (
  <div style={{ overflow: 'hidden' }}>
    <PixelTavolo {...props} onClick={selectPixel} ref={ref}>
      <OnlyTavolo pixelColor={color} border={border} />
      <Sedia color={color} />
    </PixelTavolo>
  </div>
));
const PixelSelezionatoTipo2 = forwardRef(({ color, text, ...props }, ref) => <div style={{ overflow: 'hidden' }}><TestoPixel {...props} ref={ref} pixelColor={color}>{text}</TestoPixel></div>);

const PixelPrenotatoTipo1 = forwardRef(({ onClick, border, ...props }, ref) => (
  <div style={{ overflow: 'hidden' }}>
    <PixelTavolo {...props} onClick={onClick} ref={ref}>
      <OnlyTavolo pixelColor={"white"} border={border} />
      <Sedia color={"white"} />
    </PixelTavolo>
  </div>
));
const PixelPrenotato = forwardRef(({ border, ...props }, ref) => (
  <div style={{ overflow: 'hidden' }}>
    <PixelTavolo {...props} ref={ref}>
      <OnlyTavolo pixelColor={"var(--line)"} border={border} />
      <Sedia color={"var(--line)"} />
    </PixelTavolo>
  </div>
));
const PixelLuce = forwardRef(({ border, ...props }, ref) => (
  <div style={{ overflow: 'hidden' }}>
    <PixelTavolo {...props} ref={ref}>
      <OnlyTavolo pixelColor={"#ccff00"} border={border} />
      <Sedia color={"#ccff00"} />
    </PixelTavolo>
  </div>
));
const PixelPrenotatoCovidTipo1 = forwardRef(({ ...props }, ref) => (
  <div style={{ overflow: 'hidden' }}>
    <PixelTavolo {...props} ref={ref} >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </PixelTavolo>
  </div>
));

const Pixel = memo(forwardRef(({ i, data, selected, orario , posti }, ref) => {

  
  const pixelProps = { ref, rotation: data?.rotation, border: data?.border };

  const pixelSelezionatoTipo1Props = { ...pixelProps, color: data?.color };

  const pixelPrenotatoTipo1Props = {
    ...pixelProps
  }

  const response = Object.entries(posti).some(([,elemento])=>{
   
    return elemento.pixel==i
  })

  if (response) {
    return <PixelLuce border={data?.border} {...pixelProps} />
  };
  if (!data) return <PixelNonSelezionatoTipo0 {...pixelProps} />;
  if (data.type === 0) return <PixelSelezionatoTipo0 {...pixelProps} color={data?.color} />;
  if (data.type === 2) return <PixelSelezionatoTipo2 color={data?.color} text={data?.text} {...pixelProps} />;
  if (selected) return <PixelPrenotatoTipo1 {...pixelPrenotatoTipo1Props} />;
  if (!data.prenotazioni || data.prenotazioni.length === 0) return <PixelSelezionatoTipo1 {...pixelSelezionatoTipo1Props} />;
  const prenotazione = data.prenotazioni.find(prenotazione => prenotazione.orario === orario.orario && prenotazione.data === orario.data);
  if (!prenotazione) return <PixelSelezionatoTipo1 {...pixelSelezionatoTipo1Props} />;
  if (prenotazione.type === 'default') return <PixelPrenotato border={data?.border} {...pixelProps} />;
  else if (prenotazione.type === 'covid') return <PixelPrenotatoCovidTipo1 {...pixelProps} />;
  else null;
}))

export default Pixel;