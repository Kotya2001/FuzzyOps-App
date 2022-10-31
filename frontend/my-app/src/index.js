import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import FuzzyLogicStore from './store/FuzzyLogicStore';
import DefuzzyfyNumber from './store/DefuzzyfyNumber';

export const Context = createContext()


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Context.Provider value={{
      user: new UserStore(),
      fuzzylogic: new FuzzyLogicStore(),
      defuzznumber: new DefuzzyfyNumber()
    }}>
      <App />
    </Context.Provider>
);
