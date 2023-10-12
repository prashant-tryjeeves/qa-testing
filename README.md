# QA test

This repo contains a pet project useful to run an interview with a QA candidate.

## How to install

Make sure you have node installed.

If you don't have it please consider nvm https://github.com/nvm-sh/nvm

Make sure you have docker installed.
If you don't have it https://www.docker.com/products/docker-desktop/

Run this command in a terminal:

```
npm i
```

Start the DB by running in a terminal this command

```
docker compose up
```

You need docker to be up and running.

If docker is not an option you can use a local instance of mysql.

To install mysql you can use `brew` by running

```
brew install mysql
```

Once brew is done you have to setup the root user password:

```
mysql -u root --skip-password
```

once the mysql shell is open:


```
CREATE DATABASE db_qa;

CREATE USER 'user_qa'@'localhost' IDENTIFIED BY 'P4ssword!!';

GRANT ALL PRIVILEGES ON *.* TO 'user_qa'@'localhost' WITH GRANT OPTION;
```


The database is a `mysql` you can access locally with a db client (like dbeaver)

```
host: localhost
port: 3306
username: user_qa
password: P4ssword!!
database: db_qa
```

Start backend and frontend by running in a terminal

```
npm run start
```

The frontend is available at http://localhost:4200/

## Description of the app

This is a simple example app, it allows:

- to create a new money transfer by specifying
  - the user who should receive the money
  - the currency to be used
  - the amount of money
  - the target currency
  - the description
  - the date (must be in the future)
- see the list of transactions

FX rates are:

```
    "USDEUR": 0.91,
    "EURUSD": 1.09,
    "USDCAD": 1.36,
    "CADUSD": 0.74,
    "USDGBP": 0.81,
    "GBPUSD": 1.24,
    "EURCAD": 1.47,
    "CADEUR": 0.67,
    "EURGBP": 0.89,
    "GBPEUR": 1.13,
    "CADGBP": 0.59,
    "GBPCAD": 1.68,
```

## Goal of the interview

During the interview we would love to see:

- how the candidate plan the QA and prepare the execution
- how the candidate run the QA
  - the candidate can find bugs
- how the candidate keep track of QA test executed
- how the candidate report a bug and which level of details are written
- how the candidate write a cypress test (if the candidate has experience)

## Example of the app

![example.gif](./example.gif 'example.gif')

## Automated tests

The goal is e2e testing.

You can open the cypress console by running this command:

```
npx cypress open
```

If everything works close it.

When you are ready.

Run the `db` (see above), stop the app, run only the `api` by running this command in a terminal:

```
npm run start:be
```

Then launch cypress:

```
npx nx e2e frontend-e2e --baseUrl=http://localhost:4200 --watch
```

Select your preferred browser and run the test suite.

Add a new test into `apps/frontend-e2e/src/e2e/app.cy.ts`
