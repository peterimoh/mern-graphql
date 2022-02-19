"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apollo_server_1 = require("apollo-server");
module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                // console.log(payload)
                return payload;
            }
            catch (err) {
                throw new apollo_server_1.AuthenticationError('Your session expired. Sign in again.');
            }
        }
        throw new Error('Authentication token must be "Bearer [token]"');
    }
    throw new apollo_server_1.AuthenticationError('Authorization Header not found');
};
//# sourceMappingURL=isAuthenticated.js.map