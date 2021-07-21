import { memo, useCallback, forwardRef } from "react";
import { OnlyTavolo, Pixelstyle, PixelTavolo, TestoPixel } from "./Styled";
import { Sedia } from "./Svg";

const Pixel = memo(forwardRef(({ i, data, selected, onSelect }, ref) => {

const selectPixel = useCallback(() => {
    onSelect(i);
  }, [selected]);

  const pixelProps = { ref, rotation: data?.rotation, border: data?.border };

  const PixelNonSelezionatoTipo0 = () => <Pixelstyle {...pixelProps} />;

  const PixelSelezionatoTipo0 = () => <Pixelstyle {...pixelProps} pixelColor={data?.color} />;
  const PixelSelezionatoTipo1 = () => (
    <PixelTavolo {...pixelProps} onClick={selectPixel}>
      <OnlyTavolo pixelColor={data?.color} border={data?.border} />
      <Sedia color={data?.color} />
    </PixelTavolo>
  );
  const PixelSelezionatoTipo2 = () => <TestoPixel {...pixelProps} pixelColor={data?.color}>{data?.text}</TestoPixel>;

  const PixelPrenotatoTipo1 = () => (
    <PixelTavolo {...pixelProps} onClick={selectPixel}>
      <OnlyTavolo pixelColor={"white"} border={data?.border} />
      <Sedia color={"white"} />
    </PixelTavolo>
  );

  if (!data) return <PixelNonSelezionatoTipo0 />;
  if (data && !selected) return (
    <div style={{ overflow: 'hidden' }}>
      {
        data.type === 2 ? <PixelSelezionatoTipo2 />
          : data.type === 1 ? <PixelSelezionatoTipo1 />
            : <PixelSelezionatoTipo0 />
      }
      <div />
    </div>
  )
  if (data.prenotazioni?.type=="default") return (
    <div style={{ overflow: 'hidden' }}>
      <PixelPrenotatoTipo1 />
      <div />
    </div>
  )
  else return (
    <div style={{ overflow: 'hidden' }}>
      <PixelPrenotatoTipo1 />
      <div />
    </div>
  )
}));

export default Pixel;