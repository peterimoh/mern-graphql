import { postResolver } from './post.resolver';
import { userResolver } from './users.resolver';

const resolvers = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    // ...userResolver.Query,
    ...postResolver.Query,
  },

  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
  },
};

export default resolvers;
