import SQLite from 'react-native-sqlite-storage';
import {DB_FILE_NAME} from 'constants/Database';
import {AppState, AppStateStatus} from 'react-native';
import {DatabaseInitialization} from './DatabaseInitialization';

let databaseInstance = undefined;

//Get all group list
const getAllGroups = () =>
  getDatabase()
    .then((db) =>
      db.executeSql(`SELECT groups.*, COUNT(posts.id) as postCount from groups left join 
      posts on groups.id = posts.group_id group by groups.id;`),
    )
    .then(([results]) => {
      if (results === undefined) return [];
      const count = results.rows.length;
      let lists = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {id, name, icon, postCount} = row;
        lists.push({id, name, icon, postCount});
      }

      return lists;
    })
    .catch((error) => error);

//Create a new group
const createGroup = ({title, icon}) =>
  getDatabase()
    .then((db) =>
      db.executeSql('INSERT INTO GROUPS (name, icon) VALUES (?, ?);', [
        title,
        icon,
      ]),
    )
    .then(([results]) => {
      const {insertId} = results;
      console.log('Added group : ', insertId);
    })
    .catch((error) => error);

//Create a new post in group
const createPost = ({groupId, date, title, content, images}) =>
  getDatabase()
    .then((db) =>
      db.executeSql(
        'INSERT INTO posts (group_id, date, title, content, images) VALUES (?, ?, ?, ?, ?);',
        [groupId, date, title, content, images],
      ),
    )
    .then(([results]) => {
      const {insertId} = results;
      console.log('Added post : ', insertId);
    })
    .catch((error) => error);

//Update post
const updatePost = ({postId, date, title, content, images}) =>
  getDatabase()
    .then((db) =>
      db.executeSql(
        'UPDATE posts SET date = ?, title = ?, content = ? , images = ? WHERE id = ?;',
        [date, title, content, images, postId],
      ),
    )
    .then(([results]) => {
      console.log(results);
      const {rowsAffected} = results;
      if (rowsAffected === 0) throw new Error('update fail');
      console.log('Updated post : ', postId);
    })
    .catch((error) => error);

//Delete post
const deletePost = (postId) =>
  getDatabase()
    .then((db) => db.executeSql('DELETE FROM posts WHERE id = ?;', [postId]))
    .then(([results]) => {
      const {rowsAffected} = results;
      if (rowsAffected === 0) throw new Error('delete fail');
      console.log('Deleted post : ', postId);
    })
    .catch((error) => error);

const getAllPosts = async (groupId) =>
  getDatabase().then((db) =>
    db
      .executeSql('SELECT * FROM posts WHERE group_id = ? ORDER BY id DESC ', [groupId])
      .then(([results]) => {
        if (results === undefined) return [];

        const count = results.rows.length;
        let lists = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          lists.push(row);
        }
        return lists;
      })
      .catch((error) => error),
  );

const getFilteredPosts = async (start, end) =>
  getDatabase()
    .then((db) =>
      db.executeSql('SELECT * FROM posts WHERE date between ? and ? ', [
        start,
        end,
      ]),
    )
    .then(([results]) => {
      if (results === undefined) return [];

      const count = results.rows.length;
      let lists = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        lists.push(row);
      }
      return lists;
    })
    .catch((error) => error);

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
  getAllPosts,
  getFilteredPosts,
  createPost,
  updatePost,
  deletePost,
};
