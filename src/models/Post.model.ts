import mongoose, { Schema, model, Types } from 'mongoose';

interface Post {
  body: string;
  username: string;
  createdAt: string;
  comments: [
    {
      body: string;
      username: string;
      createdAt: string;
    }
  ];
  likes: [
    {
      username: string;
      createdAt: string;
    }
  ];
  user: Types.ObjectId;
}

const postSchema = new Schema<Post>({
  body: {
    type: String,
  },
  username: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  comments: [
    {
      body: {
        type: String,
      },
      username: {
        type: String,
      },
      createdAt: {
        type: String,
      },
    },
  ],
  likes: [
    {
      username: {
        type: String,
      },
      createdAt: {
        type: String,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

export const Post = model<Post>('post', postSchema);

