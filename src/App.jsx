import React from "react";
import "./index.css";
import Editor from "./Editor";
import Sale from "./Sale";
import 'react-toastify/dist/ReactToastify.css';
import { AnimateSharedLayout } from 'framer-motion';
import { Route, Switch } from 'react-router';

function App() {
  return (
    <AnimateSharedLayout type="crossfade">
    <Switch>
      <Route path="/editor">
      <Editor />
      </Route>
      <Route path="/">
        <Sale/>
      </Route>
    </Switch>
  </AnimateSharedLayout>
    
  );
}

export default App;
