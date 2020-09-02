import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [journalList, setJournalList] = useState(null);
  const user = sessionStorage.getItem('user');

  useEffect(() => {
    // incase user refreshes and context is cleared.
    if (user && !currentUser) {
      axios
        .get(`/api/users/current`, {
          withCredentials: true
        })
        .then(({ data }) => {
          console.log("!!!!!!!!!!!!!", data)
          setCurrentUser(data);
        })
        .catch((error) => console.error(error));
    }
  }, [currentUser, user]);

  return (
    <AppContext.Provider
      value={{ currentUser, setCurrentUser, loading, setLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
