import { memo, useState, useCallback, useEffect, useRef } from "react";
import useDoubleClick from 'use-double-click';
import useIntersectionObserver from "../useIntersectionObserver";
import { HoverablePixelTavolo, OnlyTavolo, Pixelstyle, PixelTavolo, TestoPixel } from "./Styled";
import { Sedia } from "./Svg";

let num = 0;

const Pixel = memo(({ color, type, i, selected, onSelect, getxy, onDoubleClick }) => {
  const ref = useRef();
  const [, setVisible] = useState(false);

  const entry = useIntersectionObserver(ref);
  const isVisible = !!entry?.isIntersecting;
  if (isVisible) console.log(i, typeof isVisible, num++);

  // TODO: trovare soluzione migliore. Il componente deve renderizzare quando è visibile
  useEffect(() => { setVisible() }, [isVisible]);

  const applyColor = useCallback(() => {
    const { x, y } = getxy(i);
    onSelect(i, (selected && selected.color === color && selected.type === type) ? undefined : { color, type, x, y, rotation: 0 });
    onDoubleClick(null);
  }, [color, type, selected]);

  const pixelProps = { ref, rotation: selected?.rotation, border: selected?.border };

  const PixelNonSelezionatoTipo0 = () => <Pixelstyle {...pixelProps} selectedColor={color} />;
  const PixelNonSelezionatoTipo1 = () => (
    <HoverablePixelTavolo {...pixelProps} selectedColor={color}>
      <OnlyTavolo />
      <Sedia color={color} selectedColor={color} />
    </HoverablePixelTavolo>
  );
  const PixelNonSelezionatoTipo2 = () => <TestoPixel {...pixelProps} selectedColor={color} ></TestoPixel>;
  const PixelSelezionatoTipo0 = () => <Pixelstyle {...pixelProps} pixelColor={selected?.color} selectedColor={color} />;
  const PixelSelezionatoTipo1 = () => (
    <PixelTavolo {...pixelProps} selectedColor={color}>
      <OnlyTavolo pixelColor={selected?.color} border={selected?.border} />
      <Sedia color={selected?.color} selectedColor={color} />
    </PixelTavolo>
  );
  const PixelSelezionatoTipo2 = () => <TestoPixel {...pixelProps} pixelColor={selected?.color} selectedColor={color} >{selected.key ? selected.key : "T"}</TestoPixel>;

  useDoubleClick({
    onSingleClick: applyColor,
    onDoubleClick: () => onDoubleClick(i),
    ref,
    latency: 250
  });

  if (!isVisible) return <Pixelstyle ref={ref} selectedColor={'red'} />;

  if (!selected && type === 2) return <PixelNonSelezionatoTipo2 />;
  if (!selected && type === 1) return <PixelNonSelezionatoTipo1 />;
  if (!selected && type === 0) return <PixelNonSelezionatoTipo0 />;
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
});

export default Pixel;