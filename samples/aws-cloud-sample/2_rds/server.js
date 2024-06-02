const AWS = require('aws-sdk');
const database = require('./database');

// Initialize the RDS service object
const rds = new AWS.RDS({ region: 'us-east-2' });

let createADbInstance = () => {
    const params = {
        DBInstanceIdentifier: 'fii-cloud-mysql-db-from-code',
        AllocatedStorage: 20, // in GB
        DBInstanceClass: 'db.t3.micro',
        Engine: 'mysql',
        MasterUsername: 'admin',
        MasterUserPassword: '123456789',
        AvailabilityZone: 'us-east-2a',
        BackupRetentionPeriod: 7,
        PubliclyAccessible: true
    };

    rds.createDBInstance(params, (err, data) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}

let SELECT_PERSONS_QUERY = 'SELECT * FROM persoane;';
let CREATE_TABLE_PERSONS = 'CREATE TABLE persoane (\n' +
    '    id INT AUTO_INCREMENT PRIMARY KEY,\n' +
    '    nume VARCHAR(50),\n' +
    '    prenume VARCHAR(50),\n' +
    '    varsta INT\n' +
    ');\n';
let INSERT_MOCK_DATA_INTO_TABLE_PERSONS = 'INSERT INTO persoane (nume, prenume, varsta) VALUES\n' +
    '(\'Popescu\', \'Ion\', 30),\n' +
    '(\'Ionescu\', \'Maria\', 25),\n' +
    '(\'Georgescu\', \'Andrei\', 35);\n';
let doQuery = (query) => {
    try {
        database.query(query, null, (err, results) => {
            if (err) {
                return console.error(err);
            }
            if (results.length === 0) {
                return console.error('User not found');
            }
            console.log(results);
        });
    } catch (error) {
        console.log(error)
    }
}

// createADbInstance();
doQuery(CREATE_TABLE_PERSONS);
doQuery(INSERT_MOCK_DATA_INTO_TABLE_PERSONS);
doQuery(SELECT_PERSONS_QUERY);