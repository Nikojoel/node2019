'use strict';

const connection = require('./db.js');

exports.getAll = async() => {
    try {
        const [results, fields] = await connection.query('SELECT * FROM animal');
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        return results;
    } catch (e) {
        console.log(e);
        throw "db error";
    }
};

exports.search = async (name) => {
    try {
        const [results] = await connection.query ("SELECT * FROM animal WHERE name LIKE ?", [name]);
        return results;
    } catch (e) {
        console.log(e);
        throw "db error";
    }
};

exports.insert = async (name) => {
    try {
        const [result] = await connection.query('INSERT INTO animal (name) VALUES (?)', [name]);
        return result;
    } catch (e) {
        console.log(e);
        throw "db error";
    }
};