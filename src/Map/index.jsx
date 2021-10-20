import { useRef, useState, useEffect, memo } from "react";
import { usePinch } from "react-use-gesture";
import useIntersectionObserver from "../useIntersectionObserver";
import { useWindowSize } from "../useWindowSize.js";
import { Container, Grid, PixelContainer, LoadingDiv, Title } from "./Styled";
import { firestore, getUserDocument } from "../firebase";
import PixelSettings from "./PixelSettings";
import Pixel from "./Pixel";
import { useHistory } from "react-router-dom";
import { useCycle } from "framer-motion";

const initialGridSize = 1000;
const cellsNumber = 50;
const cells = [...Array(cellsNumber ** 2)];

const SALEUID = "sala";

export default function Map() {
  const history = useHistory();
  const [data, setData] = useState({});
  const [onlydefault, setOnlyDefault] = useState({});

  useEffect(async () => {
    try {
      firestore
        .collection("users")
        .doc("sala")
        .onSnapshot((doc) => {
          if (doc.data().sale["SAGRA"] !== null)
            setData(doc.data().sale["SAGRA"]);

          const newPrenotazioni = Object.entries(
            doc.data().sale["SAGRA"]
          ).reduce((acc, pixel) => {
            const [key, value] = pixel;
            const { prenotazioni } = value;

            if (!prenotazioni || prenotazioni.length === 0) return acc;

            const temp = value.prenotazioni.reduce(
              (accPrenotazioni, prenotazione) => {
                return {
                  ...accPrenotazioni,
                  [`${prenotazione.data}-${prenotazione.orario}-${prenotazione.user}`]:
                    { ...prenotazione, pixel: key },
                };
              },
              {}
            );
            return {
              ...acc,
              ...Object.entries(temp).reduce(
                (externalAcc, [id, current]) => ({
                  ...externalAcc,
                  [id]: [...(acc[id] ?? []), current],
                }),
                {}
              ),
            };
          }, {});

          const defaultposti = Object.entries(newPrenotazioni).reduce(
            (acc, current) => {
              const [key, value] = current;
              const temp = value.filter(
                (currents) => currents.type === "default"
              );
              return { ...acc, [key]: temp };
            },
            {}
          );
          setOnlyDefault(defaultposti);
        });
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        draggable: true,
      });
    }
  }, []);

  if (Object.keys(data).length === 0) return <Loading />;
  return <MappaPrenotazioni data={data} chiavi={onlydefault} />;
}

