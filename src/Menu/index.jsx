
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { images } from "./image-data";
import { Next, Prev, Container, Qty, Pezzo, Back, Svg } from "./styled"
import { Link } from "react-router-dom";

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

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export const Menu = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  useEffect(() => { console.log(imageIndex) }, [page]);

  const [menu, setMenu] = useState({ qty: 0 });

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <Container>
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
        <Pezzo onClick={setMenu((current) => ({ index: imageIndex, qty: current.qty + 1 }))}>
          <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </Svg>
        </Pezzo>
        <Pezzo onClick={setMenu((current) => ({ index: imageIndex, qty: current.qty - 1 }))}>
          <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </Svg>
        </Pezzo>
        <Pezzo>{menu.qty}</Pezzo>
      </Qty>
      <Link to="/choose">
        <Back>
          <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </Svg>
        </Back>
      </Link>
    </Container>
  );
};
