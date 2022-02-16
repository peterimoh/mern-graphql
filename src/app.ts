import { ApolloServer, gql } from 'apollo-server';
import { TypeDefs } from './types';
require('./config/db.config')


const typeDefs = gql`
  type Query {
    sayHi: ${TypeDefs.String}
  }
`;

const resolvers = {
  Query: {
    sayHi: (): string => 'Hello world !!!',
  },
};

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = 8080;


server.listen(port).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
