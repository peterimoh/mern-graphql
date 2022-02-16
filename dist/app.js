"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const types_1 = require("./types");
require('./config/db.config');
const typeDefs = (0, apollo_server_1.gql) `
  type Query {
    sayHi: ${types_1.TypeDefs.String}
  }
`;
const resolvers = {
    Query: {
        sayHi: () => 'Hello world !!!',
    },
};
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
});
const port = 8080;
server.listen(port).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=app.js.map