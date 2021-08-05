import { createContext, useContext, useState, useEffect } from 'react';
import Editor from "./Editor";
import Sale from "./Sale";
import Loginphone from "./Loginphone";
import { AnimateSharedLayout } from 'framer-motion';
import { auth, firestore, generateUserDocument } from './firebase';
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
import { useHistory } from 'react-router-dom';

const SalaContext = createContext(null);

export const useSala = () => useContext(SalaContext);

function App() {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [prenotazioni, setPrenotazioni] = useState(null);

  const [{ data, orario }, setMomento] = useState({});

  useEffect(() => {
    
    console.log('inizio login')
    auth.onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        try {
          setUser(firebaseUser.phoneNumber);
          setAdmin(firebaseUser.email);
          console.log('fine login')
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  }, []);

  //useEffect(() => {
  //  const unsubscribe = firestore.collection("users").doc("sala").onSnapshot(() => {
  //    console.log('SNAPSHOT', prenotazioni);
  //    if (prenotazioni) {
  //      toast.error(`Prenotazione in conflitto, si prega di riprovare`);
  //      history.push('/');
  //    }
  //  });
  //  return unsubscribe;
  //}, [prenotazioni]);

  const context = {
    sala: useLocalStorage('sala', ''),
    user: [user, setUser],
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

      <AdminDom />

  ): (
    <SalaContext.Provider value={context}>
      <NonLoggedRouter />
    </SalaContext.Provider>
  ) }
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
        <Home/>
      </Route>
    </Switch>
  </AnimateSharedLayout>
);

const NonLoggedRouter = (props) => (
  <AnimateSharedLayout type="crossfade">
    <Switch>
    <Route path="/admin">
        <Admin/>
      </Route>
      <Route path="/">
        <Loginphone setUser={props.setUser}/>
      </Route>
    </Switch>
  </AnimateSharedLayout>
);


const AdminDom = (props) => (
  <AnimateSharedLayout type="crossfade">
    <Switch>
      <Route path="/">
       <HomeAdmin/>
      </Route>
    </Switch>
  </AnimateSharedLayout>
);
export default App;
