"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_resolver_1 = require("./users.resolver");
const resolvers = {
    Query: Object.assign({}, users_resolver_1.userResolver.Query),
    Mutation: Object.assign({}, users_resolver_1.userResolver.Mutation),
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map