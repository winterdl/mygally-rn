import SQLite from 'react-native-sqlite-storage';

export class DatabaseInitialization {
  updateTables = (database) => {
    return database.transaction(this.createTables);
  };

  createTables = (transaction) => {
    //! for dev mode
    const dropAllTables = false;
    if (dropAllTables) {
      transaction.executeSql('DROP TABLE IF EXISTS groups');
      transaction.executeSql('DROP TABLE IF EXISTS posts');
    }

    //create groups table
    transaction.executeSql(`
    CREATE TABLE IF NOT EXISTS "groups" (
      "id"	INTEGER NOT NULL,
      "name"	TEXT NOT NULL,
      "icon"	TEXT,
      PRIMARY KEY("id" AUTOINCREMENT)
    );`);

    //create posts table
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS "posts" (
        "id"	INTEGER NOT NULL,
        "group_id"	INTEGER NOT NULL,
        "date"	TEXT,
        "title"	TEXT,
        "content"	TEXT,
        "images"	TEXT,
        FOREIGN KEY (group_id) REFERENCES groups (id),
        PRIMARY KEY("id" AUTOINCREMENT)
      );
    `);
  };
}
