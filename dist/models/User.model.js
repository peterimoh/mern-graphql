"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
});
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=User.model.js.map