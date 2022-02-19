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
exports.postResolver = void 0;
const apollo_server_1 = require("apollo-server");
const Post_model_1 = require("../../models/Post.model");
const checkAuth = require('../../utils/isAuthenticated');
const postResolver = {
    Query: {
        getPosts: () => __awaiter(void 0, void 0, void 0, function* () {
            const posts = yield Post_model_1.Post.find().sort({ createdAt: -1 });
            return posts;
        }),
        getSinglePost: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const post = yield Post_model_1.Post.findById(id);
                if (!post)
                    throw new Error('Post not found!');
                return post;
            }
            catch (err) {
                throw new Error(err);
            }
        }),
    },
    Mutation: {
        createPost(_, { body }, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = checkAuth(context);
                const { usr } = user;
                const newPost = new Post_model_1.Post({
                    body,
                    user: usr.id,
                    username: usr.username,
                    createdAt: new Date().toISOString(),
                });
                const res = yield newPost.save();
                // if(!res) throw new
                return { message: 'New Post Added!' };
            });
        },
        deletePost(_, { id }, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = checkAuth(context);
                const { usr } = user;
                const post = yield Post_model_1.Post.findById(id);
                if (!post)
                    throw new Error('Post not found!');
                if (usr.id !== post.user._id.toString())
                    throw new apollo_server_1.AuthenticationError('You are not authorized to delete this post!');
                const deleted = yield Post_model_1.Post.findByIdAndDelete(id);
                if (!deleted)
                    throw new Error('Post not found!');
                return { message: 'Post deleted!' };
            });
        }
    },
};
exports.postResolver = postResolver;
//# sourceMappingURL=post.resolver.js.map