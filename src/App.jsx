import { createContext, useContext , useState, useEffect } from 'react';
import Editor from "./Editor";
import Sale from "./Sale";
import Loginphone from "./Loginphone";
import { AnimateSharedLayout } from 'framer-motion';
import { auth, getUserDocument } from './firebase';
import { Route, Switch } from 'react-router';
import useLocalStorage from './useLocalStorage';
import { toast , ToastContainer } from "react-toastify";
import Choose from './Choose';

const SalaContext = createContext(null);
export const useSala = () => useContext(SalaContext);

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        try {
          const data = await getUserDocument(firebaseUser.uid);
          setUser({ ...data });
        } catch (error) {
          toast.error(error.message); 
        }
      }
      
    });
  }, []);

  const context = useLocalStorage('sala', '');

  return true ? (
    <SalaContext.Provider value={context}>
      <LoggedRouter />
    </SalaContext.Provider>
  ) : <NonLoggedRouter  /> ;
  }

 const LoggedRouter = () => (
  <AnimateSharedLayout type="crossfade">
        <Switch>
          <Route path="/editor">
            <Editor />
          </Route>
          <Route path="/choose">
            <Choose />
          </Route>
          <Route path="/loginphone">
            <Loginphone />
          </Route>
          <Route path="/">
            <Sale />
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
