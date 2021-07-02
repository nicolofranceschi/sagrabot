import { createContext, useContext } from 'react';
import Editor from "./Editor";
import Sale from "./Sale";
import Loginphone from "./Loginphone";
import { AnimateSharedLayout } from 'framer-motion';
import { Route, Switch } from 'react-router';
import useLocalStorage from './useLocalStorage';

const SalaContext = createContext(null);
export const useSala = () => useContext(SalaContext);

function App() {

  const context = useLocalStorage('sala', '');

  return (
    <AnimateSharedLayout type="crossfade">
      <SalaContext.Provider value={context}>
        <Switch>
          <Route path="/editor">
            <Editor />
          </Route>
          <Route path="/loginphone">
            <Loginphone />
          </Route>
          <Route path="/">
            <Sale />
          </Route>
        </Switch>
      </SalaContext.Provider>
    </AnimateSharedLayout>

  );
}

export default App;
