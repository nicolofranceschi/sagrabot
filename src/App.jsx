import { createContext, useContext, useState, useEffect } from 'react';
import Editor from "./Editor";
import Sale from "./Sale";
import Loginphone from "./Loginphone";
import { AnimateSharedLayout } from 'framer-motion';
import { auth, firestore } from './firebase';
import { Route, Switch } from 'react-router';
import useLocalStorage from './useLocalStorage';
import { toast, ToastContainer } from "react-toastify";
import Choose from './Choose';
import { Menu } from './Menu';
import Prenotazioni from "./SelectTable"
import Home from "./Home";
import Qr from "./Qr";
import Admin from "./Admin";
import HomeAdmin from "./HomeAdmin";
import QrReadercp from "./QrReader";
import Superadmin from "./Superadmin";
import Edit from "./Edit";
import Insidedata from "./Insidedata";
import Insertname from './Insertname';
import Stampa from "./Stampa";
import { useHistory } from 'react-router-dom';
import Map from './Map';

const SalaContext = createContext(null);

export const useSala = () => useContext(SalaContext);

function ciSonoConflitti (firestoreData, localData, user, data, orario) {
  const prenotazioneInConflitto = prenotazione => prenotazione.data === data && prenotazione.orario === orario && prenotazione.user !== user;
  return Object.keys(localData).some(local => firestoreData[local].prenotazioni.some(prenotazioneInConflitto));
}

function App() {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [prenotazioni, setPrenotazioni] = useState(null);

  const [{ data, orario }, setMomento] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        setUser(firebaseUser.phoneNumber);
        setAdmin(firebaseUser.email);
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = firestore.collection("users").doc("sala").onSnapshot((snapshot) => {
      //if (prenotazioni) console.log(snapshot.data()?.sale['SAGRA'], prenotazioni[1], user, data, orario)
      if (prenotazioni && ciSonoConflitti(snapshot.data()?.sale['SAGRA'], prenotazioni[1], user, data, orario)) {
        console.log(prenotazioni)
        toast.error(`Prenotazione in conflitto, si prega di riprovare`);
        history.push('/');
      }
    });
    return unsubscribe;
  }, [prenotazioni, user]);

  const context = {
    sala: useLocalStorage('sala', ''),
    user: [user, setUser],
    admin : [admin, setAdmin],
    orario: [{ data, orario }, setMomento],
    prenotazioni: [prenotazioni, setPrenotazioni],
  };

  return (
    <>
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
      {user ? (
        <SalaContext.Provider value={context}>
          <LoggedRouter />
        </SalaContext.Provider>
      ) : admin ? (

        <SalaContext.Provider value={context}>
          <AdminDom setUser={setUser}/>
        </SalaContext.Provider>

      ) : (
        <SalaContext.Provider value={context}>
          <NonLoggedRouter />
        </SalaContext.Provider>
      )}
    </>);
}

const LoggedRouter = () => (
  <AnimateSharedLayout type="crossfade">
    <Switch>
      <Route path="/editor">
        <Editor />
      </Route>
      <Route path="/sale">
        <Sale />
      </Route>
      <Route path="/choose">
        <Prenotazioni />
      </Route>
      <Route path="/menu">
        <Menu />
      </Route>
      <Route path="/data">
        <Choose />
      </Route>
      <Route path="/qr">
        <Qr />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </AnimateSharedLayout>
);

const NonLoggedRouter = (props) => (
  <AnimateSharedLayout type="crossfade">
    <Switch>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route path="/">
        <Loginphone setUser={props.setUser} />
      </Route>
    </Switch>
  </AnimateSharedLayout>
);


const AdminDom = (props) => (
  <AnimateSharedLayout type="crossfade">
    <Switch>
    <Route path="/edit">
        <Edit setUser={props.setUser} />
      </Route>
    <Route path="/conto">
        <Superadmin />
      </Route>
    <Route path="/map">
        <Map />
      </Route>
    <Route path="/stampa">
        <Stampa />
      </Route>
    <Route path="/insidedata">
        <Insertname />
      </Route>
    <Route path="/qrreader">
        <QrReadercp />
      </Route>
      <Route path="/">
        <HomeAdmin />
      </Route>
    </Switch>
  </AnimateSharedLayout>
);
export default App;
