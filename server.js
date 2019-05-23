const express = require('express');

const db = require('./data/accounts-model.js');

const server = express();

// your code here
server.get('/', (req, res) => {
    db.find()
        .then(accounts => {
            res.status(200).json(accounts);
        });
});

server.get('/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(accountid => {
            res.status(200).json(accountid)
        })
        .catch(error => {
            res.status(404).json({ error: "that specified id does not exists." });
        })
});

module.exports = server;