"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
    },
});
exports.Post = (0, mongoose_1.model)('post', postSchema);
//# sourceMappingURL=PostSchema.js.map