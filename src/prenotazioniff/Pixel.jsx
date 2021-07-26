import { memo, useCallback, forwardRef } from "react";
import { OnlyTavolo, Pixelstyle, PixelTavolo, TestoPixel } from "./Styled";
import { Sedia } from "./Svg";

const Pixel = memo(forwardRef(({ i, data, selected, onSelect, orario }, ref) => {

  const selectPixel = useCallback(() => onSelect(i), [selected]);

  const pixelProps = { ref, rotation: data?.rotation, border: data?.border };

  const PixelNonSelezionatoTipo0 = () => <Pixelstyle {...pixelProps} />;

  const PixelSelezionatoTipo0 = () => <div style={{ overflow: 'hidden' }}><Pixelstyle {...pixelProps} pixelColor={data?.color} /></div>;

  const PixelSelezionatoTipo1 = () => (
    <div style={{ overflow: 'hidden' }}>
      <PixelTavolo {...pixelProps} onClick={selectPixel}>
        <OnlyTavolo pixelColor={data?.color} border={data?.border} />
        <Sedia color={data?.color} />
      </PixelTavolo>
    </div>
  );
  const PixelSelezionatoTipo2 = () => <div style={{ overflow: 'hidden' }}><TestoPixel {...pixelProps} pixelColor={data?.color}>{data?.text}</TestoPixel></div>;

  const PixelPrenotatoTipo1 = () => (
    <div style={{ overflow: 'hidden' }}>
      <PixelTavolo {...pixelProps} >
        <OnlyTavolo pixelColor={"white"} border={data?.border} />
        <Sedia color={"white"} />
      </PixelTavolo>
    </div>
  );
  const PixelPrenotato = () => (
    <div style={{ overflow: 'hidden' }}>
      <PixelTavolo {...pixelProps} >
        <OnlyTavolo pixelColor={"var(--line)"} border={data?.border} />
        <Sedia color={"var(--line)"} />
      </PixelTavolo>
    </div>
  );
  const PixelPrenotatoCovidTipo1 = () => (
    <div style={{ overflow: 'hidden' }}>
      <PixelTavolo {...pixelProps} >
        <OnlyTavolo pixelColor={"red"} border={data?.border} />
        <Sedia color={"red"} />
      </PixelTavolo>
    </div>
  );

  if (!data) return <PixelNonSelezionatoTipo0 />;
  if (data.type === 0) return <PixelSelezionatoTipo0 />;
  if (data.type === 2) return <PixelSelezionatoTipo2 />;
  if (selected) return <PixelPrenotatoTipo1 />;
  if (!data.prenotazioni || data.prenotazioni.length === 0) return <PixelSelezionatoTipo1 />;
  const prenotazione = data.prenotazioni.find(prenotazione => prenotazione.orario === orario.orario && prenotazione.data === orario.data);
  if (!prenotazione) return <PixelSelezionatoTipo1 />;
  if (prenotazione.type === 'default') return <PixelPrenotato />;
  else if (prenotazione.type === 'covid') return <PixelPrenotatoCovidTipo1 />;
  else null;
}))

export default Pixel;