import { useWindowSize } from "../useWindowSize";
import { lazy, Suspense, useEffect, useState } from "react";
import { Container, Grid, Card, Testo, Svg, Form, Testoinput, Buttoninput } from './styled';
import { Link } from "react-router-dom";
import { useSala } from '../App';
import { useForm } from "react-hook-form";
import useLocalStorage from "../useLocalStorage.js";

const Editor = lazy(() => import('../Editor'));

function getHeight(length, height) {
  const totalScroll = length * height / 4;
  return totalScroll;
}

export default function Sale() {
  const [, setSala] = useSala();

  const [arr, setArr] = useLocalStorage("items", ["add"]);
  const [items, setItems] = useState(arr)
  const { width, height } = useWindowSize();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    setArr((current) => [data.name, ...current]);
  };
  useEffect(() => setItems(arr), [arr])

  return (
    <div style={{ overflow: 'hidden', height: '100vh', position: 'relative' }}>
      <Container>
        <Grid
          style={{
            width,
            height: getHeight(width < 600 ? length : length, height),
            y: scrollY
          }}
          drag="y"
          dragConstraints={{
            top: -getHeight(width < 600 ? length : length, height),
            bottom: 0
          }}
        >
          {items.length > 0
            ? items.map((e, _id) => (
              e == "add" ? (
                <Suspense key={_id} fallback={<div style={{ width: '100%', height: '100%', backgroundColor: 'white', borderRadius: '20px', opacity: 0.7 }} />}>
                  <Card>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Testoinput {...register("name", { required: true })} />
                      {errors.name}
                      <Buttoninput type="submit" >ADD</Buttoninput>
                    </Form>
                  </Card>
                </Suspense>
                //div che aggiunge un local storage nuovo
                //setArr((current)=>current.splice(_id,1))
              )
                : (
                  <Suspense key={_id} fallback={<div style={{ width: '100%', height: '100%', backgroundColor: 'white', borderRadius: '20px', opacity: 0.7 }} />}>
                    <Card onClick={() => setSala(e)}>
                      <Svg onClick={() => setArr((current) => { const components = current.slice(0); components.splice(_id, 1); return components; })} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" height="50px" fill="none" viewBox="0 0 24 24" stroke="red">
                        <path strokeLinecap="red" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </Svg>
                      <Link to="/editor">
                        <Testo idlocalestorage={e} >{e}</Testo>
                      </Link>
                    </Card>
                  </Suspense>
                )
            ))
            : (
              <>
                <Card>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Testoinput {...register("name", { required: true })} />
                    {errors.name}
                    <Buttoninput type="submit" >ADD</Buttoninput>
                  </Form>
                </Card>

              </>
            )
          }
        </Grid>
      </Container>
    </div>
  );

}