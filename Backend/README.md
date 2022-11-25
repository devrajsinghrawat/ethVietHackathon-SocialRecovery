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

### MySQL Database Connectivity (with connection pool) 
Start the apache and sqlserver using **xampp**

use my php admin http://localhost/phpmyadmin/index.php?route=/&reload=1&lang=en  and setup database using below stpes 

- Click on Databases
- Provide the Database name sr_dao and click create
- After that click on Import button and Browser to backend/src/sr_dao.sql and click import


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
