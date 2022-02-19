import { AuthenticationError, UserInputError } from 'apollo-server-express';
import Mongoose, { Types } from 'mongoose';
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

      if (body.trim() === '') {
        throw new Error('Post Body Cannot be Empty');
      }

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
        throw new AuthenticationError(
          'You are not authorized to delete this post!'
        );

      const deleted = await Post.findByIdAndDelete(id);
      if (!deleted) throw new Error('Post not found!');

      return { message: 'Post deleted!' };
    },

    createComment: async (_, { postID, body }, context) => {
      const user: any = checkAuth(context);

      const { usr } = user;
      if (body.trim() === '')
        throw new UserInputError('Comment Cannot be Empty!', {
          error: {
            body: 'Comment Cannot be Empty!',
          },
        });

      const post = await Post.findById(postID);
      if (!post) throw new Error('Post Not Found!');
      post.comments.unshift({
        body,
        username: usr.username,
        createdAt: new Date().toISOString(),
      });

      const commented = await post.save();
      return commented;
    },

    deleteComment: async (_, { postID, commentID }, context) => {
      const { usr } = checkAuth(context);

      const { username } = usr;
      const post = await Post.findById(postID);

      if (post) {
        const commentIndex = post.comments.findIndex(
          (c: any) => c.id === commentID
        );

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError(
            'You are not authorized to delete this comment!'
          );
        }
      } else {
        throw new UserInputError('Post not found!');
      }
    },

    likePost: async (_, { postID }, context) => {
      const { usr } = checkAuth(context);

      const post: any = await Post.findById(postID);
      console.log(usr);

      if (post) {
        if (post.likes.find((l) => l.username === usr.username)) {
          // post already liked, unlike it
          post.likes = post.likes.filter((el) => el.username !== usr.username);
        } else {
          // post not liked yet, like
          post.likes.push({
            username: usr.username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else
        throw new UserInputError('Post Not Found!', {
          error: {
            message: 'Post Not Found!',
          },
        });
    },
  },
};

export { postResolver };
