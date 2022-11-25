# ethVietnamHackathon

Project for ethVietnam Hackathon

## Backend Technology Stack

- Node.js
- Express
- MySQL

## Instructions on installation and running

The code is split into three parts:

- server-side (in the `Backend` folder)
- client-side (in the `Frontend` folder)
- Conracts (in the `Contracts` folder)

### Install dependencies:

```bash
$ npm install
```

### server-side npm scripts (`Backend` folder)

```json
 "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "build": "npm run clean && cp -r src dist/src && cp -r bin dist/bin && cp *.yml dist && cp *.yaml dist && cp *.json dist && cp README.md dist && cp LICENSE dist",
    "clean": "rimraf dist && mkdirp dist"
  }
```

### Start Express.js app at `http://localhost:3001/`

```bash
$ npm start
```

### Nodemon

Nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

### MySQL Database Connectivity (with connection pool)

This is a node.js driver for mysql. Also implemented the connection pool, it is a cache of database connections maintained so that the connections can be reused when future requests to the database are required. Connection pools are used to enhance the performance of executing commands on a database.

```js
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10, // The maximum number of connections to create at once. (Default: 10)
  host: localhost, // The hostname of the database you are connecting to. (Default: localhost)
  port: 3306, // The port number to connect to. (Default: 3306)
  user: 'root', // The MySQL user to authenticate as.
  password: '', // The password of that MySQL user.
  database: 'sr_dao', // Name of the database to use for this connection.
});
```

## REST API:

| **Route**                 | **Result**                                 |
| :------------------------ | :----------------------------------------- |
| /enrollUser               | To enroll request by user                  |
| /getEnrollData            | To get data of enrolled requests           |
| /actUserEnrollRequest     | To act against request by service provider |
| /userConfirmEnrollRequest | To confirm request by user                 |
| /getGuardMeDetails        | To get details from guardMe table          |
| /requestRecoverySignature | To request recovery signature for request  |
| /fetchRecoveryMessage     | To fetch recovery message                  |
| /generateSign             | To generate sign                           |
| /getSignature             | To get signature data                      |
