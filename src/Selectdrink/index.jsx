import { useEffect, useState } from "react";
import {
  P,
  Container,
  Line,
  Card,
  Svg,
  Pezzo,
  Motion,
  PP,
  Tot,
  Quantita,
  Prezzo,
  LittleText,
  Buttonline,
  Table,
  Product,
  Field,
  Header,
  Datiprenotazione,
  Numerotavolo,
  Infoline,
  Cardbig,
  Pop,
  ButtonTavoli,
  DeleteTavoli,
  AllergieText,
  AllergieContent,
  Allergie,
  Linebig,
} from "./styled";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  getdatasala,
  getstampa,
  updatedatasala,
  updatestampa,
} from "../firebase";


export default function Selectdrink(props) {
  const { register, handleSubmit } = useForm();
  const [note, setNote] = useState(null);
  const [loading, setloading] = useState(false);

  const onSubmit = (data) => {
    setNote(data.text);
    toast.success("Note aggiunte 😃");
  };

  const { ordine, setOrdine } = props;

  const [page, setPage] = useState({ conto: [], state: 0 });

  const [drink, setDrink] = useState({
    acquanaturalemezzo: [0, 1],
    acquanaturaleuno: [0, 1.5],
    acquagasmezzo: [0, 1],
    acquagasuno: [0, 1.5],
    cocapiccola: [0, 2.5],
    cocamedia: [0, 3.5],
    birrapiccola: [0, 2.5],
    birramedia: [0, 3.5],
    Vino_bianco_Pignoletto: [0, 8],
    Vino_rosso_S_Giovese: [0, 8],
    menumarrone1: [ordine.value.menu[0], 25],
    menumarrone2: [ordine.value.menu[1], 25],
    menunomarrone: [ordine.value.menu[2], 12],
  });

  const createconto = () => {
    const conto = Object.entries(drink).filter((data) => data[1][0] !== 0);

    const tot = conto.reduce((acc, data) => {
      return acc + data[1][1] * data[1][0];
    }, 0);

    setPage({ conto, tot, state: 2 });
  };

  const movetostampa = async () => {
    setloading(true);
    const { key, value } = ordine;
    const { nome, cognome, allergie, Ntavoli, user, persone, admin } = value;
    const { conto, tot } = page;

    const listing = conto.reduce((acc, data) => {
      return {
        ...acc,
        [data[0]]: { qty: data[1][0], price: data[1][1] },
      };
    }, {});

    try {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Basic QUNiN2JiNDg5YzBmMTk3MDFmNjdmN2E2YzkwZTk5M2M0NDo5MmQ3MzEwMzc5OWQyNDgyMzY3MTk5YmYyZmY3MjZiZg=="
      );
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("To", user);
      urlencoded.append(
        "MessagingServiceSid",
        "MG0aafad06d3bfbf95158cc632ed31bdb0"
      );
      urlencoded.append(
        "Body",
        `Buon appetito da Sagre Alidosiane.it , la presente viene inviata a titolo di ricevuta del suo pagamento di euro ${tot}. Info e copia all info Point .`
      );

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(
        "https://api.twilio.com/2010-04-01/Accounts/ACb7bb489c0f19701f67f7a6c90e993c44/Messages.json",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log("mesaggio inivato"))
        .catch((error) => console.log("error", error));

      const dataprenotazione = {
        [key]: {
          nome,
          cognome,
          allergie,
          user,
          Ntavoli,
          listing,
          tot,
          persone,
          note,
          admin,
          data: new Date(),
          state: 0,
        },
      };

      const response = await getstampa();
      if (!response)
        throw new Error(
          "ERRORE nel prendere nel prendere le prenotazioni 😞, ricarica"
        );

      await updatestampa({ ...dataprenotazione, ...response });

      toast.success("Prenotazione aggiunta alla coda di stampa 🖨");

      const data = await getdatasala();
      if (!response)
        throw new Error(
          "ERRORE nel prendere nel prendere le prenotazioni 😞, ricarica"
        );

      const updateddata = Object.entries(data).reduce(
        (acc, [chiave, valore]) => {
          if (chiave === key)
            return { ...acc, [key]: { ...valore, state: "storage" } };
          else return { ...acc, [chiave]: valore };
        },
        {}
      );

      await updatedatasala(updateddata);
      toast.info("Prenotazione spostata in storage 𝌏");
      setloading(false);
      setOrdine(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (page.state === 0)
    return (
      <Container>
        <Motion
          drag="x"
          position="relative"
          dragConstraints={{ left: -400, right: 0 }}
        >
          <Line>
            <Cardcomponent
              drink={drink}
              setDrink={setDrink}
              whodrink={"acquanaturalemezzo"}
              str1={"Acqua naturale"}
              str2={"1/2"}
              str3={"litro-€ 1,00"}
            ></Cardcomponent>
            <Cardcomponent
              drink={drink}
              setDrink={setDrink}
              whodrink={"acquanaturaleuno"}
              str1={"Acqua naturale"}
              str2={"1"}
              str3={"litro-€ 1,50"}
            ></Cardcomponent>
            <Cardcomponent
              drink={drink}
              setDrink={setDrink}
              whodrink={"acquagasmezzo"}
              str1={"Acqua frizzante"}
              str2={"1/2"}
              str3={"litro-€ 1,00"}
            ></Cardcomponent>
            <Cardcomponent
              drink={drink}
              setDrink={setDrink}
              whodrink={"acquagasuno"}
              str1={"Acqua frizzante"}
              str2={"1"}
              str3={"litro-€ 1,50"}
            ></Cardcomponent>
          </Line>
        </Motion>
        <Motion
          drag="x"
          position="relative"
          dragConstraints={{ left: -400, right: 0 }}
        >
          <Line>
            <Cardcomponent
              drink={drink}
              setDrink={setDrink}
              whodrink={"cocapiccola"}
              str1={"Coca cola"}
              str2={"picola"}
              str3={"€ 2,50"}
            ></Cardcomponent>
            <Cardcomponent
              drink={drink}
              setDrink={setDrink}
              whodrink={"cocamedia"}
              str1={"Coca cola"}
              str2={"media"}
              str3={"€ 3,50"}
            ></Cardcomponent>
            <Cardcomponent
              drink={drink}
              setDrink={setDrink}
              whodrink={"birrapiccola"}
              str1={"Birra"}
              str2={"piccola"}
              str3={"€ 2,50"}
            ></Cardcomponent>
            <Cardcomponent
              drink={drink}
              setDrink={setDrink}
              whodrink={"birramedia"}
              str1={"Birra"}
              str2={"media"}
              str3={"€ 3,50"}
            ></Cardcomponent>
          </Line>
        </Motion>
        <Motion
          drag="x"
          position="relative"
          dragConstraints={{ left: -200, right: 0 }}
        >
          <Line>
            <Cardcomponent
              drink={drink}
              setDrink={setDrink}
              whodrink={"Vino_bianco_Pignoletto"}
              str1={"Bianco"}
              str2={"Pignoletto"}
              str3={"0,75cl-€ 8,00"}
            ></Cardcomponent>

            <Cardcomponent
              drink={drink}
              setDrink={setDrink}
              whodrink={"Vino_rosso_S_Giovese"}
              str1={"Rosso"}
              str2={"S.Giovese"}
              str3={"0,75cl-€ 8,00"}
            ></Cardcomponent>
          </Line>
        </Motion>
        <ButtonTavoli onClick={() => setPage({ conto: [], state: 1 })}>
          CONTINUA
        </ButtonTavoli>
        <DeleteTavoli>
          <Svg
            onClick={() => setOrdine(false)}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
            />
          </Svg>
        </DeleteTavoli>
      </Container>
    );
  else if (page.state === 1)
    return (
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Allergie>
            <AllergieText type="submit">
              CONFERMA ALLERGIE
              <LittleText>Se non confermi le note saranno NULL</LittleText>
            </AllergieText>
            <AllergieContent
              defaultValue={[ordine.value.allergie[0]]}
              {...register("text")}
            ></AllergieContent>
          </Allergie>
        </form>
        <Motion
          drag="x"
          position="relative"
          dragConstraints={{ left: -400, right: 0 }}
        >
          <Linebig>
            <Cardcomponentbig
              drink={drink}
              setDrink={setDrink}
              whodrink={"menumarrone1"}
              str1={"Menu"}
              str2={"CAPALTAZ"}
              str3={""}
            ></Cardcomponentbig>
            <Cardcomponentbig
              drink={drink}
              setDrink={setDrink}
              whodrink={"menumarrone2"}
              str1={"Menu"}
              str2={"TAGLIATELLE"}
              str3={""}
            ></Cardcomponentbig>
            <Cardcomponentbig
              drink={drink}
              setDrink={setDrink}
              whodrink={"menunomarrone"}
              str1={"Menu"}
              str2={"NO"}
              str3={"MARRONE"}
            ></Cardcomponentbig>
          </Linebig>
        </Motion>
        <ButtonTavoli onClick={() => createconto()}>CONTO</ButtonTavoli>
        <DeleteTavoli>
          <Svg
            onClick={() => setPage({ conto: [], state: 0 })}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
            />
          </Svg>
        </DeleteTavoli>
      </Container>
    );
  else
    return (
      <Container>
        <Header>
          <Datiprenotazione>
            <PP size={"25px"}>{ordine.value.nome}</PP>
            <PP size={"25px"}>{ordine.value.cognome}</PP>
            <PP size={"8px"}>{ordine.value.user}</PP>
          </Datiprenotazione>
          <Numerotavolo>
            {ordine.value.Ntavoli.map((value) => (
              <p key={value}>{value}</p>
            ))}
          </Numerotavolo>
        </Header>
        <Table>
          {page.conto.map(([key, value]) => (
            <Product key={key}>
              <Field>{key}</Field>
              <Quantita>
                <PP size={"10px"}>Qty</PP>
                <PP size={"25px"}>{value[0]}</PP>
              </Quantita>
              <Prezzo>
                <PP size={"10px"}>Price</PP>
                <PP size={"25px"}>{value[1]}</PP>
              </Prezzo>
            </Product>
          ))}
        </Table>
        <Product>
          <Field>Totale</Field>
          <Tot>
            <PP size={"25px"}>{page.tot} €</PP>
          </Tot>
        </Product>
        {loading ? (
          <ButtonTavoli>Caricamento ...</ButtonTavoli>
        ) : (
          <ButtonTavoli onClick={() => movetostampa()}>COMPLETA</ButtonTavoli>
        )}
        <DeleteTavoli>
          <Svg
            onClick={() => setPage({ conto: [], state: 1 })}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
            />
          </Svg>
        </DeleteTavoli>
      </Container>
    );
}

const Cardcomponent = ({ drink, setDrink, whodrink, str1, str2, str3 }) => {
  return (
    <Card>
      <Pop>
        <p>{drink[whodrink][0]}</p>
      </Pop>
      <Infoline>
        <P size={"10px"}>{str1}</P>
        <P size={"20px"}>{str2}</P>
        <P size={"10px"}>{str3}</P>
      </Infoline>
      <Buttonline>
        <Pezzo
          border={"0px 0px 0px 20px"}
          color={"#ffade3"}
          onClick={() =>
            setDrink((current) => {
              return {
                ...current,
                [whodrink]: [current[whodrink][0] + 1, current[whodrink][1]],
              };
            })
          }
        >
          <Svg
            color={"var(--line)"}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </Svg>
        </Pezzo>
        <Pezzo
          border={"0px 0px 20px 0px"}
          color={"var(--line)"}
          onClick={() =>
            setDrink((current) => {
              return {
                ...current,
                [whodrink]: [current[whodrink][0] - 1, current[whodrink][1]],
              };
            })
          }
        >
          <Svg
            color={"#ffade3"}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </Svg>
        </Pezzo>
      </Buttonline>
    </Card>
  );
};

const Cardcomponentbig = ({ drink, setDrink, whodrink, str1, str2, str3 }) => {
  return (
    <Cardbig>
      <Pop>
        <p>{drink[whodrink][0]}</p>
      </Pop>
      <Infoline>
        <P size={"10px"}>{str1}</P>
        <P size={"20px"}>{str2}</P>
        <P size={"10px"}>{str3}</P>
      </Infoline>
      <Buttonline>
        <Pezzo
          border={"0px 0px 0px 20px"}
          color={"#ffade3"}
          onClick={() =>
            setDrink((current) => {
              return {
                ...current,
                [whodrink]: [current[whodrink][0] + 1, current[whodrink][1]],
              };
            })
          }
        >
          <Svg
            color={"var(--line)"}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </Svg>
        </Pezzo>
        <Pezzo
          border={"0px 0px 20px 0px"}
          color={"var(--line)"}
          onClick={() =>
            setDrink((current) => {
              return {
                ...current,
                [whodrink]: [current[whodrink][0] - 1, current[whodrink][1]],
              };
            })
          }
        >
          <Svg
            color={"#ffade3"}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </Svg>
        </Pezzo>
      </Buttonline>
    </Cardbig>
  );
};
