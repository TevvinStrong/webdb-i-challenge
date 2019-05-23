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
    }

    db.add(createAccount)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(error => {
            res.status(404).json({ error: "that specified id dones not exists." });
        })
});

server.put('/:id', (req, res) => {
    const updateAccount = req.body;
    console.log(updateAccount);
    db.update(updateAccount)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(error => {
            res.status(404).json({ error: "Unable to update this specified account." });
        })
});

server.delete('/:id', (req, res) => {
    let deleteAccount = req.params.id;

    db.remove(deleteAccount)
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(error => {
            res.status(404).json({ error: "Unable to delete the specified account." });
        })
});

module.exports = server;