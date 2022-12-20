import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import { FuzzyLogicStore, FuzzyNumberOps } from './store/FuzzyLogicStore';
import DefuzzyfyNumber from './store/DefuzzyfyNumber';
import { DeffuzzyLogicStore, FuzzyLogFileStore } from './store/FileStore';

export const Context = createContext()


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Context.Provider value={{
      user: new UserStore(),
      fuzzylogic: new FuzzyLogicStore(),
      defuzznumber: new DefuzzyfyNumber(),
      opsnumber: new FuzzyNumberOps(),
      fuzzyNfile: new FuzzyLogFileStore(),
      defNfile: new DeffuzzyLogicStore()
    }}>
      <App />
    </Context.Provider>
);
