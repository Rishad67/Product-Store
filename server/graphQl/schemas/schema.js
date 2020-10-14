const fs = require('fs');
const { makeExecutableSchema, gql } = require('apollo-server-express');

const graphQlSchemas = gql(fs.readFileSync('./graphQl/schemas/schema.graphql',{encoding: 'utf-8'}));
const graphQlResolvers = require('../resolvers/index');

module.exports = makeExecutableSchema({
    typeDefs: [graphQlSchemas],
	  resolvers: graphQlResolvers
})