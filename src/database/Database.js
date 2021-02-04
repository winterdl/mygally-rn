import SQLite from 'react-native-sqlite-storage';
import {DB_FILE_NAME} from 'constants/Database';
import {AppState, AppStateStatus} from 'react-native';
import {DatabaseInitialization} from './DatabaseInitialization';

let databaseInstance = undefined;

const getAllGroups = async () =>
  getDatabase()
    .then((db) => db.executeSql('SELECT * from groups'))
    .then(([results]) => {
      if (results === undefined) return [];

      const count = results.rows.length;
      let lists = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {name, icon} = row;
        lists.push({name, icon});
      }

      return lists;
    });

//Create a new group
const createGroup = async ({title, icon}) => {
  console.log('==creategroup==', title, icon); 
  return getDatabase()
    .then((db) =>
      db.executeSql('INSERT INTO GROUPS (name, icon) VALUES (?, ?);', [
        title,
        icon,
      ]),
    )
    .then(([results]) => {
      const {rows} = results;
      console.log('create group ', rows);
    });
};

const getDatabase = async () => {
  if (databaseInstance !== undefined) return Promise.resolve(databaseInstance);

  return open();
};

const open = async () => {
  SQLite.DEBUG(true);
  SQLite.enablePromise(true);

  if (databaseInstance) {
    console.log('database is already opened.');
    return databaseInstance;
  }

  //create a new db instance
  const db = await SQLite.openDatabase({
    name: DB_FILE_NAME,
    location: 'default',
  });

  const databaseInitialization = new DatabaseInitialization();
  await databaseInitialization.updateTables(db);

  databaseInstance = db;
  return db;
};

const close = async () => {
  if (databaseInstance === undefined) {
    console.log('database is already closed.');
    return;
  }

  const status = await databaseInstance.close();
  databaseInstance = undefined;
};

export const sqliteDatabase = {
  getAllGroups,
  createGroup,
};
