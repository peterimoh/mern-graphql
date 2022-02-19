import { postResolver } from './post.resolver';
import { userResolver } from './users.resolver';

const resolvers = {
  Query: {
    // ...userResolver.Query,
    ...postResolver.Query
  },

  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation
  },
};

export default resolvers;
