import { createContext, useContext, useState, useEffect } from 'react';
import Editor from "./Editor";
import Sale from "./Sale";
import Loginphone from "./Loginphone";
import { AnimateSharedLayout } from 'framer-motion';
import { auth, generateUserDocument } from './firebase';
import { Route, Switch } from 'react-router';
import useLocalStorage from './useLocalStorage';
import { toast, ToastContainer } from "react-toastify";
import Choose from './Choose';
import { Menu } from './Menu';
import Prenotazioni from "./Prenotazioni"

const SalaContext = createContext(null);

export const useSala = () => useContext(SalaContext);

function App() {

  const [user, setUser] = useState(null);
  const [prenotazioni, setPrenotazioni] = useState(null);

  const [{ data, orario }, setMomento] = useState({});


  useEffect(() => {
    auth.onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        try {
          const data = await generateUserDocument(firebaseUser.uid);
          setUser(firebaseUser);
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  }, []);

  const context = {
    sala: useLocalStorage('sala', ''),
    user: [user, setUser],
    orario: [{ data, orario }, setMomento],
    prenotazioni: [prenotazioni, setPrenotazioni],
  };

  return user ? (
    <SalaContext.Provider value={context}>
      <LoggedRouter />
    </SalaContext.Provider>
  ) : <NonLoggedRouter />;
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
      <Route path="/">
        <Choose />
      </Route>
    </Switch>
  </AnimateSharedLayout>
);

const NonLoggedRouter = () => (
  <AnimateSharedLayout type="crossfade">
    <Switch>
      <Route path="/">
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
        <Loginphone />
      </Route>
    </Switch>
  </AnimateSharedLayout>
);

export default App;
