const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tennis.db');

db.serialize(() => {

    sql = 'CREATE TABLE IF NOT EXISTS favorite (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'first_name TEXT NOT NULL, ' +
        'last_name TEXT NOT NULL, ' +
        'age INTEGER NOT NULL, ' +
        'height INTEGER NOT NULL, ' +
        'image TEXT NOT NULL, ' +
        'country TEXT NOT NULL)';
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log("Table favorite created"); 
    });

    sql = 'CREATE TABLE IF NOT EXISTS tournament (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'name TEXT NOT NULL, ' +
        'court TEXT NOT NULL, ' +
        'location TEXT NOT NULL, ' +
        'surface TEXT NOT NULL, ' +
        'image TEXT NOT NULL)';
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log("Table tournament created"); 
    });
    db.close();

})