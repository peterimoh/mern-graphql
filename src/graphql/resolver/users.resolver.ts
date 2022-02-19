const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
import { UserInputError, AuthenticationError } from 'apollo-server';
import { User } from '../../models/User.model';

//encrypt password
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(password, hashedPassword){
  return await bcrypt.compare(password, hashedPassword);
}

const userResolver = {
  // Query: {
  //   sayHi: () => 'Hello',
  // },

  Mutation: {
    async register(_, { registerInput: { username, email, password } }) {
      let newPassword = await hashPassword(password);

      const created = new Date().toDateString();

      await User.findOne({ email }).then((user) => {
        if (user) {
          throw new UserInputError('User Already Exist!', {
            error: {
              email: 'User Already Exist!',
            },
          });
        }
      });

      let newUser = new User({
        username,
        email,
        password: newPassword,
        createdAt: created,
      });

      const result = await newUser.save();
      return {
        email: result.email,
        username: result.username,
        createdAt: result.createdAt,
      };
    },

    async login(_, { loginInput: { email, password } }) {
      const  user:any = await User.findOne({ email });

      if (!user)
        throw new AuthenticationError('User does not exist!', {
          error: {
            email: 'User does not exist!',
          },
        });

      const compare_pass = await validatePassword(password, user.password);

      if (!compare_pass)
        throw new AuthenticationError('Invalid Password!', {
          error: {
            password: 'Invalid Password!',
          },
        });

      const usr = {
        email: user.email,
        username: user.username,
        id: user._id,
      };

      const token = JWT.sign({ usr }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      return { token, id: user._id };
    },
  },
};

export { userResolver };
