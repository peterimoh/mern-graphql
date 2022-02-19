import { AuthenticationError, UserInputError } from 'apollo-server';
import Mongoose,{ Types } from 'mongoose';
import { Post } from '../../models/Post.model';
const checkAuth = require('../../utils/isAuthenticated');

const postResolver = {
  Query: {
    getPosts: async () => {
      const posts: any = await Post.find().sort({ createdAt: -1 });
      return posts;
    },

    getSinglePost: async (_, { id }) => {
      try {
        const post: any = await Post.findById(id);
        if (!post) throw new Error('Post not found!');
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createPost(_, { body }, context) {
      const user: any = checkAuth(context);
      const { usr } = user;

      const newPost = new Post({
        body,
        user: usr.id,
        username: usr.username,
        createdAt: new Date().toISOString(),
      });

      const res = await newPost.save();
      // if(!res) throw new
      return { message: 'New Post Added!' };
    },

    async deletePost(_, { id }, context) {
      const user: any = checkAuth(context);
      const { usr } = user;

      const post: any = await Post.findById(id);
      if (!post) throw new Error('Post not found!');
      
      
      if (usr.id !== post.user._id.toString())
        throw new AuthenticationError('You are not authorized to delete this post!');

      const deleted = await Post.findByIdAndDelete(id);
      if (!deleted) throw new Error('Post not found!');

      return { message: 'Post deleted!' };
    }
  },
};

export { postResolver };
