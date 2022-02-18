import { userResolver } from './users.resolver';

const resolvers = {
  Query: {
    ...userResolver.Query,
  },

  Mutation: {
    ...userResolver.Mutation,
  },
};

export default resolvers;
