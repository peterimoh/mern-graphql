"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const graphql_1 = require("./graphql");
const resolver_1 = __importDefault(require("./graphql/resolver/"));
require('dotenv').config();
require('./config/db.config');
const server = new apollo_server_1.ApolloServer({
    typeDefs: graphql_1.typeDefs,
    resolvers: resolver_1.default,
});
const port = 8080;
server.listen(port).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=app.js.map