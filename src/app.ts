import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql';
import resolvers from './graphql/resolver/';
require('dotenv').config();
require('./config/db.config');


const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const port = 8080;

server.listen(port).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
