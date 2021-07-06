import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSala } from '../App';
import useLocalStorage from "../useLocalStorage";
import { useWindowSize } from "../useWindowSize";
import { Buttoninput, Card, Container, Form, Grid, Svg, Testo, Testoinput } from './styled';

function getHeight(length, height) {
  const totalScroll = length * height / 4;
  return totalScroll;
}

export default function Sale() {
  const [, setSala] = useSala();
  const [arr, setArr] = useLocalStorage("items", []);
  const { width, height } = useWindowSize();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => setArr(current => [data.name, ...current]);

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
          {arr.map((sala, i) => (
              <Card onClick={() => setSala(sala)} key={`sale_${i}`}>
                <Svg onClick={() => setArr(current => [...current.slice(0, i), ...current.slice(i + 1)])} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" height="50px" fill="none" viewBox="0 0 24 24" stroke="red">
                  <path strokeLinecap="red" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </Svg>
                <Link to="/editor">
                  <Testo>{sala}</Testo>
                </Link>
              </Card>
            ))
          }
          <Card>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Testoinput {...register("name", { required: true })} />
              {errors.name}
              <Buttoninput type="submit" >ADD</Buttoninput>
            </Form>
          </Card>
          {/* div che aggiunge un local storage nuovo
          setArr((current)=>current.splice(_id,1)) */}
        </Grid>
      </Container>
    </div>
  );

}