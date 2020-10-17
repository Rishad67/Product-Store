const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./db/dbConfig');
const cors = require('cors');
const { ApolloServer} = require('apollo-server-express');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const schema = require('./graphQl/schemas/schema');
const apolloServer = new ApolloServer({ schema });
apolloServer.applyMiddleware({app, path: '/graphql'});

mongoose
    .connect(dbConfig.DB)
    .then(() => {
        console.log("Database connected successfully . . ");
        app.listen(8000);
    })
    .catch(err => {
        console.log(err);
    })
