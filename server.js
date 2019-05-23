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

server.post('/', (req, res) => {
    let createAccount = {
        name: req.body.name,
        budget: req.body.budget
    };

    db.add(createAccount)
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(error => {
            res.status(404).json({ error: "that specified id dones not exists." });
        })
});

module.exports = server;