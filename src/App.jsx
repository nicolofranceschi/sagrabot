import {  useState , createContext} from 'react';
import "./index.css";
import Editor from "./Editor";
import Sale from "./Sale";
import 'react-toastify/dist/ReactToastify.css';
import { AnimateSharedLayout } from 'framer-motion';
import { Route, Switch } from 'react-router';

export const SaleContext = createContext(null);

function App() {

  const [sale,setSale] = useState(null);

  return (
    <AnimateSharedLayout type="crossfade">
    <SaleContext.Provider value={[sale, setSale]}>
    <Switch>
      <Route path="/editor">
      <Editor />
      </Route>
      <Route path="/">
        <Sale/>
      </Route>
    </Switch>
    </SaleContext.Provider>
  </AnimateSharedLayout>
    
  );
}

export default App;
