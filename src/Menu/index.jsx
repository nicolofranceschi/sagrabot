
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { images } from "./image-data";
import { Next, Prev, Container, Qty, Pezzo, Back, Svg, P , ButtonTavoli } from "./styled"
import { Link } from "react-router-dom";
import { updateUserDocument } from "../firebase";
import { useSala } from "../App";
import { toast, ToastContainer } from "react-toastify";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const cellsNumber = 50;

function getClosePlaces(i,available) {
  const { x, y } = getxy(i);
  const rotation = available.rotation % 360;
  if(rotation === 0) return [
    getIndexFromXY(x + 1, y + 0),
    getIndexFromXY(x - 2, y + 0),
    getIndexFromXY(x + 1, y + 1),
    getIndexFromXY(x + 1, y - 1),
    getIndexFromXY(x + 0, y + 1),
    getIndexFromXY(x + 0, y - 1),
    getIndexFromXY(x - 1, y + 0),
    getIndexFromXY(x - 1, y + 1),
    getIndexFromXY(x - 1, y - 1),
  ]

  if(rotation === 180 || rotation === -180) return [
    getIndexFromXY(x + 1, y + 0),
    getIndexFromXY(x + 2, y + 0),
    getIndexFromXY(x + 1, y + 1),
    getIndexFromXY(x + 1, y - 1),
    getIndexFromXY(x + 0, y + 1),
    getIndexFromXY(x + 0, y - 1),
    getIndexFromXY(x - 1, y + 0),
    getIndexFromXY(x - 1, y + 1),
    getIndexFromXY(x - 1, y - 1),
  ]

  if(rotation === 90 || rotation === -270) return [
    getIndexFromXY(x + 1, y + 0),
    getIndexFromXY(x + 1, y + 1),
    getIndexFromXY(x + 1, y - 1),
    getIndexFromXY(x + 0, y + 1),
    getIndexFromXY(x + 0, y - 2),
    getIndexFromXY(x + 0, y - 1),
    getIndexFromXY(x - 1, y + 0),
    getIndexFromXY(x - 1, y + 1),
    getIndexFromXY(x - 1, y - 1),
  ]

  if(rotation === -90 || rotation === 270 ) return [
    getIndexFromXY(x + 1, y + 0),
    getIndexFromXY(x + 1, y + 1),
    getIndexFromXY(x + 1, y - 1),
    getIndexFromXY(x + 0, y + 1),
    getIndexFromXY(x + 0, y + 2),
    getIndexFromXY(x + 0, y - 1),
    getIndexFromXY(x - 1, y + 0),
    getIndexFromXY(x - 1, y + 1),
    getIndexFromXY(x - 1, y - 1),
  ]
  
  else return [
    getIndexFromXY(x + 1, y + 0),
    getIndexFromXY(x + 1, y + 1),
    getIndexFromXY(x + 1, y - 1),
    getIndexFromXY(x + 0, y + 1),
    getIndexFromXY(x + 0, y - 1),
    getIndexFromXY(x - 1, y + 0),
    getIndexFromXY(x - 1, y + 1),
    getIndexFromXY(x - 1, y - 1),
  ]
}

const getxy = i => {
  const y = Math.trunc(i / cellsNumber);
  const x = i - (cellsNumber * y)
  return { x, y }
}

const getIndexFromXY = (x, y) => cellsNumber * y + x;


const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const SALEUID = 'sala';

const getCovidPixels = (occupied, available) => Object.entries(occupied).reduce((acc, [i, spot]) => ({
  ...acc,
  [i]: spot,
  ...(getClosePlaces(i,available[i]).filter(close => {
    if (!available[close] || available[close].type !== 1) return false;
    if (occupied[close]) return false;
    else return true;
  }).reduce((internalAcc, j) => ({ ...internalAcc, [j]: { type: 'covid' } }), {}))
}), {});

export const Menu = () => {

  const {prenotazioni: [[data,selected]],user:[user],orario: [orario]} = useSala();

  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  useEffect(() => { console.log(imageIndex) }, [page]);

  const [menu, setMenu] = useState({
    0:0,
    1:0,
    2:0
  });

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  console.log(menu);

  const confirm = async () => {
    const covidPixels = getCovidPixels(selected, data);
    const newData = Object.entries(data).reduce((acc, [key, value]) => {
      const selectedSpot = covidPixels[key];
      return {
        ...acc,
        [key]: { ...value, prenotazioni: [
          ...value?.prenotazioni ?? [],
          ...(selectedSpot ? [{ ...selectedSpot, data: orario.data , orario: orario.orario, user , menu }] : [])
        ] }
      };
    }, {});
    try {
      const res = await updateUserDocument({ uid: SALEUID }, { sale: { SAGRA: newData }});
      toast.success("Prenotazione effettuata");
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <Container>
       <ToastContainer
          position="top-right"
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          draggable
          hideProgressBar
        />
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);

            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);

            }
          }}
        />
      </AnimatePresence>
      <Next className="next" onClick={() => paginate(1)}>
        {"‣"}
      </Next>
      <Prev className="prev" onClick={() => paginate(-1)}>
        {"‣"}
      </Prev>
      <Qty>
        <Pezzo onClick={() => setMenu(() => ({ [imageIndex]:menu[imageIndex] + 1 }))}>
          <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </Svg>
        </Pezzo>
        <Pezzo onClick={() =>setMenu((current) => ({ [imageIndex]:menu[imageIndex] - 1 }))}>
          <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </Svg>
        </Pezzo>
        <Pezzo><P>{menu[imageIndex]}</P></Pezzo>
      </Qty>
      <Link to="/choose">
        <Back>
          <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </Svg>
        </Back>
      </Link>
      <Link to="/">
      <ButtonTavoli onClick={() => confirm()}>Completa la prenotazione</ButtonTavoli>
      </Link>
    </Container>
  );
};
