const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

app.use(express.json());

const jwtUtils = require('./jwtUtils');
const database = require('./database');

// Create a connection poo
// Enable CORS for all requests
app.use(cors());
app.get('/api/', (req, res) => {

    res.send("Hello");
});

function getHashedPassword(password) {
    return bcrypt.hashSync(password, 8);
}

function comparePasswords(dbPass, pass) {
    return bcrypt.compare(pass, dbPass)
}

app.get('/api/test-authorization', async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).send({ message: 'No token provided!' });
        }
        res.status(200).json(jwtUtils.verify(token));
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

app.get('/api/user/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const query = 'SELECT * FROM Accounts WHERE id = ?;';
        database.query(query, [id], (err, results) => {
            if (err) {
                return res.status(500).json({message: 'Error on the server.'});
            }
            if (results.length === 0) {
                return res.status(404).json({message: 'User not found'});
            }
            res.status(200).json(results[0]);
        });
    } catch (error) {
        console.log(error)
        res.writeHead(500, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: error}))
    }
});

let getLast = (callback) => {
    database.query('SELECT * FROM Accounts WHERE id = LAST_INSERT_ID()', null, (err, results) => callback(err, results));
}

app.post('/api/signup', async (req, res) => {
    try {
        const {username, password, first_name, last_name} = req.body;
        let hashed_password = getHashedPassword(password);
        const query = 'INSERT INTO Accounts (username, password, first_name, last_name, group_name) VALUES (?, ?, ?, ?, ?);';
        let sqlQueryParams = [username, hashed_password, first_name, last_name, 'GROUP_USER'];
        database.query(query, sqlQueryParams, async (err, results) => {
            if (err) {
                return res.status(500).json({message: 'Error on the server.'});
            }
            if (results.length === 0) {
                return res.status(404).json({message: 'User not found'});
            }
            database.query('SELECT * FROM Accounts WHERE id = LAST_INSERT_ID()', null, (err, obj) => {
                if (err) {
                    return res.status(500).json({message: 'Error on the server.'});
                }
                const token = jwtUtils.generateJWT(obj[0].username, obj[0].first_name, obj[0].last_name, obj[0].group_name);
                res.status(200).json({...obj[0], token: token});
            });
        });
    } catch (error) {
        res.status(500).json({message: error});
    }
});

app.post('/api/login', (req, res) => {
    const {username, password} = req.body;

    database.query("SELECT * FROM Accounts where username = ?", [username], function (err, values) {
        if (err) {
            return res.status(500).json({message: 'Error on the server.'});
        }
        if (values == undefined) {
            return res.status(404).json({message: "User not found"})
        }
        comparePasswords(values[0].password, password)
            .then(response => {
                if (response == false) {
                    throw new Error("Wrong password");
                }
                const token = jwtUtils.generateJWT(values[0].username, values[0].first_name, values[0].last_name, values[0].group_name);
                res.status(200).json({"token": token});
            })
            .catch(error => {
                return res.status(500).json({message: error.message})
            })
    });
});

const port = process.env.port || 2901;

// Start the server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
