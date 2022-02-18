"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const apollo_server_1 = require("apollo-server");
const User_model_1 = require("../../models/User.model");
//encrypt password
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.hash(password, 10);
    });
}
function validatePassword(password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(password, hashedPassword);
    });
}
const userResolver = {
    Query: {
        sayHi: () => 'Hello',
    },
    Mutation: {
        register(_, { registerInput: { username, email, password } }) {
            return __awaiter(this, void 0, void 0, function* () {
                let newPassword = yield hashPassword(password);
                const created = new Date().toDateString();
                yield User_model_1.User.findOne({ email }).then((user) => {
                    if (user) {
                        throw new apollo_server_1.UserInputError('User Already Exist!', {
                            error: {
                                email: 'User Already Exist!',
                            },
                        });
                    }
                });
                let newUser = new User_model_1.User({
                    username,
                    email,
                    password: newPassword,
                    createdAt: created,
                });
                const result = yield newUser.save();
                return {
                    email: result.email,
                    username: result.username,
                    createdAt: result.createdAt,
                };
            });
        },
        login(_, { loginInput: { email, password } }) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield User_model_1.User.findOne({ email });
                if (!user)
                    throw new apollo_server_1.AuthenticationError('User does not exist!', {
                        error: {
                            email: 'User does not exist!',
                        },
                    });
                const compare_pass = yield validatePassword(password, user.password);
                if (!compare_pass)
                    throw new apollo_server_1.AuthenticationError('Invalid Password!', {
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
                return { token };
            });
        },
    },
};
exports.userResolver = userResolver;
//# sourceMappingURL=users.resolver.js.map