function MappaPrenotazioni({ data, chiavi }) {
  const { height, width } = useWindowSize();

  const [[gridSize, pixelSize], setSize] = useState([
    initialGridSize,
    initialGridSize / cellsNumber,
  ]);

  const [selected, setSelected] = useState({});
  const [fluo, setFluo] = useState([]);
  const [who, setWho] = useState({});
  const [open, setOpen] = useState({ state: false, data: {} });

  const [orario, setOrario] = useState({
    data: "18 Settembre",
    orario: "alle 19:00",
  });

  const statics = Object.entries(data).reduce((acc, [key, value]) => {
    if (
      value.prenotazioni.some(
        (data) =>
          data.data === orario.data &&
          data.orario === orario.orario &&
          data.type === "default"
      ) === true
    ) {
      return {
        ...acc,
        [key]: value.prenotazioni.filter(
          (data) =>
            data.data === orario.data &&
            data.orario === orario.orario &&
            data.type === "default"
        ),
      };
    } else return { ...acc };
  }, {});

  const staticscovid = Object.entries(data).reduce((acc, [key, value]) => {
    if (
      value.prenotazioni.some(
        (data) =>
          data.data === orario.data &&
          data.orario === orario.orario &&
          data.type === "covid"
      ) === true
    ) {
      return {
        ...acc,
        [key]: value.prenotazioni.filter(
          (data) =>
            data.data === orario.data &&
            data.orario === orario.orario &&
            data.type === "covid"
        ),
      };
    } else return { ...acc };
  }, {});

  let controller = [];

  const menustatics = Object.entries(statics).reduce(
    (acc, [, value]) => {
      if (!controller.some((data) => data === value[0].user)) {
        controller.push(value[0].user);
        return {
          menusum:
            acc.menusum +
            value[0].menu[0] +
            value[0].menu[1] +
            value[0].menu[2] +
            value[0].menu[3],
          menu0: acc.menusum + value[0].menu[0],
          menu1: acc.menusum + value[0].menu[1],
          menu2: acc.menusum + value[0].menu[2],
        };
      } else return { ...acc };
    },
    { menusum: 0, menu0: 0, menu1: 0, menu2: 0 }
  );

  const menu0 = Object.entries(statics).reduce(
    (acc, [, value]) => {
      if (!controller.some((data) => data === value[0].user)) {
        controller.push(value[0].user);
        return {
          menusum: acc.menusum + value[0].menu[0],
        };
      } else return { ...acc };
    },
    { menusum: 0 }
  );

  const menu1 = Object.entries(statics).reduce(
    (acc, [, value]) => {
      if (!controller.some((data) => data === value[0].user)) {
        controller.push(value[0].user);
        return {
          menusum: acc.menusum + value[0].menu[2],
        };
      } else return { ...acc };
    },
    { menusum: 0 }
  );

  const menu2 = Object.entries(statics).reduce(
    (acc, [, value]) => {
      if (!controller.some((data) => data === value[0].user)) {
        controller.push(value[0].user);
        return {
          menusum: acc.menusum + value[0].menu[2],
        };
      } else return { ...acc };
    },
    { menusum: 0 }
  );

  useEffect(() => {
    const f = async () => {
      try {
        const part = who?.prenotazioni?.filter((e) => e.data === orario?.data);
        const numero = part ? part[0].user : null;
        const chiave = `${orario.data}-${orario.orario}-${numero}`;
        setFluo(chiavi[chiave]);
        const res = numero ? await getUserDocument(numero.substr(3)) : null;
        res ? setOpen({state: true,data: { numero, nome: res?.nome, cognome: res?.cognome,posti: Object.keys(chiavi[chiave]).length },}) : null;
      } catch (error) {
        console.log(error);
      }
    };
    f();
  }, [who]);

  const datistatistici = {
    posticovid: Object.keys(staticscovid).length,
    posti: Object.keys(statics).length,
    menu: menustatics.menusum,
  };
  console.log(datistatistici);
  const DrawingGrid = useRef(null);

  usePinch(
    ({ vdva }) => {
      setSize(([currentGridSize]) => {
        if (
          width < currentGridSize + vdva[0] * 50 &&
          height < currentGridSize + vdva[0] * 50
        ) {
          const newGridSize = currentGridSize + vdva[0] * 50;
          return [newGridSize, gridSize / cellsNumber];
        } else return [currentGridSize, gridSize / cellsNumber];
      });
    },
    {
      domTarget: DrawingGrid,
      eventOptions: { passive: false },
    }
  );

  const pixelsContainerRef = useRef();

  const entry = useIntersectionObserver(pixelsContainerRef);
  const isVisible = !!entry?.isIntersecting;

  return (
    <>
      {!isVisible && <Loading />}
      {isVisible && (
        <PixelSettings
          datistatistici={datistatistici}
          setOrario={setOrario}
          selected={selected}
          setSize={setSize}
          open={open}
          setFluo={setFluo}
          setOpen={setOpen}
          gridSize={gridSize}
          pixelSize={pixelSize}
        />
      )}
      <Container ref={DrawingGrid}>
        <Grid
          gridSize={gridSize}
          pixelSize={pixelSize}
          tabIndex={0}
          ref={pixelsContainerRef}
        >
          <Pixels
            fluo={fluo}
            data={data}
            selected={selected}
            setWho={setWho}
            setSelected={setSelected}
            orario={orario}
          />
        </Grid>
      </Container>
    </>
  );
}

const Pixels = memo(
  ({ data, selected, fluo, setSelected, orario, onSelect, setWho }) => (
    <>
      {cells.map((_, i) => (
        <PixelContainer key={i}>
          <ObservedPixel>
            {(ref) => (
              <Pixel
                fluo={fluo}
                i={i}
                data={data[i]}
                selected={selected[i]}
                setWho={setWho}
                setSelected={setSelected}
                orario={orario}
                onSelect={onSelect}
                ref={ref}
              />
            )}
          </ObservedPixel>
        </PixelContainer>
      ))}
    </>
  )
);

const Loading = () => (
  <LoadingDiv>
    <Title>Caricamento ... </Title>
  </LoadingDiv>
);

function ObservedPixel({ children }) {
  const ref = useRef();
  const [, setVisible] = useState(false);

  const entry = useIntersectionObserver(ref);
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible) setVisible(true);
  }, [isVisible]);
  return isVisible ? (
    children(ref)
  ) : (
    <div
      ref={ref}
      style={{
        backgroundColor: "hsl(218, 24%, 15%)",
        borderColor: "var(--line)",
      }}
    />
  );
}
