import { Schema, model } from 'mongoose';

interface User {
  username: string;
  password: string;
  email: string;
  createdAt: string;
}


const userSchema= new Schema<User>({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  createdAt: {
    type: String,
  },
})

export const User = model<User>('User', userSchema);