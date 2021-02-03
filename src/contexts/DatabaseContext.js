import React, {useContext} from 'react';
import {Database, sqliteDatabase} from 'database/Database';

const DatabaseContext = React.createContext();

export const DatabaseProvider = (props) => (
  <DatabaseContext.Provider value={sqliteDatabase} {...props} />
);

export const useDatabase = () => {
  const database = useContext(DatabaseContext);

  return database;
};
