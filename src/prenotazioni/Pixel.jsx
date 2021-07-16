import { memo, useCallback, forwardRef } from "react";
import { OnlyTavolo, Pixelstyle, PixelTavolo, TestoPixel } from "./Styled";
import { Sedia } from "./Svg";

const Pixel = memo(forwardRef(({ i, selected, onSelect }, ref) => {
  const selectPixel = useCallback(() => {
    onSelect(i);
  }, [selected]);

  const pixelProps = { ref, rotation: selected?.rotation, border: selected?.border };

  const PixelNonSelezionatoTipo0 = () => <Pixelstyle {...pixelProps} />;

  const PixelSelezionatoTipo0 = () => <Pixelstyle {...pixelProps} pixelColor={selected?.color} />;
  const PixelSelezionatoTipo1 = () => (
    <PixelTavolo {...pixelProps} onClick={selectPixel}>
      <OnlyTavolo pixelColor={selected?.color} border={selected?.border} />
      <Sedia color={selected?.color} />
    </PixelTavolo>
  );
  const PixelSelezionatoTipo2 = () => <TestoPixel {...pixelProps} pixelColor={selected?.color}>T</TestoPixel>;

  if (!selected) return <PixelNonSelezionatoTipo0 />;
  if (selected) return (
    <div style={{ overflow: 'hidden' }}>
      {
        selected.type === 2 ? <PixelSelezionatoTipo2 />
          : selected.type === 1 ? <PixelSelezionatoTipo1 />
            : <PixelSelezionatoTipo0 />
      }
      <div />
    </div>
  )
  else return null;
}));

export default Pixel;