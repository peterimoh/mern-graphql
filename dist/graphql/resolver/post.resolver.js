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
                if (body.trim() === "") {
                    throw new Error("Post Body Cannot be Empty");
                }
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
        },
        createComment: (_, { postID, body }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const user = checkAuth(context);
            const { usr } = user;
            if (body.trim() === '')
                throw new apollo_server_1.UserInputError('Comment Cannot be Empty!', {
                    error: {
                        body: 'Comment Cannot be Empty!',
                    },
                });
            const post = yield Post_model_1.Post.findById(postID);
            if (!post)
                throw new Error('Post Not Found!');
            post.comments.unshift({
                body,
                username: usr.username,
                createdAt: new Date().toISOString(),
            });
            const commented = yield post.save();
            return commented;
        }),
        deleteComment: (_, { postID, commentID }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { usr } = checkAuth(context);
            const { username } = usr;
            const post = yield Post_model_1.Post.findById(postID);
            if (post) {
                const commentIndex = post.comments.findIndex((c) => c.id === commentID);
                if (post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1);
                    yield post.save();
                    return post;
                }
                else {
                    throw new apollo_server_1.AuthenticationError('You are not authorized to delete this comment!');
                }
            }
            else {
                throw new apollo_server_1.UserInputError('Post not found!');
            }
        }),
        likePost: (_, { postID }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { usr } = checkAuth(context);
            const post = yield Post_model_1.Post.findById(postID);
            console.log(usr);
            if (post) {
                if (post.likes.find((l) => l.username === usr.username)) {
                    // post already liked, unlike it
                    post.likes = post.likes.filter((el) => el.username !== usr.username);
                }
                else {
                    // post not liked yet, like
                    post.likes.push({
                        username: usr.username,
                        createdAt: new Date().toISOString(),
                    });
                }
                yield post.save();
                return post;
            }
            else
                throw new apollo_server_1.UserInputError('Post Not Found!', {
                    error: {
                        message: 'Post Not Found!',
                    },
                });
        }),
    },
};
exports.postResolver = postResolver;
//# sourceMappingURL=post.resolver.js.map